import { RegistryItem } from "../RegistryItem";
import { CryptoGspl } from '../CryptoGspl';
import { DataItem } from '../../cbor';
export declare class BtcSignature extends RegistryItem {
    uuid?: Buffer;
    origin?: string;
    gspl: CryptoGspl;
    constructor(params: {
        gspl: CryptoGspl;
        uuid?: Buffer;
        origin?: string;
    });
    getRegistryType(): import("../RegistryType").RegistryType;
    getRequestId(): Buffer | undefined;
    getGspl(): CryptoGspl;
    getOrigin(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): BtcSignature;
    static fromCBOR(cborPayload: Buffer): BtcSignature;
}
