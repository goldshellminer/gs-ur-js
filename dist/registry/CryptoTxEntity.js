"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoTxEntity = void 0;
exports.parseTxEntity = parseTxEntity;
const index_1 = require("../cbor/index");
const RegistryItem_1 = require("./RegistryItem");
const RegistryType_1 = require("./RegistryType");
const format_1 = require("../utils/format");
var TxEntityKeys;
(function (TxEntityKeys) {
    TxEntityKeys[TxEntityKeys["address"] = 1] = "address";
    TxEntityKeys[TxEntityKeys["amount"] = 2] = "amount";
})(TxEntityKeys || (TxEntityKeys = {}));
class CryptoTxEntity extends RegistryItem_1.RegistryItem {
    constructor(options) {
        super();
        this.address = options.address;
        this.amount = options.amount;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.CRYPTO_TXENTITY;
    }
    getAmount() {
        return this.amount;
    }
    getAddress() {
        return this.address;
    }
    toDataItem() {
        const map = {};
        if (this.amount !== undefined) {
            map[TxEntityKeys.amount] = this.amount;
        }
        if (this.address !== undefined) {
            map[TxEntityKeys.address] = this.address;
        }
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const address = map[TxEntityKeys.address.toString()];
        const amountData = map[TxEntityKeys.amount.toString()];
        const amount = typeof amountData === 'string' ? (0, format_1.bigIntToBytes)(amountData) : undefined;
        return new CryptoTxEntity({
            address: address,
            amount: amount,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.CryptoTxEntity = CryptoTxEntity;
function parseTxEntity(txEntityMap) {
    const address = txEntityMap["address"];
    const amount = txEntityMap["amount"] ? (0, format_1.bigIntToBytes)(txEntityMap["amount"]) : undefined;
    return new CryptoTxEntity({
        address: address,
        amount: amount,
    });
}
//# sourceMappingURL=CryptoTxEntity.js.map