import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryTypes } from "../RegistryType";
import { CryptoGspl } from '../CryptoGspl';
import { fromHex } from '../../utils/format';
import { generateUuid } from '../../utils/uuid';
import { DataItem, decodeToDataItem } from "../../cbor";

enum BtcSignRequestKeys {
  uuid = 1,
  gspl,
  derivationPath,
  origin,
}

export class BtcSignRequest extends RegistryItem {
  uuid: Buffer;
  gspl: CryptoGspl;
  derivationPath?: CryptoKeypath;
  origin?: string;

  constructor(params: {
    uuid: Buffer;
    gspl: CryptoGspl;
    derivationPath?: CryptoKeypath;
    origin?: string;
  }) {
    super();
    this.uuid = params.uuid;
    this.gspl = params.gspl;
    this.derivationPath = params.derivationPath;
    this.origin = params.origin;
  }

  getRegistryType() {
    return ExtendedRegistryTypes.BTC_SIGN_REQUEST;
  }

  getRequestId(): Buffer {
    return this.uuid ?? generateUuid();
  }

  getSignData(): CryptoGspl {
    return this.gspl;
  }

  getPath(): CryptoKeypath | undefined {
    return this.derivationPath;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
  
    const uuidData = this.getRequestId();
    map[BtcSignRequestKeys.uuid] = new DataItem(uuidData, RegistryTypes.UUID.getTag());
  
    const gsplDataItem = this.gspl.toDataItem();
    const gsplTag = this.gspl.getRegistryType().getTag();
    gsplDataItem.setTag(gsplTag);
    map[BtcSignRequestKeys.gspl] = gsplDataItem;
  
    if (this.derivationPath) {
      const derivationPathDataItem = this.derivationPath.toDataItem();
      const derivationPathTag = this.derivationPath.getRegistryType().getTag();
      derivationPathDataItem.setTag(derivationPathTag);
      map[BtcSignRequestKeys.derivationPath] = derivationPathDataItem;
    }
  
    if (this.origin) {
      map[BtcSignRequestKeys.origin] = this.origin;
    }
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): BtcSignRequest {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }

    const gspl = CryptoGspl.fromCBOR(map[BtcSignRequestKeys.gspl.toString()]); // Assuming CryptoGspl has a fromCBOR method
    const uuid = fromHex(map[BtcSignRequestKeys.uuid.toString()]);
    const derivationPath = map[BtcSignRequestKeys.derivationPath.toString()] ? CryptoKeypath.fromDataItem(map[BtcSignRequestKeys.derivationPath.toString()]) : undefined;
    const origin = map[BtcSignRequestKeys.origin.toString()];

    return new BtcSignRequest({
      uuid: uuid,
      gspl: gspl,
      derivationPath: derivationPath,
      origin: origin,
    });
  }

  static fromCBOR(cborPayload: Buffer): BtcSignRequest {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);

  }
}
