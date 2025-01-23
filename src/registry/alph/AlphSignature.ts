import { ExtendedRegistryTypes } from "../RegistryType";
import { GsSignature, GsSignatureKeys } from '../gs-basic-chain/GsSignature';
import { DataItem, decodeToDataItem } from '../../cbor';

export class AlphSignature extends GsSignature {
  constructor(params: {
    signature: Buffer;
    uuid?: Buffer;
    origin?: string;
  }) {
    super(params);
  }

  getRegistryType() {
    return ExtendedRegistryTypes.ALPH_SIGNATURE;
  }

  static fromDataItem(dataItem: DataItem): GsSignature {
    const map = dataItem.getData() as Record<string, any>;
    if (!map) {
      throw new Error("Param for fromDataItem is neither String nor object, please check it!");
    }
    const signature = Buffer.from(map[GsSignatureKeys.signature.toString()], 'hex');
    const uuid = map[GsSignatureKeys.uuid.toString()] ? Buffer.from(map[GsSignatureKeys.uuid.toString()], 'hex') : undefined;
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