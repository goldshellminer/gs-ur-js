import { DataItem, decodeToDataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from "../RegistryType";
import { fromHex } from '../../utils/format';

enum TronSignRequestKeys {
  uuid = 1,
  signData,
  derivationPath,
  fee,
  origin,
}

export class TronSignRequest extends RegistryItem {
  uuid: Buffer;
  signData: Buffer;
  origin?: string;
  fee?: number;
  derivationPath: CryptoKeypath;

  constructor(params: {
    uuid: Buffer;
    signData: Buffer;
    fee?: number;
    derivationPath: CryptoKeypath;
    origin?: string;
  }) {
    super();
    this.uuid = params.uuid;
    this.signData = params.signData;
    this.fee = params.fee;
    this.derivationPath = params.derivationPath;
    this.origin = params.origin;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.TRON_SIGN_REQUEST;
  }

  getRequestId(): Buffer {
    return this.uuid;
  }

  getSignData(): Buffer {
    return this.signData;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  getFee(): number | undefined {
    return this.fee;
  }

  getDerivationPath(): string | null {
    return this.derivationPath.getPath();
  }

  getSourceFingerprint(): Buffer | undefined {
    return this.derivationPath.getSourceFingerprint();
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
  
    map[TronSignRequestKeys.uuid] = new DataItem(this.getRequestId(), RegistryTypes.UUID.getTag());
    map[TronSignRequestKeys.signData] = this.getSignData();
    const keyPath = this.derivationPath.toDataItem();
    keyPath.setTag(this.derivationPath.getRegistryType().getTag());
    map[TronSignRequestKeys.derivationPath] = keyPath;
  
    if (this.fee !== undefined) {
      map[TronSignRequestKeys.fee] = this.fee;
    }
  
    if (this.origin) {
      map[TronSignRequestKeys.origin] = this.origin;
    }
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): TronSignRequest {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const signData = fromHex(map[TronSignRequestKeys.signData.toString()]);
    const uuid = fromHex(map[TronSignRequestKeys.uuid.toString()]);
    const fee = map[TronSignRequestKeys.fee.toString()];
    const origin = map[TronSignRequestKeys.origin.toString()];
    const derivationPath = CryptoKeypath.fromDataItem(
      map[TronSignRequestKeys.derivationPath.toString()]
    );

    return new TronSignRequest({
      uuid: uuid,
      signData: signData,
      derivationPath: derivationPath,
      fee: fee,
      origin: origin,
    });
  }

  static fromCBOR(cborPayload: Buffer): TronSignRequest {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}