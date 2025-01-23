import { DataItem } from '../../cbor/index';
import { RegistryType } from "../RegistryType";
import { GsSignature } from '../gs-basic-chain/GsSignature';
export declare class SolSignature extends GsSignature {
    constructor(params: {
        signature: Buffer;
        uuid: Buffer;
        origin?: string;
    });
    getRegistryType(): RegistryType;
    static fromDataItem(dataItem: DataItem): GsSignature;
    static fromCBOR(cborPayload: Buffer): GsSignature;
}
