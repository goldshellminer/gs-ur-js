"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtcInscribeSignature = void 0;
const index_1 = require("../../cbor/index");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const format_1 = require("../../utils/format");
const uuid_1 = require("../../utils/uuid");
var BtcInscribeSignatureKeys;
(function (BtcInscribeSignatureKeys) {
    BtcInscribeSignatureKeys[BtcInscribeSignatureKeys["uuid"] = 1] = "uuid";
    BtcInscribeSignatureKeys[BtcInscribeSignatureKeys["commitSignature"] = 2] = "commitSignature";
    BtcInscribeSignatureKeys[BtcInscribeSignatureKeys["revealSignature"] = 3] = "revealSignature";
    BtcInscribeSignatureKeys[BtcInscribeSignatureKeys["origin"] = 4] = "origin";
})(BtcInscribeSignatureKeys || (BtcInscribeSignatureKeys = {}));
class BtcInscribeSignature extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.commitSignature = params.commitSignature;
        this.revealSignature = params.revealSignature;
        this.uuid = params.uuid;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.BTC_INSCRIBE_SIGNATURE;
    }
    getRequestId() {
        return this.uuid ?? (0, uuid_1.generateUuid)();
    }
    getCommitSignature() {
        return this.commitSignature;
    }
    getRevealSignature() {
        return this.revealSignature;
    }
    getOrigin() {
        return this.origin;
    }
    toDataItem() {
        const map = {};
        if (this.uuid) {
            map[BtcInscribeSignatureKeys.uuid] = new index_1.DataItem(this.uuid, RegistryType_1.RegistryTypes.UUID.getTag());
        }
        if (this.origin) {
            map[BtcInscribeSignatureKeys.origin] = this.origin;
        }
        map[BtcInscribeSignatureKeys.commitSignature] = new index_1.DataItem(this.commitSignature, RegistryType_1.RegistryTypes.CRYPTO_PSBT.getTag());
        map[BtcInscribeSignatureKeys.revealSignature] = new index_1.DataItem(this.revealSignature, RegistryType_1.RegistryTypes.CRYPTO_PSBT.getTag());
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (!map) {
            throw new Error("Param for fromDataItem is neither String nor object, please check it!");
        }
        const commitSignature = (0, format_1.fromHex)(map[BtcInscribeSignatureKeys.commitSignature.toString()]);
        const revealSignature = (0, format_1.fromHex)(map[BtcInscribeSignatureKeys.revealSignature.toString()]);
        const uuid = map[BtcInscribeSignatureKeys.uuid.toString()] ? (0, format_1.fromHex)(map[BtcInscribeSignatureKeys.uuid.toString()]) : undefined;
        const origin = map[BtcInscribeSignatureKeys.origin.toString()];
        return new BtcInscribeSignature({
            commitSignature: commitSignature,
            revealSignature: revealSignature,
            uuid: uuid,
            origin: origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.BtcInscribeSignature = BtcInscribeSignature;
//# sourceMappingURL=BtcInscribeSignature.js.map