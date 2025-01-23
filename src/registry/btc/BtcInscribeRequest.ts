import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryTypes } from "../RegistryType";
import { fromHex } from '../../utils/format';
import { generateUuid } from '../../utils/uuid';
import { DataItem, decodeToDataItem } from '../../cbor';


enum BtcInscribeRequestKeys {
  uuid = 1,
  commitData,
  revealData,
  origin,
}

export class BtcInscribeRequest extends RegistryItem {
  uuid?: Buffer;
  commitData: Buffer;
  revealData: Buffer;
  origin?: string;

  constructor(params: {
    uuid?: Buffer;
    commitData: Buffer;
    revealData: Buffer;
    origin?: string;
  }) {
    super();
    this.uuid = params.uuid;
    this.commitData = params.commitData;
    this.revealData = params.revealData;
    this.origin = params.origin;
  }

  getRegistryType() {
    return ExtendedRegistryTypes.BTC_INSCRIBE_REQUEST;
  }

  getRequestId(): Buffer {
    if (!this.uuid) {
      this.uuid = generateUuid();
    }
    return this.uuid;
  }

  getCommitData(): Buffer {
    return this.commitData;
  }

  getRevealData(): Buffer {
    return this.revealData;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
  
    map[BtcInscribeRequestKeys.uuid] = new DataItem(this.getRequestId(), RegistryTypes.UUID.getTag());
    map[BtcInscribeRequestKeys.commitData] = new DataItem(this.commitData, RegistryTypes.CRYPTO_PSBT.getTag());
    map[BtcInscribeRequestKeys.revealData] = new DataItem(this.revealData, RegistryTypes.CRYPTO_PSBT.getTag());
  
    if (this.origin) {
      map[BtcInscribeRequestKeys.origin] = this.origin;
    }
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): BtcInscribeRequest {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }

    const commitData = fromHex(map[BtcInscribeRequestKeys.commitData.toString()]);
    const revealData = fromHex(map[BtcInscribeRequestKeys.revealData.toString()]);
    const uuid = map[BtcInscribeRequestKeys.uuid.toString()] ? fromHex(map[BtcInscribeRequestKeys.uuid.toString()]) : undefined;
    const origin = map[BtcInscribeRequestKeys.origin.toString()];

    return new BtcInscribeRequest({
      uuid: uuid,
      commitData: commitData,
      revealData: revealData,
      origin: origin,
    });
  }


  static fromCBOR(cborPayload: Buffer): BtcInscribeRequest {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);

  }
}