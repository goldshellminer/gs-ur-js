import { DataItem, decodeToDataItem } from '../cbor/index';
import { RegistryItem } from './RegistryItem';
import { CryptoCoinInfo } from './CryptoCoinInfo';
import { CryptoKeypath } from './CryptoKeyPath';
import { RegistryType, RegistryTypes } from './RegistryType';
import { getChainConf, getChainConfByCoinType } from '../chain/chainList';
import { fromHex, intToUint8List, listToBase58 } from '../utils/format';

enum HDKeyKeys {
  isMaster = 1,
  isPrivate,
  keyData,
  chainCode,
  useInfo,
  origin,
  children,
  parentFingerprint,
  name,
  note,
}

export class CryptoHDKey extends RegistryItem {
  isMaster?: boolean;
  isPrivateKey?: boolean;
  keyData?: Buffer;
  chainCode?: Buffer;
  useInfo?: CryptoCoinInfo;
  origin?: CryptoKeypath;
  children?: CryptoKeypath;
  parentFingerprint?: Buffer;
  name?: string;
  note?: string;

  constructor(params?: {
    isMaster?: boolean;
    isPrivateKey?: boolean;
    keyData?: Buffer;
    chainCode?: Buffer;
    useInfo?: CryptoCoinInfo;
    origin?: CryptoKeypath;
    children?: CryptoKeypath;
    parentFingerprint?: Buffer;
    name?: string;
    note?: string;
  }) {
    super();
    if (params) {
      this.isMaster = params.isMaster;
      this.isPrivateKey = params.isPrivateKey;
      this.keyData = params.keyData;
      this.chainCode = params.chainCode;
      this.useInfo = params.useInfo;
      this.origin = params.origin;
      this.children = params.children;
      this.parentFingerprint = params.parentFingerprint;
      this.name = params.name;
      this.note = params.note;
    }
  }

  isECKey(): boolean {
    return false;
  }

  getBip32Key(chain?: string): string {
    let version: Buffer;
    let depth: number;
    let index = 0;
    let chainType = getChainConf(chain ?? 'btc');

    if (this.isMaster) {
      version = Buffer.from('0488ADE4', 'hex');
      depth = 0;
      index = 0;
    } else {
      depth = this.origin?.getComponents().length ?? this.origin?.getDepth() ?? 0;
      const paths = this.origin?.getComponents() ?? [];
      const lastPath = paths.length > 0 ? paths[paths.length - 1] : null;

      if (lastPath) {
        index = lastPath.isHardened() ? lastPath.getIndex()! + 0x80000000 : lastPath.getIndex()!;
      }
      if (!chain && paths.length > 0) {
        chainType = getChainConfByCoinType(paths[1].getIndex() ?? 0) ?? chainType;
      }
      version = this.isPrivateKey ? intToUint8List(chainType.netConf.networkType.bip32.private) : intToUint8List(chainType.netConf.networkType.bip32.public);
    }

    const depthBuffer = new Buffer(1);
    depthBuffer[0] = depth;
    const indexBuffer = new Buffer(4);
    new DataView(indexBuffer.buffer).setUint32(0, index, true);

    if (!this.parentFingerprint || !this.chainCode || !this.keyData) {
      throw new Error("Lack of enough info, parentFingerprint or chainCode or keyData!");
    }

    const bip32Key = [
      ...version,
      ...depthBuffer,
      ...this.parentFingerprint,
      ...indexBuffer,
      ...this.chainCode,
      ...this.keyData,
    ];

    return listToBase58(bip32Key);
  }

   getRegistryType(): RegistryType {
    return RegistryTypes.CRYPTO_HDKEY;
  }

