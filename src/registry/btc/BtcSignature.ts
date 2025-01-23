import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryTypes } from "../RegistryType";
import { CryptoGspl } from '../CryptoGspl';
import { generateUuid } from '../../utils/uuid';
import { fromHex } from '../../utils/format';
import { decodeToDataItem, DataItem} from '../../cbor';


enum BtcSignatureKeys {
  uuid = 1,
  gspl,
  origin,
}

export class BtcSignature extends RegistryItem {
  uuid?: Buffer;
  origin?: string;
  gspl: CryptoGspl;

  constructor(params: {
    gspl: CryptoGspl;
    uuid?: Buffer;
    origin?: string;
  }) {
    super();
    this.gspl = params.gspl;
    this.uuid = params.uuid;
    this.origin = params.origin;
  }

  getRegistryType() {
    return ExtendedRegistryTypes.BTC_SIGNATURE;
  }

  getRequestId(): Buffer | undefined {
    return this.uuid ?? generateUuid();
  }

  getGspl(): CryptoGspl {
    return this.gspl;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
  
    if (this.uuid) {
      const uuidData = this.uuid;
      map[BtcSignatureKeys.uuid] = new DataItem(uuidData, RegistryTypes.UUID.getTag());
    }
  
    if (this.origin) {
      map[BtcSignatureKeys.origin] = this.origin;
    }
  
    const gsplDataItem = this.gspl.toDataItem();
    const gsplTag = this.gspl.getRegistryType().getTag();
    map[BtcSignatureKeys.gspl] = new DataItem(gsplDataItem, gsplTag);
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): BtcSignature {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const gspl = CryptoGspl.fromDataItem(map[BtcSignatureKeys.gspl.toString()]);
    const uuid = map[BtcSignatureKeys.uuid.toString()] ? fromHex(map[BtcSignatureKeys.uuid.toString()]) : undefined;
    const origin = map[BtcSignatureKeys.origin.toString()];

    return new BtcSignature({
      gspl: gspl,
      uuid: uuid,
      origin: origin,
    });
  }

  static fromCBOR(cborPayload: Buffer): BtcSignature {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}