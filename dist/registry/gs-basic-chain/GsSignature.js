"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsSignature = exports.GsSignatureKeys = void 0;
const index_1 = require("../../cbor/index");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const uuid_1 = require("../../utils/uuid");
const format_1 = require("../../utils/format");
var GsSignatureKeys;
(function (GsSignatureKeys) {
    GsSignatureKeys[GsSignatureKeys["uuid"] = 1] = "uuid";
    GsSignatureKeys[GsSignatureKeys["signature"] = 2] = "signature";
    GsSignatureKeys[GsSignatureKeys["origin"] = 3] = "origin";
})(GsSignatureKeys || (exports.GsSignatureKeys = GsSignatureKeys = {}));
class GsSignature extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.signature = params.signature;
        this.uuid = params.uuid;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.GS_SIGNATURE;
    }
    getRequestId() {
        return this.uuid ?? (0, uuid_1.generateUuid)();
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
            map[GsSignatureKeys.uuid] = new index_1.DataItem(this.uuid, RegistryType_1.RegistryTypes.UUID.getTag());
        }
        if (this.origin) {
            map[GsSignatureKeys.origin] = this.origin;
        }
        map[GsSignatureKeys.signature] = this.signature;
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (!map) {
            throw new Error("Param for fromDataItem is neither String nor object, please check it!");
        }
        const signature = (0, format_1.fromHex)(map[GsSignatureKeys.signature.toString()]);
        const uuid = map[GsSignatureKeys.uuid.toString()] ? (0, format_1.fromHex)(map[GsSignatureKeys.uuid.toString()]) : undefined;
        const origin = map[GsSignatureKeys.origin.toString()];
        return new GsSignature({
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
exports.GsSignature = GsSignature;
//# sourceMappingURL=GsSignature.js.map