  getOutputDescriptorContent(): string {
    let result = '';
    if (this.origin) {
      if (this.origin.getSourceFingerprint() && this.origin.getPath()) {
        result += `${this.origin.getSourceFingerprint()}/${this.origin.getPath()}`;
      }
    }

    result += fromHex(this.getBip32Key()).toString('hex');

    if (this.children && this.children.getPath()) {
      result += `/${this.children.getPath()}`;
    }

    return result;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
    if (this.isMaster) {
      map[HDKeyKeys.isMaster] = true;
      map[HDKeyKeys.keyData] = this.keyData;
      map[HDKeyKeys.chainCode] = this.chainCode;
    } else {
      if (this.isPrivateKey !== undefined) {
        map[HDKeyKeys.isPrivate] = this.isPrivateKey;
      }
      map[HDKeyKeys.keyData] = this.keyData;
      if (this.chainCode) {
        map[HDKeyKeys.chainCode] = this.chainCode;
      }
      if (this.useInfo) {
        const useInfoDataItem = this.useInfo.toDataItem();
        useInfoDataItem.setTag(this.useInfo.getRegistryType().getTag());
        map[HDKeyKeys.useInfo] = useInfoDataItem;
      }
      if (this.origin) {
        const originDataItem = this.origin.toDataItem();
        originDataItem.setTag(this.origin.getRegistryType().getTag());
        map[HDKeyKeys.origin] = originDataItem;
      }
      if (this.children) {
        const childrenDataItem = this.children.toDataItem();
        childrenDataItem.setTag(this.children.getRegistryType().getTag());
        map[HDKeyKeys.children] = childrenDataItem;
      }
      if (this.parentFingerprint) {
        map[HDKeyKeys.parentFingerprint] = new DataView(this.parentFingerprint.buffer).getUint32(0, true);
      }
      if (this.name) {
        map[HDKeyKeys.name] = this.name;
      }
      if (this.note) {
        map[HDKeyKeys.note] = this.note;
      }
    }
    return new DataItem(map);
  }

  static fromDataItem(jsonData: any): CryptoHDKey {
    const map = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    if (!map) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const isMaster = map[HDKeyKeys.isMaster.toString()] ?? false;
    const isPrivateKey = map[HDKeyKeys.isPrivate.toString()];
    const keyData = map[HDKeyKeys.keyData.toString()];
    const chainCode = map[HDKeyKeys.chainCode.toString()];
    const useInfo = map[HDKeyKeys.useInfo.toString()] ? CryptoCoinInfo.fromDataItem(map[HDKeyKeys.useInfo.toString()]) : undefined;
    const origin = map[HDKeyKeys.origin.toString()] ? CryptoKeypath.fromDataItem(map[HDKeyKeys.origin.toString()]) : undefined;
    const children = map[HDKeyKeys.children.toString()] ? CryptoKeypath.fromDataItem(map[HDKeyKeys.children.toString()]) : undefined;

    const parentFingerprintData = map[HDKeyKeys.parentFingerprint.toString()];
    let parentFingerprint: Buffer | undefined;
    if (parentFingerprintData !== undefined) {
      parentFingerprint = new Buffer(4);
      new DataView(parentFingerprint.buffer).setUint32(0, parentFingerprintData, true);
    }
    const name = map[HDKeyKeys.name.toString()];
    const note = map[HDKeyKeys.note.toString()];

    return new CryptoDeriveHDKey({
      keyData: keyData ? fromHex(keyData) : Buffer.alloc(0),
      chainCode: chainCode ? fromHex(chainCode) : undefined,
      useInfo,
      origin,
      children,
      parentFingerprint,
      name,
      note,
    });
  }

  static fromCBOR(cborPayload: Buffer): CryptoHDKey {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}

export class CryptoMasterHDKey extends CryptoHDKey {
  constructor(params: {
    keyData: Buffer;
    chainCode: Buffer;
    name?: string;
    note?: string;
  }) {
    super({
      isMaster: true,
      keyData: params.keyData,
      chainCode: params.chainCode,
      name: params.name,
      note: params.note,
    });
  }
}

export class CryptoDeriveHDKey extends CryptoHDKey {
  constructor(params: {
    keyData: Buffer;
    chainCode?: Buffer;
    useInfo?: CryptoCoinInfo;
    origin?: CryptoKeypath;
    children?: CryptoKeypath;
    parentFingerprint?: Buffer;
    name?: string;
    note?: string;
  }) {
    super({
      isMaster: false,
      isPrivateKey: false,
      keyData: params.keyData,
      chainCode: params.chainCode,
      useInfo: params.useInfo,
      origin: params.origin,
      children: params.children,
      parentFingerprint: params.parentFingerprint,
      name: params.name,
      note: params.note,
    });
  }
}
