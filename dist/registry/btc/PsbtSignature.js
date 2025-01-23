"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PsbtSignature = void 0;
const index_1 = require("../../cbor/index");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const format_1 = require("../../utils/format");
const uuid_1 = require("../../utils/uuid");
var PsbtSignatureKeys;
(function (PsbtSignatureKeys) {
    PsbtSignatureKeys[PsbtSignatureKeys["uuid"] = 1] = "uuid";
    PsbtSignatureKeys[PsbtSignatureKeys["signature"] = 2] = "signature";
    PsbtSignatureKeys[PsbtSignatureKeys["origin"] = 3] = "origin";
})(PsbtSignatureKeys || (PsbtSignatureKeys = {}));
class PsbtSignature extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.signature = params.signature;
        this.uuid = params.uuid;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.PSBT_SIGNATURE;
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
            map[PsbtSignatureKeys.uuid] = new index_1.DataItem(this.uuid, RegistryType_1.RegistryTypes.UUID.getTag());
        }
        if (this.origin) {
            map[PsbtSignatureKeys.origin] = this.origin;
        }
        map[PsbtSignatureKeys.signature] = new index_1.DataItem(this.signature, RegistryType_1.RegistryTypes.CRYPTO_PSBT.getTag());
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const signature = (0, format_1.fromHex)(map[PsbtSignatureKeys.signature.toString()]);
        const uuid = map[PsbtSignatureKeys.uuid.toString()] ? (0, format_1.fromHex)(map[PsbtSignatureKeys.uuid.toString()]) : undefined;
        const origin = map[PsbtSignatureKeys.origin.toString()];
        return new PsbtSignature({
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
exports.PsbtSignature = PsbtSignature;
//# sourceMappingURL=PsbtSignature.js.map