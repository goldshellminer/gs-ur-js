import { DataItem } from "../../cbor";
import { RegistryItem } from "../RegistryItem";
import { RegistryType } from "../RegistryType";
export declare enum GsVerifyRequestKeys {
    puzzle = 1
}
export declare class GsVerifyRequest extends RegistryItem {
    private puzzle;
    constructor(puzzle: string);
    getRegistryType(): RegistryType;
    getPuzzle(): string;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): GsVerifyRequest;
    static fromCBOR(cborPayload: Buffer): GsVerifyRequest;
}
