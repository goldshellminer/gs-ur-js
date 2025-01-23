import { DataItem } from "../../cbor";
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare enum GsVerifyResponseKeys {
    deviceid = 1,
    validation = 2,
    origin = 3
}
export declare class GsVerifyResponse extends RegistryItem {
    private deviceid;
    private validation;
    private origin?;
    constructor(deviceid: string, validation: string, origin?: string);
    getRegistryType(): RegistryType;
    getDeviceid(): string;
    getValidation(): string;
    getOrigin(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): GsVerifyResponse;
    static fromCBOR(cborPayload: Buffer): GsVerifyResponse;
}
