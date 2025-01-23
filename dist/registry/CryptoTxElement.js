"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoTxElement = void 0;
exports.parseTxElement = parseTxElement;
const index_1 = require("../cbor/index");
const CryptoKeyPath_1 = require("./CryptoKeyPath");
const RegistryItem_1 = require("./RegistryItem");
const RegistryType_1 = require("./RegistryType");
const format_1 = require("../utils/format");
var TxElementKeys;
(function (TxElementKeys) {
    TxElementKeys[TxElementKeys["path"] = 1] = "path";
    TxElementKeys[TxElementKeys["amount"] = 2] = "amount";
    TxElementKeys[TxElementKeys["signature"] = 3] = "signature";
    TxElementKeys[TxElementKeys["signhashType"] = 4] = "signhashType";
    TxElementKeys[TxElementKeys["address"] = 5] = "address";
})(TxElementKeys || (TxElementKeys = {}));
class CryptoTxElement extends RegistryItem_1.RegistryItem {
    constructor(options) {
        super();
        this.path = options.path;
        this.address = options.address;
        this.amount = options.amount;
        this.signature = options.signature;
        this.signhashType = options.signhashType;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.CRYPTO_TXELEMENT;
    }
    getPath() {
        if (!this.path)
            return null;
        const pathComponents = this.path.map(component => {
            const indexPart = component.isWildcard() ? '*' : (component.getIndex()?.toString() ?? '');
            const hardenedPart = component.isHardened() ? "'" : '';
            return `${indexPart}${hardenedPart}`;
        }).join('/');
        return pathComponents;
    }
    getComponents() {
        return this.path ? this.path : null;
    }
    getAmount() {
        return this.amount ?? null;
    }
    getAddress() {
        return this.address ?? null;
    }
    getSignature() {
        return this.signature ?? null;
    }
    getSignhashType() {
        return this.signhashType ?? null;
    }
    toDataItem() {
        const map = {};
        const componentsData = [];
        if (this.path) {
            for (const component of this.path) {
                if (component.isWildcard()) {
                    componentsData.push([]);
                }
                else {
                    componentsData.push(component.getIndex());
                }
                componentsData.push(component.isHardened());
            }
        }
        map[TxElementKeys.path] = componentsData;
        if (this.amount !== undefined && this.amount !== null) {
            map[TxElementKeys.amount] = this.amount;
        }
        if (this.signature !== undefined && this.signature !== null) {
            map[TxElementKeys.signature] = this.signature;
        }
        if (this.signhashType !== undefined && this.signhashType !== null) {
            map[TxElementKeys.signhashType] = this.signhashType;
        }
        if (this.address !== undefined && this.address !== null) {
            map[TxElementKeys.address] = this.address;
        }
        return new index_1.DataItem(map);
    }
    /**
     * 从 JSON 数据或字符串创建 `CryptoTxElement` 实例
     * @param jsonData JSON 数据或字符串
     */
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const pathComponents = [];
        const paths = map[TxElementKeys.path.toString()] ?? [];
        for (let i = 0; i < paths.length; i += 2) {
            const path = paths[i];
            const isHardened = paths[i + 1];
            if (typeof path === 'number') {
                pathComponents.push(new CryptoKeyPath_1.PathComponent(path, isHardened));
            }
            else if (Array.isArray(path)) { // 处理通配符，如 Dart 中的空列表
                pathComponents.push(new CryptoKeyPath_1.PathComponent(undefined, isHardened));
            }
            else {
                throw new Error(`Invalid path component at index ${i}`);
            }
        }
        const address = map[TxElementKeys.address.toString()];
        const amount = map[TxElementKeys.amount.toString()];
        const signatureData = map[TxElementKeys.signature.toString()];
        const signhashTypeData = map[TxElementKeys.signhashType.toString()];
        // 假设 signature 是十六进制字符串，如果不是，请根据实际情况调整
        const signatureBytes = (typeof signatureData === 'string') ? (0, format_1.fromHex)(signatureData) : undefined;
        return new CryptoTxElement({
            path: pathComponents.length > 0 ? pathComponents : undefined,
            address: address,
            amount: amount,
            signature: signatureBytes,
            signhashType: signhashTypeData
        });
    }
    /**
     * 从 CBOR 编码的 `Buffer` 创建 `CryptoTxElement` 实例
     * @param cborPayload CBOR 编码的 `Buffer`
     */
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.CryptoTxElement = CryptoTxElement;
function parseTxElement(txElementMap) {
    const address = txElementMap["address"];
    const path = txElementMap["path"];
    const amount = txElementMap["amount"];
    const signature = txElementMap["signature"];
    const signhashType = txElementMap["signhashType"];
    return new CryptoTxElement({
        path: path ? (0, format_1.parsePath)(path).map(e => new CryptoKeyPath_1.PathComponent(e.index, e.hardened)) : undefined,
        address: address,
        amount: amount,
        signature: signature,
        signhashType: signhashType,
    });
}
//# sourceMappingURL=CryptoTxElement.js.map