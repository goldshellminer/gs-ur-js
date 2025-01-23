"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromHex = fromHex;
exports.bigIntToBytes = bigIntToBytes;
exports.toHex = toHex;
exports.intToUint8List = intToUint8List;
exports.listToBase58 = listToBase58;
exports.parsePath = parsePath;
const bs58_1 = __importDefault(require("bs58"));
function fromHex(hexString) {
    if (hexString.startsWith('0x') || hexString.startsWith('0X')) {
        hexString = hexString.slice(2);
    }
    if (hexString.length % 2 !== 0) {
        throw new Error("Invalid hex string: Length must be even.");
    }
    const bytes = Buffer.alloc(hexString.length / 2);
    for (let i = 0; i < hexString.length; i += 2) {
        const byte = hexString.substr(i, 2);
        const parsedByte = parseInt(byte, 16);
        if (isNaN(parsedByte)) {
            throw new Error(`Invalid hex byte: ${byte} at position ${i}`);
        }
        bytes[i / 2] = parsedByte;
    }
    return bytes;
}
function bigIntToBytes(bigIntStr) {
    let bigIntValue;
    try {
        bigIntValue = BigInt(bigIntStr);
    }
    catch (error) {
        throw new Error(`Invalid BigInt string: ${bigIntStr}`);
    }
    // 计算位长度
    const bitLength = bigIntValue > 0n ? bigIntValue.toString(2).length : 0;
    const byteLength = Math.ceil(bitLength / 8) || 1; // 至少一个字节
    const bytes = Buffer.alloc(byteLength);
    for (let i = 0; i < byteLength; i++) {
        bytes[byteLength - 1 - i] = Number(bigIntValue & 0xffn);
        bigIntValue >>= 8n;
    }
    return bytes;
}
function toHex(data, addPrefix = false) {
    let result = '';
    if (addPrefix) {
        result += '0x';
    }
    for (let byte of data) {
        result += byte.toString(16).padStart(2, '0');
    }
    return result;
}
function intToUint8List(value) {
    const buffer = new ArrayBuffer(4); // 4 字节表示 32 位整数
    const view = new DataView(buffer);
    view.setInt32(0, value, false); // false 表示大端序
    return new Buffer(buffer);
}
function listToBase58(list) {
    const uint8Array = Buffer.from(list);
    return bs58_1.default.encode(uint8Array);
}
function parsePath(path) {
    const chunks = path.replace(/^m\//, '').split('/');
    return chunks.map(chunk => {
        const hardened = chunk.endsWith("'");
        const index = parseInt(hardened ? chunk.slice(0, -1) : chunk, 10);
        return {
            index,
            hardened
        };
    });
}
//# sourceMappingURL=format.js.map