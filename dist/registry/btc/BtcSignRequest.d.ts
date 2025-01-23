import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { CryptoGspl } from '../CryptoGspl';
import { DataItem } from "../../cbor";
export declare class BtcSignRequest extends RegistryItem {
    uuid: Buffer;
    gspl: CryptoGspl;
    derivationPath?: CryptoKeypath;
    origin?: string;
    constructor(params: {
        uuid: Buffer;
        gspl: CryptoGspl;
        derivationPath?: CryptoKeypath;
        origin?: string;
    });
    getRegistryType(): import("../RegistryType").RegistryType;
    getRequestId(): Buffer;
    getSignData(): CryptoGspl;
    getPath(): CryptoKeypath | undefined;
    getOrigin(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): BtcSignRequest;
    static fromCBOR(cborPayload: Buffer): BtcSignRequest;
}
