import { DataItem } from '../cbor/index';
import { RegistryItem } from "./RegistryItem";
import { RegistryType } from './RegistryType';
export declare class CryptoTxEntity extends RegistryItem {
    private readonly address?;
    private readonly amount?;
    constructor(options: {
        address?: string;
        amount?: Buffer;
    });
    getRegistryType(): RegistryType;
    getAmount(): Buffer | undefined;
    getAddress(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): CryptoTxEntity;
    static fromCBOR(cborPayload: Buffer): CryptoTxEntity;
}
export declare function parseTxEntity(txEntityMap: Record<string, any>): CryptoTxEntity;
