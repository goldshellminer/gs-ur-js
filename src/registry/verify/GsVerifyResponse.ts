import { DataItem, decodeToDataItem } from "../../cbor";
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType } from "../RegistryType";

export enum GsVerifyResponseKeys {
  deviceid = 1,
  validation,
  origin,
}

export class GsVerifyResponse extends RegistryItem {
  private deviceid: string;
  private validation: string;
  private origin?: string;

  constructor(deviceid: string, validation: string, origin?: string) {
    super();
    this.deviceid = deviceid;
    this.validation = validation;
    this.origin = origin;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.GS_VERIFY_RESPONSE;
  }

  getDeviceid(): string {
    return this.deviceid;
  }

  getValidation(): string {
    return this.validation;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
    map[GsVerifyResponseKeys.deviceid] = this.deviceid;
    map[GsVerifyResponseKeys.validation] = this.validation;
    if (this.origin !== undefined) {
      map[GsVerifyResponseKeys.origin] = this.origin;
    }
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): GsVerifyResponse {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }

    const deviceid = map[GsVerifyResponseKeys.deviceid.toString()];
    const validation = map[GsVerifyResponseKeys.validation.toString()];
    const origin = map[GsVerifyResponseKeys.origin.toString()];

    return new GsVerifyResponse(deviceid, validation, origin);
  }

  static fromCBOR(cborPayload: Buffer): GsVerifyResponse {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}