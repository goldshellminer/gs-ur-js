import { RegistryItem } from "../RegistryItem";
import { DataItem } from '../../cbor';
export declare class BtcInscribeRequest extends RegistryItem {
    uuid?: Buffer;
    commitData: Buffer;
    revealData: Buffer;
    origin?: string;
    constructor(params: {
        uuid?: Buffer;
        commitData: Buffer;
        revealData: Buffer;
        origin?: string;
    });
    getRegistryType(): import("../RegistryType").RegistryType;
    getRequestId(): Buffer;
    getCommitData(): Buffer;
    getRevealData(): Buffer;
    getOrigin(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): BtcInscribeRequest;
    static fromCBOR(cborPayload: Buffer): BtcInscribeRequest;
}
