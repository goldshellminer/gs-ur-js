import { DataItem, decodeToDataItem } from '../cbor/index';
import { RegistryItem } from './RegistryItem';
import { RegistryType, RegistryTypes } from './RegistryType';

enum KeyPathKeys {
  components = 1,
  sourceFingerprint,
  depth,
}

export class PathComponent {
  static readonly HARDENED_BIT = 0x80000000;

  private readonly index?: number;
  private readonly wildcard: boolean;
  private readonly hardened: boolean;

  constructor(index?: number, hardened: boolean = false) {
    this.index = index;
    this.hardened = hardened;
    this.wildcard = index === undefined;

    if (index !== undefined && (index & PathComponent.HARDENED_BIT) !== 0) {
      throw new Error(`Invalid index ${index} - most significant bit cannot be set`);
    }
  }

  getIndex(): number | undefined {
    return this.index;
  }

  isWildcard(): boolean {
    return this.wildcard;
  }

  isHardened(): boolean {
    return this.hardened;
  }
}

export class CryptoKeypath extends RegistryItem {

  constructor(
    private components: PathComponent[] = [],
    private sourceFingerprint?: Buffer,
    private depth?: number,
  ) {
    super();
  }

  getRegistryType(): RegistryType {
    return RegistryTypes.CRYPTO_KEYPATH;
  }

  getPath(): string | null {
    if (this.components.length === 0) {
      return null;
    }

    const pathComponents = this.components.map(component => {
      return `${component.isWildcard() ? '*' : component.getIndex()}${component.isHardened() ? "'" : ''}`;
    }).join('/');

    return pathComponents;
  }

  getComponents(): PathComponent[] {
    return this.components;
  }

  getSourceFingerprint(): Buffer | undefined {
    return this.sourceFingerprint;
  }

  getDepth(): number | undefined {
    return this.depth;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
    const componentsData: (number | boolean | any[])[] = [];

    for (let component of this.components) {
      if (component.isWildcard()) {
        componentsData.push([]);
      } else {
        componentsData.push(component.getIndex() as number);
      }
      componentsData.push(component.isHardened());
    }

    map[KeyPathKeys.components] = componentsData;
    if (this.sourceFingerprint) {
      map[KeyPathKeys.sourceFingerprint] = new DataView(this.sourceFingerprint.buffer).getUint32(0, true);
    }
    if (this.depth !== undefined) {
      map[KeyPathKeys.depth] = this.depth;
    }

    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): CryptoKeypath {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }

    const pathComponents: PathComponent[] = [];
    const components = map[KeyPathKeys.components] as any[];

    for (let i = 0; i < components.length; i += 2) {
      const isHardened = components[i + 1] as boolean;
      const path = components[i];

      if (typeof path === 'number') {
        pathComponents.push(new PathComponent(path, isHardened));
      } else {
        pathComponents.push(new PathComponent(undefined, isHardened));
      }
    }

    const sourceFingerprintData = map[KeyPathKeys.sourceFingerprint];
    let sourceFingerprint: Buffer | undefined;
    if (sourceFingerprintData !== undefined) {
      sourceFingerprint = Buffer.alloc(4);
      new DataView(sourceFingerprint.buffer).setUint32(0, sourceFingerprintData, true);
    }

    const depth = map[KeyPathKeys.depth];

    return new CryptoKeypath(pathComponents, sourceFingerprint, depth);
  }

  static fromCBOR(cborPayload: Buffer): CryptoKeypath {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}
