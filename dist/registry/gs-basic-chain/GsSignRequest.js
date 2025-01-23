"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsSignRequest = void 0;
const index_1 = require("../../cbor/index");
const CryptoKeyPath_1 = require("../CryptoKeyPath");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const uuid_1 = require("../../utils/uuid");
const format_1 = require("../../utils/format");
var GsSignRequestKeys;
(function (GsSignRequestKeys) {
    GsSignRequestKeys[GsSignRequestKeys["uuid"] = 1] = "uuid";
    GsSignRequestKeys[GsSignRequestKeys["signData"] = 2] = "signData";
    GsSignRequestKeys[GsSignRequestKeys["derivationPath"] = 3] = "derivationPath";
    GsSignRequestKeys[GsSignRequestKeys["chain"] = 4] = "chain";
    GsSignRequestKeys[GsSignRequestKeys["origin"] = 5] = "origin";
})(GsSignRequestKeys || (GsSignRequestKeys = {}));
class GsSignRequest extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.uuid = params.uuid;
        this.signData = params.signData;
        this.origin = params.origin;
        this.chain = params.chain;
        this.derivationPath = params.derivationPath;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.GS_SIGN_REQUEST;
    }
    getRequestId() {
        if (!this.uuid) {
            this.uuid = (0, uuid_1.generateUuid)();
        }
        return this.uuid;
    }
    getSignData() {
        return this.signData;
    }
    getOrigin() {
        return this.origin;
    }
    getChain() {
        return this.chain;
    }
    getDerivationPath() {
        return this.derivationPath.getPath(); // 假设 CryptoKeypath 有 getPath 方法
    }
    getSourceFingerprint() {
        return this.derivationPath.getSourceFingerprint();
    }
    toDataItem() {
        const map = {};
        map[GsSignRequestKeys.uuid] = new index_1.DataItem(this.getRequestId(), RegistryType_1.RegistryTypes.UUID.getTag());
        map[GsSignRequestKeys.signData] = this.getSignData();
        let keyPath = this.derivationPath.toDataItem();
        keyPath.setTag(this.derivationPath.getRegistryType().getTag());
        map[GsSignRequestKeys.derivationPath] = keyPath;
        map[GsSignRequestKeys.chain] = this.chain;
        if (this.origin) {
            map[GsSignRequestKeys.origin] = this.origin;
        }
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const signData = map[GsSignRequestKeys.signData.valueOf()];
        const uuid = map[GsSignRequestKeys.uuid.valueOf()]?.bytes;
        const chain = map[GsSignRequestKeys.chain.valueOf()];
        const origin = map[GsSignRequestKeys.origin.valueOf()];
        const derivationPath = CryptoKeyPath_1.CryptoKeypath.fromDataItem(map[GsSignRequestKeys.derivationPath.valueOf()]);
        if (!signData || !chain || !derivationPath) {
            throw new Error('signData, chain, and derivationPath are required fields for GsSignRequest');
        }
        return new GsSignRequest({
            uuid: uuid ? (0, format_1.fromHex)(uuid) : undefined,
            signData: (0, format_1.fromHex)(signData),
            chain: chain,
            origin: origin,
            derivationPath: derivationPath,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.GsSignRequest = GsSignRequest;
//# sourceMappingURL=GsSignRequest.js.map