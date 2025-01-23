export declare function fromHex(hexString: string): Buffer;
export declare function bigIntToBytes(bigIntStr: string): Buffer;
export declare function toHex(data: Buffer, addPrefix?: boolean): string;
export declare function intToUint8List(value: number): Buffer;
export declare function listToBase58(list: number[]): string;
export declare function parsePath(path: string): Array<{
    index: number;
    hardened: boolean;
}>;
