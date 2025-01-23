import { DataItem, decodeToDataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from "../RegistryType";
import { fromHex } from '../../utils/format';
import { generateUuid } from '../../utils/uuid';


enum PsbtSignRequestKeys {
  uuid = 1,
  psbt,
  derivationPath,
  origin,
}

export class PsbtSignRequest extends RegistryItem {
  uuid?: Buffer;
  psbt: Buffer;
  derivationPath?: CryptoKeypath;
  origin?: string;

  constructor(params: {
    uuid?: Buffer;
    psbt: Buffer;
    derivationPath?: CryptoKeypath;
    origin?: string;
  }) {
    super();
    this.uuid = params.uuid;
    this.psbt = params.psbt;
    this.derivationPath = params.derivationPath;
    this.origin = params.origin;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.PSBT_SIGN_REQUEST;
  }

  getRequestId(): Buffer {
    if (!this.uuid) {
      this.uuid = generateUuid();
    }
    return this.uuid;
  }

  getSignData(): Buffer {
    return this.psbt;
  }

  getPath(): CryptoKeypath | undefined {
    return this.derivationPath;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
  
    map[PsbtSignRequestKeys.uuid] = new DataItem(this.getRequestId(), RegistryTypes.UUID.getTag());
    map[PsbtSignRequestKeys.psbt] = new DataItem(this.psbt, RegistryTypes.CRYPTO_PSBT.getTag());
  
    if (this.derivationPath) {
      const derivationPathDataItem = this.derivationPath.toDataItem();
      derivationPathDataItem.setTag(this.derivationPath.getRegistryType().getTag());
      map[PsbtSignRequestKeys.derivationPath] = derivationPathDataItem;
    }
  
    if (this.origin) {
      map[PsbtSignRequestKeys.origin] = this.origin;
    }
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): PsbtSignRequest {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const psbt = fromHex(map[PsbtSignRequestKeys.psbt.toString()]);
    const uuid = map[PsbtSignRequestKeys.uuid.toString()] ? fromHex(map[PsbtSignRequestKeys.uuid.toString()]) : undefined;
    const derivationPath = map[PsbtSignRequestKeys.derivationPath.toString()]
      ? CryptoKeypath.fromDataItem(map[PsbtSignRequestKeys.derivationPath.toString()])
      : undefined;
    const origin = map[PsbtSignRequestKeys.origin.toString()];

    return new PsbtSignRequest({
      uuid: uuid,
      psbt: psbt,
      derivationPath: derivationPath,
      origin: origin,
    });
  }


  static fromCBOR(cborPayload: Buffer): PsbtSignRequest {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}
