import { DataItem, decodeToDataItem } from '../../cbor/index';
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from "../RegistryType";
import { fromHex } from '../../utils/format';

enum EthSignatureKeys {
  uuid = 1,
  signature,
  origin,
}
export class EthSignature extends RegistryItem {
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
    return ExtendedRegistryTypes.ETH_SIGNATURE;
  }

  getRequestId(): Buffer | undefined {
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
    if (this.uuid) {
      map[EthSignatureKeys.uuid] = new DataItem(this.uuid, RegistryTypes.UUID.getTag());
    }
    if (this.origin) {
      map[EthSignatureKeys.origin] = this.origin;
    }
    map[EthSignatureKeys.signature] = this.signature;

    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): EthSignature {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const signature = fromHex(map[EthSignatureKeys.signature.toString()]);
    const uuid = map[EthSignatureKeys.uuid.toString()] ? fromHex(map[EthSignatureKeys.uuid.toString()]) : undefined;
    const origin = map[EthSignatureKeys.origin.toString()];

    return new EthSignature({
      signature: signature,
      uuid: uuid,
      origin: origin,
    });
  }

  static fromCBOR(cborPayload: Buffer): EthSignature {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}