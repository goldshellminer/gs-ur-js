import { DataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare enum EthDataType {
    transaction = 1,
    typedData = 2,
    personalMessage = 3,
    typedTransaction = 4
}
export declare class EthSignRequest extends RegistryItem {
    uuid?: Buffer;
    signData: Buffer;
    dataType: EthDataType;
    chainId?: number;
    derivationPath: CryptoKeypath;
    address?: Buffer;
    origin?: string;
    constructor(params: {
        uuid?: Buffer;
        signData: Buffer;
        dataType: EthDataType;
        chainId?: number;
        derivationPath: CryptoKeypath;
        address?: Buffer;
        origin?: string;
    });
    getRegistryType(): RegistryType;
    getRequestId(): Buffer;
    getSignData(): Buffer;
    getEthDataType(): EthDataType;
    getChainId(): number | undefined;
    getDerivationPath(): string | null;
    getSourceFingerprint(): Buffer | undefined;
    getSignRequestAddress(): Buffer | undefined;
    getOrigin(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): EthSignRequest;
    static fromCBOR(cborPayload: Buffer): EthSignRequest;
}
