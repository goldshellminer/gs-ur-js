import { DataItem, decodeToDataItem } from '../../cbor/index';
import { ExtendedRegistryTypes, RegistryType } from "../RegistryType";
import { GsSignature, GsSignatureKeys } from '../gs-basic-chain/GsSignature';
import { fromHex } from '../../utils/format';

export class SolSignature extends GsSignature {
  constructor(params: { signature: Buffer; uuid: Buffer; origin?: string }) {
    super(params);
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.SOL_SIGNATURE;
  }

  static fromDataItem(dataItem: DataItem): GsSignature {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const signature = map[GsSignatureKeys.signature.toString()];
    const uuid = map[GsSignatureKeys.uuid.toString()];
    const origin = map[GsSignatureKeys.origin.toString()] as string | undefined;

    return new GsSignature({signature: fromHex(signature), uuid: fromHex(uuid), origin});
  }


  static fromCBOR(cborPayload: Buffer): GsSignature {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}
