import { DataItem, decodeToDataItem } from '../../cbor/index';
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from "../RegistryType";
import { fromHex } from '../../utils/format';
import { generateUuid } from '../../utils/uuid';


enum PsbtSignatureKeys {
  uuid = 1,
  signature,
  origin,
}

export class PsbtSignature extends RegistryItem {
  uuid?: Buffer;
  origin?: string;
  signature: Buffer;

  constructor(params: {
    signature: Buffer;
    uuid?: Buffer;
    origin?: string;
  }) {
    super();
    this.signature = params.signature;
    this.uuid = params.uuid;
    this.origin = params.origin;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.PSBT_SIGNATURE;
  }

  getRequestId(): Buffer | undefined {
    return this.uuid ?? generateUuid();
  }

  getSignature(): Buffer {
    return this.signature;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
  
    if (this.uuid) {
      map[PsbtSignatureKeys.uuid] = new DataItem(this.uuid, RegistryTypes.UUID.getTag());
    }
  
    if (this.origin) {
      map[PsbtSignatureKeys.origin] = this.origin;
    }
  
    map[PsbtSignatureKeys.signature] = new DataItem(this.signature, RegistryTypes.CRYPTO_PSBT.getTag());
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): PsbtSignature {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const signature = fromHex(map[PsbtSignatureKeys.signature.toString()]);
    const uuid = map[PsbtSignatureKeys.uuid.toString()] ? fromHex(map[PsbtSignatureKeys.uuid.toString()]) : undefined;
    const origin = map[PsbtSignatureKeys.origin.toString()];

    return new PsbtSignature({
      signature: signature,
      uuid: uuid,
      origin: origin,
    });
  }

  static fromCBOR(cborPayload: Buffer): PsbtSignature {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}