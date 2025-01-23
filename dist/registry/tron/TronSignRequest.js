"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronSignRequest = void 0;
const index_1 = require("../../cbor/index");
const CryptoKeyPath_1 = require("../CryptoKeyPath");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const format_1 = require("../../utils/format");
var TronSignRequestKeys;
(function (TronSignRequestKeys) {
    TronSignRequestKeys[TronSignRequestKeys["uuid"] = 1] = "uuid";
    TronSignRequestKeys[TronSignRequestKeys["signData"] = 2] = "signData";
    TronSignRequestKeys[TronSignRequestKeys["derivationPath"] = 3] = "derivationPath";
    TronSignRequestKeys[TronSignRequestKeys["fee"] = 4] = "fee";
    TronSignRequestKeys[TronSignRequestKeys["origin"] = 5] = "origin";
})(TronSignRequestKeys || (TronSignRequestKeys = {}));
class TronSignRequest extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.uuid = params.uuid;
        this.signData = params.signData;
        this.fee = params.fee;
        this.derivationPath = params.derivationPath;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.TRON_SIGN_REQUEST;
    }
    getRequestId() {
        return this.uuid;
    }
    getSignData() {
        return this.signData;
    }
    getOrigin() {
        return this.origin;
    }
    getFee() {
        return this.fee;
    }
    getDerivationPath() {
        return this.derivationPath.getPath();
    }
    getSourceFingerprint() {
        return this.derivationPath.getSourceFingerprint();
    }
    toDataItem() {
        const map = {};
        map[TronSignRequestKeys.uuid] = new index_1.DataItem(this.getRequestId(), RegistryType_1.RegistryTypes.UUID.getTag());
        map[TronSignRequestKeys.signData] = this.getSignData();
        const keyPath = this.derivationPath.toDataItem();
        keyPath.setTag(this.derivationPath.getRegistryType().getTag());
        map[TronSignRequestKeys.derivationPath] = keyPath;
        if (this.fee !== undefined) {
            map[TronSignRequestKeys.fee] = this.fee;
        }
        if (this.origin) {
            map[TronSignRequestKeys.origin] = this.origin;
        }
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const signData = (0, format_1.fromHex)(map[TronSignRequestKeys.signData.toString()]);
        const uuid = (0, format_1.fromHex)(map[TronSignRequestKeys.uuid.toString()]);
        const fee = map[TronSignRequestKeys.fee.toString()];
        const origin = map[TronSignRequestKeys.origin.toString()];
        const derivationPath = CryptoKeyPath_1.CryptoKeypath.fromDataItem(map[TronSignRequestKeys.derivationPath.toString()]);
        return new TronSignRequest({
            uuid: uuid,
            signData: signData,
            derivationPath: derivationPath,
            fee: fee,
            origin: origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.TronSignRequest = TronSignRequest;
//# sourceMappingURL=TronSignRequest.js.map