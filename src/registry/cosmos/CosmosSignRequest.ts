import { DataItem, decodeToDataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from "../RegistryType";
import { fromHex } from '../../utils/format';
import { generateUuid } from '../../utils/uuid';

enum CosmosSignRequestKeys {
  uuid = 1,
  signData,
  derivationPath,
  chain,
  origin,
  fee,
}

export class CosmosSignRequest extends RegistryItem {
  uuid?: Buffer;
  signData: Buffer;
  origin?: string;
  chain: string;
  derivationPath: CryptoKeypath;
  fee?: number;

  constructor(params: {
    uuid?: Buffer;
    signData: Buffer;
    origin?: string;
    chain: string;
    derivationPath: CryptoKeypath;
    fee?: number;
  }) {
    super();
    this.uuid = params.uuid;
    this.signData = params.signData;
    this.origin = params.origin;
    this.chain = params.chain;
    this.derivationPath = params.derivationPath;
    this.fee = params.fee;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.COSMOS_SIGN_REQUEST;
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
    return this.derivationPath.getPath();
  }

  getSourceFingerprint(): Buffer | undefined {
    return this.derivationPath.getSourceFingerprint();
  }

  getFee(): number | undefined {
    return this.fee;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
  
    map[CosmosSignRequestKeys.uuid] = new DataItem(this.getRequestId(), RegistryTypes.UUID.getTag());
    map[CosmosSignRequestKeys.signData] = this.signData;
    
    const keyPath = this.derivationPath.toDataItem();
    keyPath.setTag(this.derivationPath.getRegistryType().getTag());
    map[CosmosSignRequestKeys.derivationPath] = keyPath;
    
    map[CosmosSignRequestKeys.chain] = this.chain;
  
    if (this.origin) {
      map[CosmosSignRequestKeys.origin] = this.origin;
    }
    
    if (this.fee) {
      map[CosmosSignRequestKeys.fee] = this.fee;
    }
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): CosmosSignRequest {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const signData = fromHex(map[CosmosSignRequestKeys.signData.toString()]);
    const uuid = map[CosmosSignRequestKeys.uuid.toString()] ? fromHex(map[CosmosSignRequestKeys.uuid.toString()]) : undefined;
    const chain = map[CosmosSignRequestKeys.chain.toString()];
    const origin = map[CosmosSignRequestKeys.origin.toString()];
    const derivationPath = CryptoKeypath.fromDataItem(map[CosmosSignRequestKeys.derivationPath.toString()]);
    const fee = map[CosmosSignRequestKeys.fee.toString()];

    return new CosmosSignRequest({
      uuid,
      signData,
      chain,
      origin,
      derivationPath,
      fee,
    });
  }

  static fromCBOR(cborPayload: Buffer): CosmosSignRequest {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}