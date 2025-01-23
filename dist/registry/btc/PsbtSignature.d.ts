import { DataItem } from '../../cbor/index';
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare class PsbtSignature extends RegistryItem {
    uuid?: Buffer;
    origin?: string;
    signature: Buffer;
    constructor(params: {
        signature: Buffer;
        uuid?: Buffer;
        origin?: string;
    });
    getRegistryType(): RegistryType;
    getRequestId(): Buffer | undefined;
    getSignature(): Buffer;
    getOrigin(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): PsbtSignature;
    static fromCBOR(cborPayload: Buffer): PsbtSignature;
}
