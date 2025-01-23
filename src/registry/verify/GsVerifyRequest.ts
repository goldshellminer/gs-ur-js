import { DataItem, decodeToDataItem } from "../../cbor";
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType } from "../RegistryType";

export enum GsVerifyRequestKeys {
  puzzle = 1,
}

export class GsVerifyRequest extends RegistryItem {
  private puzzle: string;

  constructor(puzzle: string) {
    super();
    this.puzzle = puzzle;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.GS_VERIFY_REQUEST;
  }

  getPuzzle(): string {
    return this.puzzle;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
    map[GsVerifyRequestKeys.puzzle] = this.puzzle;
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): GsVerifyRequest {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }

    const puzzle = map[GsVerifyRequestKeys.puzzle.toString()];
    return new GsVerifyRequest(puzzle);
  }

  static fromCBOR(cborPayload: Buffer): GsVerifyRequest {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}