import { DataItem } from '../cbor';
import { RegistryItem } from './RegistryItem';
export declare class Bytes extends RegistryItem {
    private bytes;
    getRegistryType: () => import("./RegistryType").RegistryType;
    constructor(bytes: Buffer);
    getData: () => Buffer<ArrayBufferLike>;
    toDataItem: () => DataItem;
    static fromDataItem: (dataItem: DataItem) => Bytes;
    static fromCBOR: (_cborPayload: Buffer) => Bytes;
}
