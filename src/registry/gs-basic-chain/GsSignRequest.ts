import { DataItem, decodeToDataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { CryptoTxEntity } from "../CryptoTxEntity";
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from "../RegistryType";
import { generateUuid } from '../../utils/uuid';
import { fromHex } from '../../utils/format';

enum GsSignRequestKeys {
  uuid = 1,
  signData,
  derivationPath,
  chain,
  origin,
}

export class GsSignRequest extends RegistryItem {
  uuid?: Buffer;
  signData: Buffer;
  origin?: string;
  chain: string;
  derivationPath: CryptoKeypath;

  constructor(params: {
    uuid?: Buffer;
    signData: Buffer;
    origin?: string;
    chain: string;
    derivationPath: CryptoKeypath;
  }) {
    super();
    this.uuid = params.uuid;
    this.signData = params.signData;
    this.origin = params.origin;
    this.chain = params.chain;
    this.derivationPath = params.derivationPath;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.GS_SIGN_REQUEST;
  }

  getRequestId(): Buffer {
    if (!this.uuid) {
      this.uuid = generateUuid();
    }
    return this.uuid;
  }

  getSignData(): Buffer {
    return this.signData;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  getChain(): string {
    return this.chain;
  }

  getDerivationPath(): string | null {
    return this.derivationPath.getPath(); // 假设 CryptoKeypath 有 getPath 方法
  }

  getSourceFingerprint(): Buffer | undefined {
    return this.derivationPath.getSourceFingerprint();
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
  
    map[GsSignRequestKeys.uuid] = new DataItem(this.getRequestId(), RegistryTypes.UUID.getTag());
    map[GsSignRequestKeys.signData] = this.getSignData();
  
    let keyPath = this.derivationPath.toDataItem();
    keyPath.setTag(this.derivationPath.getRegistryType().getTag());
    map[GsSignRequestKeys.derivationPath] = keyPath;
  
    map[GsSignRequestKeys.chain] = this.chain;
  
    if (this.origin) {
      map[GsSignRequestKeys.origin] = this.origin;
    }
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): GsSignRequest {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }

    const signData = map[GsSignRequestKeys.signData.valueOf()];
    const uuid = map[GsSignRequestKeys.uuid.valueOf()]?.bytes;
    const chain = map[GsSignRequestKeys.chain.valueOf()];
    const origin = map[GsSignRequestKeys.origin.valueOf()];
    const derivationPath = CryptoKeypath.fromDataItem(map[GsSignRequestKeys.derivationPath.valueOf()]);


    if (!signData || !chain || !derivationPath) {
      throw new Error('signData, chain, and derivationPath are required fields for GsSignRequest');
    }

    return new GsSignRequest({
      uuid: uuid ? fromHex(uuid) : undefined,
      signData: fromHex(signData),
      chain: chain,
      origin: origin,
      derivationPath: derivationPath,
    });
  }

  static fromCBOR(cborPayload: Buffer): GsSignRequest {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}