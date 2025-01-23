import { DataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare class CosmosSignRequest extends RegistryItem {
    uuid?: Buffer;
    signData: Buffer;
    origin?: string;
    chain: string;
    derivationPath: CryptoKeypath;
    fee?: number;
    constructor(params: {
        uuid?: Buffer;
        signData: Buffer;
        origin?: string;
        chain: string;
        derivationPath: CryptoKeypath;
        fee?: number;
    });
    getRegistryType(): RegistryType;
    getRequestId(): Buffer;
    getSignData(): Buffer;
    getOrigin(): string | undefined;
    getChain(): string;
    getDerivationPath(): string | null;
    getSourceFingerprint(): Buffer | undefined;
    getFee(): number | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): CosmosSignRequest;
    static fromCBOR(cborPayload: Buffer): CosmosSignRequest;
}
