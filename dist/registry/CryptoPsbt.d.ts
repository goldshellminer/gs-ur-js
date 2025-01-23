import { DataItem } from '../cbor/index';
import { RegistryItem } from './RegistryItem';
import { RegistryType } from './RegistryType';
export declare class CryptoPsbt extends RegistryItem {
    data: Buffer;
    constructor(data: Buffer);
    getRegistryType(): RegistryType;
    toDataItem(): DataItem;
    static fromDataItem: (dataItem: DataItem) => CryptoPsbt;
    static fromCBOR(cborPayload: Buffer): CryptoPsbt;
}
