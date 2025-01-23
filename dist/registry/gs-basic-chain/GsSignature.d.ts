import { DataItem } from '../../cbor/index';
import { RegistryItem } from "../RegistryItem";
export declare enum GsSignatureKeys {
    uuid = 1,
    signature = 2,
    origin = 3
}
export declare class GsSignature extends RegistryItem {
    uuid?: Buffer;
    origin?: string;
    signature: Buffer;
    constructor(params: {
        signature: Buffer;
        uuid?: Buffer;
        origin?: string;
    });
    getRegistryType(): import("../RegistryType").RegistryType;
    getRequestId(): Buffer | undefined;
    getSignature(): Buffer;
    getOrigin(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): GsSignature;
    static fromCBOR(cborPayload: Buffer): GsSignature;
}
