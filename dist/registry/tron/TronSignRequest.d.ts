import { DataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare class TronSignRequest extends RegistryItem {
    uuid: Buffer;
    signData: Buffer;
    origin?: string;
    fee?: number;
    derivationPath: CryptoKeypath;
    constructor(params: {
        uuid: Buffer;
        signData: Buffer;
        fee?: number;
        derivationPath: CryptoKeypath;
        origin?: string;
    });
    getRegistryType(): RegistryType;
    getRequestId(): Buffer;
    getSignData(): Buffer;
    getOrigin(): string | undefined;
    getFee(): number | undefined;
    getDerivationPath(): string | null;
    getSourceFingerprint(): Buffer | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): TronSignRequest;
    static fromCBOR(cborPayload: Buffer): TronSignRequest;
}
