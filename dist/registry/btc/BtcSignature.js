"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtcSignature = void 0;
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const CryptoGspl_1 = require("../CryptoGspl");
const uuid_1 = require("../../utils/uuid");
const format_1 = require("../../utils/format");
const cbor_1 = require("../../cbor");
var BtcSignatureKeys;
(function (BtcSignatureKeys) {
    BtcSignatureKeys[BtcSignatureKeys["uuid"] = 1] = "uuid";
    BtcSignatureKeys[BtcSignatureKeys["gspl"] = 2] = "gspl";
    BtcSignatureKeys[BtcSignatureKeys["origin"] = 3] = "origin";
})(BtcSignatureKeys || (BtcSignatureKeys = {}));
class BtcSignature extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.gspl = params.gspl;
        this.uuid = params.uuid;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.BTC_SIGNATURE;
    }
    getRequestId() {
        return this.uuid ?? (0, uuid_1.generateUuid)();
    }
    getGspl() {
        return this.gspl;
    }
    getOrigin() {
        return this.origin;
    }
    toDataItem() {
        const map = {};
        if (this.uuid) {
            const uuidData = this.uuid;
            map[BtcSignatureKeys.uuid] = new cbor_1.DataItem(uuidData, RegistryType_1.RegistryTypes.UUID.getTag());
        }
        if (this.origin) {
            map[BtcSignatureKeys.origin] = this.origin;
        }
        const gsplDataItem = this.gspl.toDataItem();
        const gsplTag = this.gspl.getRegistryType().getTag();
        map[BtcSignatureKeys.gspl] = new cbor_1.DataItem(gsplDataItem, gsplTag);
        return new cbor_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const gspl = CryptoGspl_1.CryptoGspl.fromDataItem(map[BtcSignatureKeys.gspl.toString()]);
        const uuid = map[BtcSignatureKeys.uuid.toString()] ? (0, format_1.fromHex)(map[BtcSignatureKeys.uuid.toString()]) : undefined;
        const origin = map[BtcSignatureKeys.origin.toString()];
        return new BtcSignature({
            gspl: gspl,
            uuid: uuid,
            origin: origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, cbor_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.BtcSignature = BtcSignature;
//# sourceMappingURL=BtcSignature.js.map