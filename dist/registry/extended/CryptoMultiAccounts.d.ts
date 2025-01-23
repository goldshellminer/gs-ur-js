import { DataItem } from '../../cbor/index';
import { CryptoHDKey } from '../CryptoHdKey';
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare class CryptoMultiAccounts extends RegistryItem {
    masterFingerprint: Buffer;
    keys: CryptoHDKey[];
    device: string;
    deviceId: string;
    version: string;
    nickName?: string;
    constructor(params: {
        masterFingerprint: Buffer;
        keys: CryptoHDKey[];
        device: string;
        deviceId: string;
        version: string;
        nickName?: string;
    });
    getRegistryType(): RegistryType;
    getMasterFingerprint(): Buffer;
    getKeys(): CryptoHDKey[];
    getDevice(): string;
    getDeviceId(): string;
    getVersion(): string;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): CryptoMultiAccounts;
    static fromCBOR(cborPayload: Buffer): CryptoMultiAccounts;
}
