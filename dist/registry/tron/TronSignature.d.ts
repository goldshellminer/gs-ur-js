import { DataItem } from '../../cbor/index';
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare class TronSignature extends RegistryItem {
    uuid: Buffer;
    origin?: string;
    signature: Buffer;
    constructor(params: {
        signature: Buffer;
        uuid: Buffer;
        origin?: string;
    });
    getRegistryType(): RegistryType;
    getRequestId(): Buffer;
    getSignature(): Buffer;
    getOrigin(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): TronSignature;
    static fromCBOR(cborPayload: Buffer): TronSignature;
}
