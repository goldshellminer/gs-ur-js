import { DataItem } from '../../cbor/index';
import { RegistryItem } from "../RegistryItem";
export declare class BtcInscribeSignature extends RegistryItem {
    uuid?: Buffer;
    origin?: string;
    commitSignature: Buffer;
    revealSignature: Buffer;
    constructor(params: {
        commitSignature: Buffer;
        revealSignature: Buffer;
        uuid?: Buffer;
        origin?: string;
    });
    getRegistryType(): import("../RegistryType").RegistryType;
    getRequestId(): Buffer | undefined;
    getCommitSignature(): Buffer;
    getRevealSignature(): Buffer;
    getOrigin(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): BtcInscribeSignature;
    static fromCBOR(cborPayload: Buffer): BtcInscribeSignature;
}
