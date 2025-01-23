"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoMultiAccounts = void 0;
const index_1 = require("../../cbor/index");
const CryptoHdKey_1 = require("../CryptoHdKey");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
var MultiAccountsKeys;
(function (MultiAccountsKeys) {
    MultiAccountsKeys[MultiAccountsKeys["masterFingerprint"] = 1] = "masterFingerprint";
    MultiAccountsKeys[MultiAccountsKeys["keys"] = 2] = "keys";
    MultiAccountsKeys[MultiAccountsKeys["device"] = 3] = "device";
    MultiAccountsKeys[MultiAccountsKeys["deviceId"] = 4] = "deviceId";
    MultiAccountsKeys[MultiAccountsKeys["version"] = 5] = "version";
    MultiAccountsKeys[MultiAccountsKeys["nickName"] = 6] = "nickName";
})(MultiAccountsKeys || (MultiAccountsKeys = {}));
class CryptoMultiAccounts extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.masterFingerprint = params.masterFingerprint;
        this.keys = params.keys;
        this.device = params.device;
        this.deviceId = params.deviceId;
        this.version = params.version;
        this.nickName = params.nickName;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.CRYPTO_MULTI_ACCOUNTS;
    }
    getMasterFingerprint() {
        return this.masterFingerprint;
    }
    getKeys() {
        return this.keys;
    }
    getDevice() {
        return this.device;
    }
    getDeviceId() {
        return this.deviceId;
    }
    getVersion() {
        return this.version;
    }
    toDataItem() {
        const map = {};
        // Assuming masterFingerprint is a Buffer in TypeScript
        const masterFingerprintView = new DataView(this.masterFingerprint.buffer);
        const masterFingerprintUint32 = masterFingerprintView.getUint32(0, true); // true for little-endian
        map[MultiAccountsKeys.masterFingerprint] = masterFingerprintUint32;
        map[MultiAccountsKeys.keys] = this.keys.map((item) => {
            const dataItem = item.toDataItem();
            dataItem.setTag(item.getRegistryType().getTag());
            return dataItem;
        });
        map[MultiAccountsKeys.device] = this.device;
        map[MultiAccountsKeys.deviceId] = this.deviceId;
        map[MultiAccountsKeys.version] = this.version;
        if (this.nickName !== undefined) {
            map[MultiAccountsKeys.nickName] = this.nickName;
        }
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const masterFingerprint = new Buffer(4);
        const _masterFingerprint = map[MultiAccountsKeys.masterFingerprint.toString()];
        if (_masterFingerprint !== null && _masterFingerprint !== undefined) {
            const dataView = new DataView(masterFingerprint.buffer);
            dataView.setUint32(0, _masterFingerprint, true); // True for little-endian
        }
        const keys = map[MultiAccountsKeys.keys.toString()].map((item) => CryptoHdKey_1.CryptoHDKey.fromDataItem(item));
        const device = map[MultiAccountsKeys.device.toString()];
        const deviceId = map[MultiAccountsKeys.deviceId.toString()];
        const version = map[MultiAccountsKeys.version.toString()];
        const nickName = map[MultiAccountsKeys.nickName.toString()];
        return new CryptoMultiAccounts({ masterFingerprint, keys, device, deviceId, version, nickName });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.CryptoMultiAccounts = CryptoMultiAccounts;
//# sourceMappingURL=CryptoMultiAccounts.js.map