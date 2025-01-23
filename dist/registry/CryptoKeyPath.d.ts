import { DataItem } from '../cbor/index';
import { RegistryItem } from './RegistryItem';
import { RegistryType } from './RegistryType';
export declare class PathComponent {
    static readonly HARDENED_BIT = 2147483648;
    private readonly index?;
    private readonly wildcard;
    private readonly hardened;
    constructor(index?: number, hardened?: boolean);
    getIndex(): number | undefined;
    isWildcard(): boolean;
    isHardened(): boolean;
}
export declare class CryptoKeypath extends RegistryItem {
    private components;
    private sourceFingerprint?;
    private depth?;
    constructor(components?: PathComponent[], sourceFingerprint?: Buffer | undefined, depth?: number | undefined);
    getRegistryType(): RegistryType;
    getPath(): string | null;
    getComponents(): PathComponent[];
    getSourceFingerprint(): Buffer | undefined;
    getDepth(): number | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): CryptoKeypath;
    static fromCBOR(cborPayload: Buffer): CryptoKeypath;
}
