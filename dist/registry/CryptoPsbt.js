"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPsbt = void 0;
const index_1 = require("../cbor/index");
const RegistryItem_1 = require("./RegistryItem");
const RegistryType_1 = require("./RegistryType");
class CryptoPsbt extends RegistryItem_1.RegistryItem {
    constructor(data) {
        super();
        this.data = data;
    }
    getRegistryType() {
        return RegistryType_1.RegistryTypes.CRYPTO_PSBT;
    }
    toDataItem() {
        return new index_1.DataItem(this.data, RegistryType_1.RegistryTypes.CRYPTO_PSBT.getTag());
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.CryptoPsbt = CryptoPsbt;
CryptoPsbt.fromDataItem = (dataItem) => {
    const psbt = dataItem.getData();
    if (!psbt) {
        throw new Error(`#[ur-registry][CryptoPSBT][fn.fromDataItem]: decoded [dataItem][#data] is undefined: ${dataItem}`);
    }
    return new CryptoPsbt(psbt);
};
//# sourceMappingURL=CryptoPsbt.js.map