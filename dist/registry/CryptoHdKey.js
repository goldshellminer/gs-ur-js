"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoDeriveHDKey = exports.CryptoMasterHDKey = exports.CryptoHDKey = void 0;
const index_1 = require("../cbor/index");
const RegistryItem_1 = require("./RegistryItem");
const CryptoCoinInfo_1 = require("./CryptoCoinInfo");
const CryptoKeyPath_1 = require("./CryptoKeyPath");
const RegistryType_1 = require("./RegistryType");
const chainList_1 = require("../chain/chainList");
const format_1 = require("../utils/format");
var HDKeyKeys;
(function (HDKeyKeys) {
    HDKeyKeys[HDKeyKeys["isMaster"] = 1] = "isMaster";
    HDKeyKeys[HDKeyKeys["isPrivate"] = 2] = "isPrivate";
    HDKeyKeys[HDKeyKeys["keyData"] = 3] = "keyData";
    HDKeyKeys[HDKeyKeys["chainCode"] = 4] = "chainCode";
    HDKeyKeys[HDKeyKeys["useInfo"] = 5] = "useInfo";
    HDKeyKeys[HDKeyKeys["origin"] = 6] = "origin";
    HDKeyKeys[HDKeyKeys["children"] = 7] = "children";
    HDKeyKeys[HDKeyKeys["parentFingerprint"] = 8] = "parentFingerprint";
    HDKeyKeys[HDKeyKeys["name"] = 9] = "name";
    HDKeyKeys[HDKeyKeys["note"] = 10] = "note";
})(HDKeyKeys || (HDKeyKeys = {}));
class CryptoHDKey extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        if (params) {
            this.isMaster = params.isMaster;
            this.isPrivateKey = params.isPrivateKey;
            this.keyData = params.keyData;
            this.chainCode = params.chainCode;
            this.useInfo = params.useInfo;
            this.origin = params.origin;
            this.children = params.children;
            this.parentFingerprint = params.parentFingerprint;
            this.name = params.name;
            this.note = params.note;
        }
    }
    isECKey() {
        return false;
    }
    getBip32Key(chain) {
        let version;
        let depth;
        let index = 0;
        let chainType = (0, chainList_1.getChainConf)(chain ?? 'btc');
        if (this.isMaster) {
            version = Buffer.from('0488ADE4', 'hex');
            depth = 0;
            index = 0;
        }
        else {
            depth = this.origin?.getComponents().length ?? this.origin?.getDepth() ?? 0;
            const paths = this.origin?.getComponents() ?? [];
            const lastPath = paths.length > 0 ? paths[paths.length - 1] : null;
            if (lastPath) {
                index = lastPath.isHardened() ? lastPath.getIndex() + 0x80000000 : lastPath.getIndex();
            }
            if (!chain && paths.length > 0) {
                chainType = (0, chainList_1.getChainConfByCoinType)(paths[1].getIndex() ?? 0) ?? chainType;
            }
            version = this.isPrivateKey ? (0, format_1.intToUint8List)(chainType.netConf.networkType.bip32.private) : (0, format_1.intToUint8List)(chainType.netConf.networkType.bip32.public);
        }
        const depthBuffer = new Buffer(1);
        depthBuffer[0] = depth;
        const indexBuffer = new Buffer(4);
        new DataView(indexBuffer.buffer).setUint32(0, index, true);
        if (!this.parentFingerprint || !this.chainCode || !this.keyData) {
            throw new Error("Lack of enough info, parentFingerprint or chainCode or keyData!");
        }
        const bip32Key = [
            ...version,
            ...depthBuffer,
            ...this.parentFingerprint,
            ...indexBuffer,
            ...this.chainCode,
            ...this.keyData,
        ];
        return (0, format_1.listToBase58)(bip32Key);
    }
    getRegistryType() {
        return RegistryType_1.RegistryTypes.CRYPTO_HDKEY;
    }
    getOutputDescriptorContent() {
        let result = '';
        if (this.origin) {
            if (this.origin.getSourceFingerprint() && this.origin.getPath()) {
                result += `${this.origin.getSourceFingerprint()}/${this.origin.getPath()}`;
            }
        }
        result += (0, format_1.fromHex)(this.getBip32Key()).toString('hex');
        if (this.children && this.children.getPath()) {
            result += `/${this.children.getPath()}`;
        }
        return result;
    }
    toDataItem() {
        const map = {};
        if (this.isMaster) {
            map[HDKeyKeys.isMaster] = true;
            map[HDKeyKeys.keyData] = this.keyData;
            map[HDKeyKeys.chainCode] = this.chainCode;
        }
        else {
            if (this.isPrivateKey !== undefined) {
                map[HDKeyKeys.isPrivate] = this.isPrivateKey;
            }
            map[HDKeyKeys.keyData] = this.keyData;
            if (this.chainCode) {
                map[HDKeyKeys.chainCode] = this.chainCode;
            }
            if (this.useInfo) {
                const useInfoDataItem = this.useInfo.toDataItem();
                useInfoDataItem.setTag(this.useInfo.getRegistryType().getTag());
                map[HDKeyKeys.useInfo] = useInfoDataItem;
            }
            if (this.origin) {
                const originDataItem = this.origin.toDataItem();
                originDataItem.setTag(this.origin.getRegistryType().getTag());
                map[HDKeyKeys.origin] = originDataItem;
            }
            if (this.children) {
                const childrenDataItem = this.children.toDataItem();
                childrenDataItem.setTag(this.children.getRegistryType().getTag());
                map[HDKeyKeys.children] = childrenDataItem;
            }
            if (this.parentFingerprint) {
                map[HDKeyKeys.parentFingerprint] = new DataView(this.parentFingerprint.buffer).getUint32(0, true);
            }
            if (this.name) {
                map[HDKeyKeys.name] = this.name;
            }
            if (this.note) {
                map[HDKeyKeys.note] = this.note;
            }
        }
        return new index_1.DataItem(map);
    }
    static fromDataItem(jsonData) {
        const map = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
        if (!map) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const isMaster = map[HDKeyKeys.isMaster.toString()] ?? false;
        const isPrivateKey = map[HDKeyKeys.isPrivate.toString()];
        const keyData = map[HDKeyKeys.keyData.toString()];
        const chainCode = map[HDKeyKeys.chainCode.toString()];
        const useInfo = map[HDKeyKeys.useInfo.toString()] ? CryptoCoinInfo_1.CryptoCoinInfo.fromDataItem(map[HDKeyKeys.useInfo.toString()]) : undefined;
        const origin = map[HDKeyKeys.origin.toString()] ? CryptoKeyPath_1.CryptoKeypath.fromDataItem(map[HDKeyKeys.origin.toString()]) : undefined;
        const children = map[HDKeyKeys.children.toString()] ? CryptoKeyPath_1.CryptoKeypath.fromDataItem(map[HDKeyKeys.children.toString()]) : undefined;
        const parentFingerprintData = map[HDKeyKeys.parentFingerprint.toString()];
        let parentFingerprint;
        if (parentFingerprintData !== undefined) {
            parentFingerprint = new Buffer(4);
            new DataView(parentFingerprint.buffer).setUint32(0, parentFingerprintData, true);
        }
        const name = map[HDKeyKeys.name.toString()];
        const note = map[HDKeyKeys.note.toString()];
        return new CryptoDeriveHDKey({
            keyData: keyData ? (0, format_1.fromHex)(keyData) : Buffer.alloc(0),
            chainCode: chainCode ? (0, format_1.fromHex)(chainCode) : undefined,
            useInfo,
            origin,
            children,
            parentFingerprint,
            name,
            note,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.CryptoHDKey = CryptoHDKey;
class CryptoMasterHDKey extends CryptoHDKey {
    constructor(params) {
        super({
            isMaster: true,
            keyData: params.keyData,
            chainCode: params.chainCode,
            name: params.name,
            note: params.note,
        });
    }
}
exports.CryptoMasterHDKey = CryptoMasterHDKey;
class CryptoDeriveHDKey extends CryptoHDKey {
    constructor(params) {
        super({
            isMaster: false,
            isPrivateKey: false,
            keyData: params.keyData,
            chainCode: params.chainCode,
            useInfo: params.useInfo,
            origin: params.origin,
            children: params.children,
            parentFingerprint: params.parentFingerprint,
            name: params.name,
            note: params.note,
        });
    }
}
exports.CryptoDeriveHDKey = CryptoDeriveHDKey;
//# sourceMappingURL=CryptoHdKey.js.map