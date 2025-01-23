import { DataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare enum SignType {
    transaction = 1,
    message = 2
}
export declare class SolSignRequest extends RegistryItem {
    uuid?: Buffer;
    signData: Buffer;
    signType: SignType;
    derivationPath: CryptoKeypath;
    outputAddress?: string;
    contractAddress?: string;
    origin?: string;
    fee?: number;
    constructor(params: {
        uuid?: Buffer;
        signData: Buffer;
        signType: SignType;
        derivationPath: CryptoKeypath;
        outputAddress?: string;
        contractAddress?: string;
        origin?: string;
        fee?: number;
    });
    getRegistryType(): RegistryType;
    getRequestId(): Buffer;
    getSignData(): Buffer;
    getSignType(): SignType;
    getDerivationPath(): string | null;
    getSourceFingerprint(): Buffer | undefined;
    getOutputAddress(): string | undefined;
    getContractAddress(): string | undefined;
    getOrigin(): string | undefined;
    getFee(): number | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): SolSignRequest;
    static fromCBOR(cborPayload: Buffer): SolSignRequest;
}
