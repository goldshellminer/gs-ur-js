import { DataItem } from '../cbor/index';
import { RegistryItem } from './RegistryItem';
import { CryptoCoinInfo } from './CryptoCoinInfo';
import { CryptoKeypath } from './CryptoKeyPath';
import { RegistryType } from './RegistryType';
export declare class CryptoHDKey extends RegistryItem {
    isMaster?: boolean;
    isPrivateKey?: boolean;
    keyData?: Buffer;
    chainCode?: Buffer;
    useInfo?: CryptoCoinInfo;
    origin?: CryptoKeypath;
    children?: CryptoKeypath;
    parentFingerprint?: Buffer;
    name?: string;
    note?: string;
    constructor(params?: {
        isMaster?: boolean;
        isPrivateKey?: boolean;
        keyData?: Buffer;
        chainCode?: Buffer;
        useInfo?: CryptoCoinInfo;
        origin?: CryptoKeypath;
        children?: CryptoKeypath;
        parentFingerprint?: Buffer;
        name?: string;
        note?: string;
    });
    isECKey(): boolean;
    getBip32Key(chain?: string): string;
    getRegistryType(): RegistryType;
    getOutputDescriptorContent(): string;
    toDataItem(): DataItem;
    static fromDataItem(jsonData: any): CryptoHDKey;
    static fromCBOR(cborPayload: Buffer): CryptoHDKey;
}
export declare class CryptoMasterHDKey extends CryptoHDKey {
    constructor(params: {
        keyData: Buffer;
        chainCode: Buffer;
        name?: string;
        note?: string;
    });
}
export declare class CryptoDeriveHDKey extends CryptoHDKey {
    constructor(params: {
        keyData: Buffer;
        chainCode?: Buffer;
        useInfo?: CryptoCoinInfo;
        origin?: CryptoKeypath;
        children?: CryptoKeypath;
        parentFingerprint?: Buffer;
        name?: string;
        note?: string;
    });
}
