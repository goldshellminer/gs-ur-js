import { DataItem, decodeToDataItem } from '../../cbor/index';
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from "../RegistryType";
import { fromHex } from '../../utils/format';

enum CosmosSignatureKeys {
  uuid = 1,
  signature,
  origin,
}

export class CosmosSignature extends RegistryItem {
  uuid: Buffer;
  origin?: string;
  signature: Buffer;

  constructor(params: {
    signature: Buffer;
    uuid: Buffer;
    origin?: string;
  }) {
    super();
    this.signature = params.signature;
    this.uuid = params.uuid;
    this.origin = params.origin;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.COSMOS_SIGNATURE;
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
  
    map[CosmosSignatureKeys.uuid] = new DataItem(this.uuid, RegistryTypes.UUID.getTag());
  
    if (this.origin) {
      map[CosmosSignatureKeys.origin] = this.origin;
    }
  
    map[CosmosSignatureKeys.signature] = this.signature; // 直接使用 signature，无需 CborBytes
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): CosmosSignature {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const signature = fromHex(map[CosmosSignatureKeys.signature.toString()]);
    const uuid = fromHex(map[CosmosSignatureKeys.uuid.toString()]);
    const origin = map[CosmosSignatureKeys.origin.toString()];

    return new CosmosSignature({
      signature: signature,
      uuid: uuid,
      origin: origin,
    });
  }

    static fromCBOR(cborPayload: Buffer): CosmosSignature {
      const dataItem = decodeToDataItem(cborPayload);
      return this.fromDataItem(dataItem);
    }
}