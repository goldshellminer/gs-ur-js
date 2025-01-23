import { GsSignature } from '../gs-basic-chain/GsSignature';
import { DataItem } from '../../cbor';
export declare class AlphSignature extends GsSignature {
    constructor(params: {
        signature: Buffer;
        uuid?: Buffer;
        origin?: string;
    });
    getRegistryType(): import("../RegistryType").RegistryType;
    static fromDataItem(dataItem: DataItem): GsSignature;
    static fromCBOR(cborPayload: Buffer): GsSignature;
}
