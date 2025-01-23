import { DataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare class GsSignRequest extends RegistryItem {
    uuid?: Buffer;
    signData: Buffer;
    origin?: string;
    chain: string;
    derivationPath: CryptoKeypath;
    constructor(params: {
        uuid?: Buffer;
        signData: Buffer;
        origin?: string;
        chain: string;
        derivationPath: CryptoKeypath;
    });
    getRegistryType(): RegistryType;
    getRequestId(): Buffer;
    getSignData(): Buffer;
    getOrigin(): string | undefined;
    getChain(): string;
    getDerivationPath(): string | null;
    getSourceFingerprint(): Buffer | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): GsSignRequest;
    static fromCBOR(cborPayload: Buffer): GsSignRequest;
}
