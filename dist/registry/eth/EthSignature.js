"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthSignature = void 0;
const index_1 = require("../../cbor/index");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const format_1 = require("../../utils/format");
var EthSignatureKeys;
(function (EthSignatureKeys) {
    EthSignatureKeys[EthSignatureKeys["uuid"] = 1] = "uuid";
    EthSignatureKeys[EthSignatureKeys["signature"] = 2] = "signature";
    EthSignatureKeys[EthSignatureKeys["origin"] = 3] = "origin";
})(EthSignatureKeys || (EthSignatureKeys = {}));
class EthSignature extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.signature = params.signature;
        this.uuid = params.uuid;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.ETH_SIGNATURE;
    }
    getRequestId() {
        return this.uuid;
    }
    getSignature() {
        return this.signature;
    }
    getOrigin() {
        return this.origin;
    }
    toDataItem() {
        const map = {};
        if (this.uuid) {
            map[EthSignatureKeys.uuid] = new index_1.DataItem(this.uuid, RegistryType_1.RegistryTypes.UUID.getTag());
        }
        if (this.origin) {
            map[EthSignatureKeys.origin] = this.origin;
        }
        map[EthSignatureKeys.signature] = this.signature;
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const signature = (0, format_1.fromHex)(map[EthSignatureKeys.signature.toString()]);
        const uuid = map[EthSignatureKeys.uuid.toString()] ? (0, format_1.fromHex)(map[EthSignatureKeys.uuid.toString()]) : undefined;
        const origin = map[EthSignatureKeys.origin.toString()];
        return new EthSignature({
            signature: signature,
            uuid: uuid,
            origin: origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.EthSignature = EthSignature;
//# sourceMappingURL=EthSignature.js.map