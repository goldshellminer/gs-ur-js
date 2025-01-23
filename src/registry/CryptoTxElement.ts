import { encodeDataItem, DataItem, decodeToDataItem } from '../cbor/index';
import { PathComponent } from "./CryptoKeyPath";
import { RegistryItem } from "./RegistryItem";
import { ExtendedRegistryTypes, RegistryType } from "./RegistryType";
import { fromHex, parsePath } from '../utils/format';

enum TxElementKeys {
  path = 1,
  amount,
  signature,
  signhashType,
  address,
}

export class CryptoTxElement extends RegistryItem {
  path?: PathComponent[];
  address?: string;
  amount?: number;
  signature?: Buffer;
  signhashType?: number;

  constructor(options: {
    path?: PathComponent[];
    address?: string;
    amount?: number;
    signature?: Buffer;
    signhashType?: number;
  }) {
    super();
    this.path = options.path;
    this.address = options.address;
    this.amount = options.amount;
    this.signature = options.signature;
    this.signhashType = options.signhashType;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.CRYPTO_TXELEMENT;
  }

  getPath(): string | null {
    if (!this.path) return null;
    const pathComponents = this.path.map(component => {
      const indexPart = component.isWildcard() ? '*' : (component.getIndex()?.toString() ?? '');
      const hardenedPart = component.isHardened() ? "'" : '';
      return `${indexPart}${hardenedPart}`;
    }).join('/');
    return pathComponents;
  }

  getComponents(): PathComponent[] | null {
    return this.path ? this.path : null;
  }

  getAmount(): number | null {
    return this.amount ?? null;
  }

  getAddress(): string | null {
    return this.address ?? null;
  }

  getSignature(): Buffer | null {
    return this.signature ?? null;
  }

  getSignhashType(): number | null {
    return this.signhashType ?? null;
  }

  toDataItem(): DataItem {
    const map :Record<number, any> = {};
    const componentsData: any[] = [];

    if (this.path) {
      for (const component of this.path) {
        if (component.isWildcard()) {
          componentsData.push([]);
        } else {
          componentsData.push(component.getIndex());
        }
        componentsData.push(component.isHardened());
      }
    }

    map[TxElementKeys.path] = componentsData;
    if (this.amount !== undefined && this.amount !== null) {
      map[TxElementKeys.amount] = this.amount;
    }
    if (this.signature !== undefined && this.signature !== null) {
      map[TxElementKeys.signature] = this.signature;
    }
    if (this.signhashType !== undefined && this.signhashType !== null) {
      map[TxElementKeys.signhashType] = this.signhashType;
    }
    if (this.address !== undefined && this.address !== null) {
      map[TxElementKeys.address] = this.address;
    }

    return new DataItem(map);
  }

  /**
   * 从 JSON 数据或字符串创建 `CryptoTxElement` 实例
   * @param jsonData JSON 数据或字符串
   */
  static fromDataItem(dataItem: DataItem): CryptoTxElement {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const pathComponents: PathComponent[] = [];
    const paths: any[] = map[TxElementKeys.path.toString()] as any[] ?? [];

    for (let i = 0; i < paths.length; i += 2) {
      const path = paths[i];
      const isHardened = paths[i + 1] as boolean;

      if (typeof path === 'number') {
        pathComponents.push(new PathComponent(path, isHardened));
      } else if (Array.isArray(path)) { // 处理通配符，如 Dart 中的空列表
        pathComponents.push(new PathComponent(undefined, isHardened));
      } else {
        throw new Error(`Invalid path component at index ${i}`);
      }
    }

    const address = map[TxElementKeys.address.toString()];
    const amount = map[TxElementKeys.amount.toString()];
    const signatureData = map[TxElementKeys.signature.toString()];
    const signhashTypeData = map[TxElementKeys.signhashType.toString()];

    // 假设 signature 是十六进制字符串，如果不是，请根据实际情况调整
    const signatureBytes = (typeof signatureData === 'string') ? fromHex(signatureData) : undefined;

    return new CryptoTxElement({
      path: pathComponents.length > 0 ? pathComponents : undefined,
      address: address,
      amount: amount,
      signature: signatureBytes,
      signhashType: signhashTypeData
    });
  }

  /**
   * 从 CBOR 编码的 `Buffer` 创建 `CryptoTxElement` 实例
   * @param cborPayload CBOR 编码的 `Buffer`
   */
  static fromCBOR(cborPayload: Buffer): CryptoTxElement {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}

export function parseTxElement(txElementMap: Record<string, any>): CryptoTxElement {
  const address = txElementMap["address"];
  const path = txElementMap["path"];
  const amount = txElementMap["amount"];
  const signature = txElementMap["signature"];
  const signhashType = txElementMap["signhashType"];

  return new CryptoTxElement({
    path: path ? parsePath(path).map(e => new PathComponent( e.index, e.hardened )) : undefined,
    address: address,
    amount: amount,
    signature: signature,
    signhashType: signhashType,
  });
}