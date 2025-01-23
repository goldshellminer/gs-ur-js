"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosSignRequest = void 0;
const index_1 = require("../../cbor/index");
const CryptoKeyPath_1 = require("../CryptoKeyPath");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const format_1 = require("../../utils/format");
const uuid_1 = require("../../utils/uuid");
var CosmosSignRequestKeys;
(function (CosmosSignRequestKeys) {
    CosmosSignRequestKeys[CosmosSignRequestKeys["uuid"] = 1] = "uuid";
    CosmosSignRequestKeys[CosmosSignRequestKeys["signData"] = 2] = "signData";
    CosmosSignRequestKeys[CosmosSignRequestKeys["derivationPath"] = 3] = "derivationPath";
    CosmosSignRequestKeys[CosmosSignRequestKeys["chain"] = 4] = "chain";
    CosmosSignRequestKeys[CosmosSignRequestKeys["origin"] = 5] = "origin";
    CosmosSignRequestKeys[CosmosSignRequestKeys["fee"] = 6] = "fee";
})(CosmosSignRequestKeys || (CosmosSignRequestKeys = {}));
class CosmosSignRequest extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.uuid = params.uuid;
        this.signData = params.signData;
        this.origin = params.origin;
        this.chain = params.chain;
        this.derivationPath = params.derivationPath;
        this.fee = params.fee;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.COSMOS_SIGN_REQUEST;
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
        return this.derivationPath.getPath();
    }
    getSourceFingerprint() {
        return this.derivationPath.getSourceFingerprint();
    }
    getFee() {
        return this.fee;
    }
    toDataItem() {
        const map = {};
        map[CosmosSignRequestKeys.uuid] = new index_1.DataItem(this.getRequestId(), RegistryType_1.RegistryTypes.UUID.getTag());
        map[CosmosSignRequestKeys.signData] = this.signData;
        const keyPath = this.derivationPath.toDataItem();
        keyPath.setTag(this.derivationPath.getRegistryType().getTag());
        map[CosmosSignRequestKeys.derivationPath] = keyPath;
        map[CosmosSignRequestKeys.chain] = this.chain;
        if (this.origin) {
            map[CosmosSignRequestKeys.origin] = this.origin;
        }
        if (this.fee) {
            map[CosmosSignRequestKeys.fee] = this.fee;
        }
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const signData = (0, format_1.fromHex)(map[CosmosSignRequestKeys.signData.toString()]);
        const uuid = map[CosmosSignRequestKeys.uuid.toString()] ? (0, format_1.fromHex)(map[CosmosSignRequestKeys.uuid.toString()]) : undefined;
        const chain = map[CosmosSignRequestKeys.chain.toString()];
        const origin = map[CosmosSignRequestKeys.origin.toString()];
        const derivationPath = CryptoKeyPath_1.CryptoKeypath.fromDataItem(map[CosmosSignRequestKeys.derivationPath.toString()]);
        const fee = map[CosmosSignRequestKeys.fee.toString()];
        return new CosmosSignRequest({
            uuid,
            signData,
            chain,
            origin,
            derivationPath,
            fee,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.CosmosSignRequest = CosmosSignRequest;
//# sourceMappingURL=CosmosSignRequest.js.map