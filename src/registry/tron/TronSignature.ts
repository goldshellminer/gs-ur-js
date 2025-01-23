
import { DataItem, decodeToDataItem } from '../../cbor/index';
import { fromHex } from "../../utils/format";

import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from "../RegistryType";

enum TronSignatureKeys {
  uuid = 1,
  signature,
  origin,
}

export class TronSignature extends RegistryItem {
  uuid: Buffer;
  origin?: string;
  signature: Buffer;

  constructor(params: { signature: Buffer; uuid: Buffer; origin?: string }) {
    super();
    this.signature = params.signature;
    this.uuid = params.uuid;
    this.origin = params.origin;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.TRON_SIGNATURE;
  }

  getRequestId(): Buffer {
    return this.uuid;
  }

  getSignature(): Buffer {
    return this.signature;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
  
    map[TronSignatureKeys.uuid] = new DataItem(this.uuid, RegistryTypes.UUID.getTag());
  
    if (this.origin) {
      map[TronSignatureKeys.origin] = this.origin;
    }
  
    map[TronSignatureKeys.signature] = this.signature;
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): TronSignature {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const signature = map[TronSignatureKeys.signature.toString()];
    const uuid = map[TronSignatureKeys.uuid.toString()];
    const origin = map[TronSignatureKeys.origin.toString()];

    return new TronSignature({
      signature: fromHex(signature),
      uuid: fromHex(uuid),
      origin: origin,
    });
  }

  static fromCBOR(cborPayload: Buffer): TronSignature {  // Accepts Buffer or Buffer
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}