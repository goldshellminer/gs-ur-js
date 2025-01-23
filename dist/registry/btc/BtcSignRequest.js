"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtcSignRequest = void 0;
const CryptoKeyPath_1 = require("../CryptoKeyPath");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const CryptoGspl_1 = require("../CryptoGspl");
const format_1 = require("../../utils/format");
const uuid_1 = require("../../utils/uuid");
const cbor_1 = require("../../cbor");
var BtcSignRequestKeys;
(function (BtcSignRequestKeys) {
    BtcSignRequestKeys[BtcSignRequestKeys["uuid"] = 1] = "uuid";
    BtcSignRequestKeys[BtcSignRequestKeys["gspl"] = 2] = "gspl";
    BtcSignRequestKeys[BtcSignRequestKeys["derivationPath"] = 3] = "derivationPath";
    BtcSignRequestKeys[BtcSignRequestKeys["origin"] = 4] = "origin";
})(BtcSignRequestKeys || (BtcSignRequestKeys = {}));
class BtcSignRequest extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.uuid = params.uuid;
        this.gspl = params.gspl;
        this.derivationPath = params.derivationPath;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.BTC_SIGN_REQUEST;
    }
    getRequestId() {
        return this.uuid ?? (0, uuid_1.generateUuid)();
    }
    getSignData() {
        return this.gspl;
    }
    getPath() {
        return this.derivationPath;
    }
    getOrigin() {
        return this.origin;
    }
    toDataItem() {
        const map = {};
        const uuidData = this.getRequestId();
        map[BtcSignRequestKeys.uuid] = new cbor_1.DataItem(uuidData, RegistryType_1.RegistryTypes.UUID.getTag());
        const gsplDataItem = this.gspl.toDataItem();
        const gsplTag = this.gspl.getRegistryType().getTag();
        gsplDataItem.setTag(gsplTag);
        map[BtcSignRequestKeys.gspl] = gsplDataItem;
        if (this.derivationPath) {
            const derivationPathDataItem = this.derivationPath.toDataItem();
            const derivationPathTag = this.derivationPath.getRegistryType().getTag();
            derivationPathDataItem.setTag(derivationPathTag);
            map[BtcSignRequestKeys.derivationPath] = derivationPathDataItem;
        }
        if (this.origin) {
            map[BtcSignRequestKeys.origin] = this.origin;
        }
        return new cbor_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const gspl = CryptoGspl_1.CryptoGspl.fromCBOR(map[BtcSignRequestKeys.gspl.toString()]); // Assuming CryptoGspl has a fromCBOR method
        const uuid = (0, format_1.fromHex)(map[BtcSignRequestKeys.uuid.toString()]);
        const derivationPath = map[BtcSignRequestKeys.derivationPath.toString()] ? CryptoKeyPath_1.CryptoKeypath.fromDataItem(map[BtcSignRequestKeys.derivationPath.toString()]) : undefined;
        const origin = map[BtcSignRequestKeys.origin.toString()];
        return new BtcSignRequest({
            uuid: uuid,
            gspl: gspl,
            derivationPath: derivationPath,
            origin: origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, cbor_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.BtcSignRequest = BtcSignRequest;
//# sourceMappingURL=BtcSignRequest.js.map