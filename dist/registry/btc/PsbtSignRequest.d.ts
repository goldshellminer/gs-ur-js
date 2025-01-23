import { DataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare class PsbtSignRequest extends RegistryItem {
    uuid?: Buffer;
    psbt: Buffer;
    derivationPath?: CryptoKeypath;
    origin?: string;
    constructor(params: {
        uuid?: Buffer;
        psbt: Buffer;
        derivationPath?: CryptoKeypath;
        origin?: string;
    });
    getRegistryType(): RegistryType;
    getRequestId(): Buffer;
    getSignData(): Buffer;
    getPath(): CryptoKeypath | undefined;
    getOrigin(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): PsbtSignRequest;
    static fromCBOR(cborPayload: Buffer): PsbtSignRequest;
}
