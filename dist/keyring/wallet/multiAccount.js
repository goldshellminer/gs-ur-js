"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMultiAccounts = parseMultiAccounts;
const RegistryType_1 = require("../../registry/RegistryType");
const CryptoMultiAccounts_1 = require("../../registry/extended/CryptoMultiAccounts");
const hdkey_1 = require("./hdkey");
function parseMultiAccounts(ur) {
    if (ur.type !== RegistryType_1.ExtendedRegistryTypes.CRYPTO_MULTI_ACCOUNTS.getType()) {
        throw new Error('type not match');
    }
    const accounts = CryptoMultiAccounts_1.CryptoMultiAccounts.fromCBOR(ur.cbor);
    const masterFingerprint = accounts.masterFingerprint;
    return {
        device: accounts.device,
        masterFingerprint: masterFingerprint,
        keys: accounts.keys.map((hdKey) => (0, hdkey_1.parseCryptoHDKey)(hdKey)),
        deviceId: accounts.deviceId,
        version: accounts.version,
        nickName: accounts.nickName,
    };
}
//# sourceMappingURL=multiAccount.js.map