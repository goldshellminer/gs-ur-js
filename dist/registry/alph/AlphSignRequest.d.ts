import { DataItem } from '../../cbor';
import { CryptoKeypath } from "../CryptoKeyPath";
import { CryptoTxEntity } from "../CryptoTxEntity";
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare class AlphSignRequest extends RegistryItem {
    uuid: Buffer;
    data: Buffer;
    derivationPath?: CryptoKeypath;
    outputs?: CryptoTxEntity[];
    origin?: string;
    constructor(params: {
        uuid: Buffer;
        data: Buffer;
        derivationPath?: CryptoKeypath;
        outputs?: CryptoTxEntity[];
        origin?: string;
    });
    getRegistryType(): RegistryType;
    getRequestId(): Buffer;
    getData(): Buffer;
    getPath(): CryptoKeypath | undefined;
    getOutputs(): CryptoTxEntity[] | undefined;
    getOrigin(): string | undefined;
    toDataItem(): DataItem;
    static fromDataItem(jsonData: any): AlphSignRequest;
    static fromCBOR(cborPayload: Buffer): AlphSignRequest;
}
