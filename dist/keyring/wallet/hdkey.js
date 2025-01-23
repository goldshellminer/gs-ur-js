"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHDKey = parseHDKey;
exports.parseCryptoHDKey = parseCryptoHDKey;
const RegistryType_1 = require("../../registry/RegistryType");
const format_1 = require("../../utils/format");
const CryptoHdKey_1 = require("../../registry/CryptoHdKey");
const chainList_1 = require("../../chain/chainList");
function parseHDKey(ur) {
    if (ur.type !== RegistryType_1.RegistryTypes.CRYPTO_HDKEY.getType()) {
        throw new Error("type not match");
    }
    const hdKey = CryptoHdKey_1.CryptoHDKey.fromCBOR(ur.cbor);
    return parseCryptoHDKey(hdKey);
}
function parseCryptoHDKey(hdKey) {
    const chainCode = hdKey.chainCode ? (0, format_1.toHex)(hdKey.chainCode) : undefined;
    const parentFingerprint = hdKey.parentFingerprint ? (0, format_1.toHex)(hdKey.parentFingerprint) : undefined;
    const origin = hdKey.origin;
    if (!origin?.getSourceFingerprint()) {
        throw new Error("HDKey is invalid");
    }
    const xfp = (0, format_1.toHex)(origin.getSourceFingerprint() ?? Buffer.alloc(0));
    let extendedPublicKey;
    if (chainCode && parentFingerprint) {
        extendedPublicKey = hdKey.getBip32Key();
    }
    const coinType = origin.getComponents()[1]?.getIndex() ?? 0;
    return {
        chain: (0, chainList_1.getChainConfByCoinType)(coinType)?.symbol,
        path: `m/${origin.getPath()}`,
        publicKey: (0, format_1.toHex)(hdKey.keyData),
        name: hdKey.name,
        xfp: xfp,
        chainCode: chainCode,
        extendedPublicKey: extendedPublicKey,
        note: hdKey.note,
    };
}
//# sourceMappingURL=hdkey.js.map