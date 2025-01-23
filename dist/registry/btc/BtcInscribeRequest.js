"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtcInscribeRequest = void 0;
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const format_1 = require("../../utils/format");
const uuid_1 = require("../../utils/uuid");
const cbor_1 = require("../../cbor");
var BtcInscribeRequestKeys;
(function (BtcInscribeRequestKeys) {
    BtcInscribeRequestKeys[BtcInscribeRequestKeys["uuid"] = 1] = "uuid";
    BtcInscribeRequestKeys[BtcInscribeRequestKeys["commitData"] = 2] = "commitData";
    BtcInscribeRequestKeys[BtcInscribeRequestKeys["revealData"] = 3] = "revealData";
    BtcInscribeRequestKeys[BtcInscribeRequestKeys["origin"] = 4] = "origin";
})(BtcInscribeRequestKeys || (BtcInscribeRequestKeys = {}));
class BtcInscribeRequest extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.uuid = params.uuid;
        this.commitData = params.commitData;
        this.revealData = params.revealData;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.BTC_INSCRIBE_REQUEST;
    }
    getRequestId() {
        if (!this.uuid) {
            this.uuid = (0, uuid_1.generateUuid)();
        }
        return this.uuid;
    }
    getCommitData() {
        return this.commitData;
    }
    getRevealData() {
        return this.revealData;
    }
    getOrigin() {
        return this.origin;
    }
    toDataItem() {
        const map = {};
        map[BtcInscribeRequestKeys.uuid] = new cbor_1.DataItem(this.getRequestId(), RegistryType_1.RegistryTypes.UUID.getTag());
        map[BtcInscribeRequestKeys.commitData] = new cbor_1.DataItem(this.commitData, RegistryType_1.RegistryTypes.CRYPTO_PSBT.getTag());
        map[BtcInscribeRequestKeys.revealData] = new cbor_1.DataItem(this.revealData, RegistryType_1.RegistryTypes.CRYPTO_PSBT.getTag());
        if (this.origin) {
            map[BtcInscribeRequestKeys.origin] = this.origin;
        }
        return new cbor_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const commitData = (0, format_1.fromHex)(map[BtcInscribeRequestKeys.commitData.toString()]);
        const revealData = (0, format_1.fromHex)(map[BtcInscribeRequestKeys.revealData.toString()]);
        const uuid = map[BtcInscribeRequestKeys.uuid.toString()] ? (0, format_1.fromHex)(map[BtcInscribeRequestKeys.uuid.toString()]) : undefined;
        const origin = map[BtcInscribeRequestKeys.origin.toString()];
        return new BtcInscribeRequest({
            uuid: uuid,
            commitData: commitData,
            revealData: revealData,
            origin: origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, cbor_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.BtcInscribeRequest = BtcInscribeRequest;
//# sourceMappingURL=BtcInscribeRequest.js.map