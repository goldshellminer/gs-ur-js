
import { DataItem, decodeToDataItem } from '../../cbor/index';
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryTypes } from "../RegistryType";
import { fromHex } from '../../utils/format';
import { generateUuid } from '../../utils/uuid';


enum BtcInscribeSignatureKeys {
  uuid = 1,
  commitSignature,
  revealSignature,
  origin,
}

export class BtcInscribeSignature extends RegistryItem {
  uuid?: Buffer;
  origin?: string;
  commitSignature: Buffer;
  revealSignature: Buffer;

  constructor(params: {
    commitSignature: Buffer;
    revealSignature: Buffer;
    uuid?: Buffer;
    origin?: string;
  }) {
    super();
    this.commitSignature = params.commitSignature;
    this.revealSignature = params.revealSignature;
    this.uuid = params.uuid;
    this.origin = params.origin;
  }

  getRegistryType() {
    return ExtendedRegistryTypes.BTC_INSCRIBE_SIGNATURE;
  }

  getRequestId(): Buffer | undefined {
    return this.uuid ?? generateUuid();
  }

  getCommitSignature(): Buffer {
    return this.commitSignature;
  }

  getRevealSignature(): Buffer {
    return this.revealSignature;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
  
    if (this.uuid) {
      map[BtcInscribeSignatureKeys.uuid] = new DataItem(this.uuid, RegistryTypes.UUID.getTag());
    }
  
    if (this.origin) {
      map[BtcInscribeSignatureKeys.origin] = this.origin;
    }
  
    map[BtcInscribeSignatureKeys.commitSignature] = new DataItem(this.commitSignature, RegistryTypes.CRYPTO_PSBT.getTag());
    map[BtcInscribeSignatureKeys.revealSignature] = new DataItem(this.revealSignature, RegistryTypes.CRYPTO_PSBT.getTag());
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): BtcInscribeSignature {
    const map = dataItem.getData() as Record<string, any>;
    if (!map) {
      throw new Error("Param for fromDataItem is neither String nor object, please check it!");
    }

    const commitSignature = fromHex(map[BtcInscribeSignatureKeys.commitSignature.toString()]);
    const revealSignature = fromHex(map[BtcInscribeSignatureKeys.revealSignature.toString()]);
    const uuid = map[BtcInscribeSignatureKeys.uuid.toString()] ? fromHex(map[BtcInscribeSignatureKeys.uuid.toString()]) : undefined;
    const origin = map[BtcInscribeSignatureKeys.origin.toString()];


    return new BtcInscribeSignature({
      commitSignature: commitSignature,
      revealSignature: revealSignature,
      uuid: uuid,
      origin: origin,
    });
  }

  static fromCBOR(cborPayload: Buffer): BtcInscribeSignature {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}