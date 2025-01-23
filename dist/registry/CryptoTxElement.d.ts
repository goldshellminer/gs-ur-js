import { DataItem } from '../cbor/index';
import { PathComponent } from "./CryptoKeyPath";
import { RegistryItem } from "./RegistryItem";
import { RegistryType } from "./RegistryType";
export declare class CryptoTxElement extends RegistryItem {
    path?: PathComponent[];
    address?: string;
    amount?: number;
    signature?: Buffer;
    signhashType?: number;
    constructor(options: {
        path?: PathComponent[];
        address?: string;
        amount?: number;
        signature?: Buffer;
        signhashType?: number;
    });
    getRegistryType(): RegistryType;
    getPath(): string | null;
    getComponents(): PathComponent[] | null;
    getAmount(): number | null;
    getAddress(): string | null;
    getSignature(): Buffer | null;
    getSignhashType(): number | null;
    toDataItem(): DataItem;
    /**
     * 从 JSON 数据或字符串创建 `CryptoTxElement` 实例
     * @param jsonData JSON 数据或字符串
     */
    static fromDataItem(dataItem: DataItem): CryptoTxElement;
    /**
     * 从 CBOR 编码的 `Buffer` 创建 `CryptoTxElement` 实例
     * @param cborPayload CBOR 编码的 `Buffer`
     */
    static fromCBOR(cborPayload: Buffer): CryptoTxElement;
}
export declare function parseTxElement(txElementMap: Record<string, any>): CryptoTxElement;
