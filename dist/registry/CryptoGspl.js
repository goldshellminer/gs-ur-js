"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoGspl = exports.GsplDataType = void 0;
const index_1 = require("../cbor/index");
const RegistryItem_1 = require("./RegistryItem");
const RegistryType_1 = require("./RegistryType");
const CryptoTxElement_1 = require("./CryptoTxElement");
var GsbtKeys;
(function (GsbtKeys) {
    GsbtKeys[GsbtKeys["data"] = 1] = "data";
    GsbtKeys[GsbtKeys["dataType"] = 2] = "dataType";
    GsbtKeys[GsbtKeys["inputs"] = 3] = "inputs";
    GsbtKeys[GsbtKeys["change"] = 4] = "change";
})(GsbtKeys || (GsbtKeys = {}));
var GsplDataType;
(function (GsplDataType) {
    GsplDataType[GsplDataType["transaction"] = 1] = "transaction";
    GsplDataType[GsplDataType["message"] = 2] = "message";
})(GsplDataType || (exports.GsplDataType = GsplDataType = {}));
class CryptoGspl extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.data = params.data;
        this.dataType = params.dataType;
        this.inputs = params.inputs;
        this.change = params.change;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.CRYPTO_GSPL;
    }
    toDataItem() {
        const map = {};
        map[GsbtKeys.data] = this.data;
        map[GsbtKeys.dataType] = this.dataType.valueOf();
        if (this.inputs) {
            map[GsbtKeys.inputs] = this.inputs.map(input => {
                const inputDataItem = input.toDataItem();
                inputDataItem.setTag(input.getRegistryType().getTag());
                return inputDataItem; // Return the underlying data
            });
        }
        if (this.change) {
            const changeDataItem = this.change.toDataItem();
            changeDataItem.setTag(this.change.getRegistryType().getTag());
            map[GsbtKeys.change] = changeDataItem; // Return the underlying data
        }
        return new index_1.DataItem(map); // 返回 cbor.Map 对象
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const data = Buffer.from(map[GsbtKeys.data.toString()], 'hex'); // 使用 Buffer.from
        const dataType = GsplDataType[map[GsbtKeys.dataType.toString()]]; // 使用 keyof 
        const inputs = map[GsbtKeys.inputs.toString()]?.map((e) => CryptoTxElement_1.CryptoTxElement.fromDataItem(e));
        const change = map[GsbtKeys.change.toString()] ? CryptoTxElement_1.CryptoTxElement.fromDataItem(map[GsbtKeys.change.toString()]) : undefined;
        return new CryptoGspl({
            data,
            dataType,
            inputs,
            change,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.CryptoGspl = CryptoGspl;
//# sourceMappingURL=CryptoGspl.js.map