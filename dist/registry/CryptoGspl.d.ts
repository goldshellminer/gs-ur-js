import { DataItem } from '../cbor/index';
import { RegistryItem } from './RegistryItem';
import { RegistryType } from './RegistryType';
import { CryptoTxElement } from './CryptoTxElement';
export declare enum GsplDataType {
    transaction = 1,
    message = 2
}
export declare class CryptoGspl extends RegistryItem {
    data: Buffer;
    dataType: GsplDataType;
    inputs?: CryptoTxElement[];
    change?: CryptoTxElement;
    constructor(params: {
        data: Buffer;
        dataType: GsplDataType;
        inputs?: CryptoTxElement[];
        change?: CryptoTxElement;
    });
    getRegistryType(): RegistryType;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): CryptoGspl;
    static fromCBOR(cborPayload: Buffer): CryptoGspl;
}
