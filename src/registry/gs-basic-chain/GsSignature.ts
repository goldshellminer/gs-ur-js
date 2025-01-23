import { DataItem, decodeToDataItem } from '../../cbor/index';
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryTypes } from "../RegistryType";
import { generateUuid } from '../../utils/uuid';
import { fromHex } from '../../utils/format';

export enum GsSignatureKeys {
  uuid = 1,
  signature,
  origin,
}

export class GsSignature extends RegistryItem {
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

  getRegistryType() {
    return ExtendedRegistryTypes.GS_SIGNATURE;
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
      map[GsSignatureKeys.uuid] = new DataItem(this.uuid, RegistryTypes.UUID.getTag());
    }

    if (this.origin) {
      map[GsSignatureKeys.origin] = this.origin;
    }

    map[GsSignatureKeys.signature] = this.signature;

    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): GsSignature {
    const map = dataItem.getData() as Record<string, any>;
    if (!map) {
      throw new Error("Param for fromDataItem is neither String nor object, please check it!");
    }

    const signature = fromHex(map[GsSignatureKeys.signature.toString()]);
    const uuid = map[GsSignatureKeys.uuid.toString()] ? fromHex(map[GsSignatureKeys.uuid.toString()]) : undefined;
    const origin = map[GsSignatureKeys.origin.toString()];

    return new GsSignature({
      signature: signature,
      uuid: uuid,
      origin: origin,
    });
  }

  static fromCBOR(cborPayload: Buffer): GsSignature {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}