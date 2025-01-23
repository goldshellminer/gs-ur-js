"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronSignature = void 0;
const index_1 = require("../../cbor/index");
const format_1 = require("../../utils/format");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
var TronSignatureKeys;
(function (TronSignatureKeys) {
    TronSignatureKeys[TronSignatureKeys["uuid"] = 1] = "uuid";
    TronSignatureKeys[TronSignatureKeys["signature"] = 2] = "signature";
    TronSignatureKeys[TronSignatureKeys["origin"] = 3] = "origin";
})(TronSignatureKeys || (TronSignatureKeys = {}));
class TronSignature extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.signature = params.signature;
        this.uuid = params.uuid;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.TRON_SIGNATURE;
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
        map[TronSignatureKeys.uuid] = new index_1.DataItem(this.uuid, RegistryType_1.RegistryTypes.UUID.getTag());
        if (this.origin) {
            map[TronSignatureKeys.origin] = this.origin;
        }
        map[TronSignatureKeys.signature] = this.signature;
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const signature = map[TronSignatureKeys.signature.toString()];
        const uuid = map[TronSignatureKeys.uuid.toString()];
        const origin = map[TronSignatureKeys.origin.toString()];
        return new TronSignature({
            signature: (0, format_1.fromHex)(signature),
            uuid: (0, format_1.fromHex)(uuid),
            origin: origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.TronSignature = TronSignature;
//# sourceMappingURL=TronSignature.js.map