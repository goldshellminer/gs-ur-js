"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolSignRequest = exports.SignType = void 0;
const index_1 = require("../../cbor/index");
const CryptoKeyPath_1 = require("../CryptoKeyPath");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const format_1 = require("../../utils/format");
const uuid_1 = require("../../utils/uuid");
var SolSignRequestKeys;
(function (SolSignRequestKeys) {
    SolSignRequestKeys[SolSignRequestKeys["uuid"] = 1] = "uuid";
    SolSignRequestKeys[SolSignRequestKeys["signData"] = 2] = "signData";
    SolSignRequestKeys[SolSignRequestKeys["derivationPath"] = 3] = "derivationPath";
    SolSignRequestKeys[SolSignRequestKeys["outputAddress"] = 4] = "outputAddress";
    SolSignRequestKeys[SolSignRequestKeys["origin"] = 5] = "origin";
    SolSignRequestKeys[SolSignRequestKeys["signType"] = 6] = "signType";
    SolSignRequestKeys[SolSignRequestKeys["contractAddress"] = 7] = "contractAddress";
    SolSignRequestKeys[SolSignRequestKeys["fee"] = 8] = "fee";
})(SolSignRequestKeys || (SolSignRequestKeys = {}));
var SignType;
(function (SignType) {
    SignType[SignType["transaction"] = 1] = "transaction";
    SignType[SignType["message"] = 2] = "message";
})(SignType || (exports.SignType = SignType = {}));
class SolSignRequest extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.uuid = params.uuid;
        this.signData = params.signData;
        this.signType = params.signType;
        this.derivationPath = params.derivationPath;
        this.outputAddress = params.outputAddress;
        this.contractAddress = params.contractAddress;
        this.origin = params.origin;
        this.fee = params.fee;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.SOL_SIGN_REQUEST;
    }
    getRequestId() {
        if (this.uuid === undefined) {
            this.uuid = (0, uuid_1.generateUuid)();
        }
        return this.uuid;
    }
    getSignData() {
        return this.signData;
    }
    getSignType() {
        return this.signType;
    }
    getDerivationPath() {
        return this.derivationPath.getPath();
    }
    getSourceFingerprint() {
        return this.derivationPath.getSourceFingerprint();
    }
    getOutputAddress() {
        return this.outputAddress;
    }
    getContractAddress() {
        return this.contractAddress;
    }
    getOrigin() {
        return this.origin;
    }
    getFee() {
        return this.fee;
    }
    toDataItem() {
        const map = {};
        map[SolSignRequestKeys.uuid] = new index_1.DataItem(this.getRequestId(), RegistryType_1.RegistryTypes.UUID.getTag());
        map[SolSignRequestKeys.signData] = this.signData;
        const keyPath = this.derivationPath.toDataItem();
        keyPath.setTag(this.derivationPath.getRegistryType().getTag());
        map[SolSignRequestKeys.derivationPath] = keyPath;
        if (this.outputAddress) {
            map[SolSignRequestKeys.outputAddress] = this.outputAddress;
        }
        if (this.origin) {
            map[SolSignRequestKeys.origin] = this.origin;
        }
        map[SolSignRequestKeys.signType] = this.signType;
        if (this.contractAddress) {
            map[SolSignRequestKeys.contractAddress] = this.contractAddress;
        }
        if (this.fee) {
            map[SolSignRequestKeys.fee] = this.fee;
        }
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const signData = (0, format_1.fromHex)(map[SolSignRequestKeys.signData.toString()]);
        const signType = SignType[map[SolSignRequestKeys.signType.toString()]]; // Type-safe enum access
        const derivationPath = CryptoKeyPath_1.CryptoKeypath.fromDataItem(map[SolSignRequestKeys.derivationPath.toString()]);
        const outputAddress = map[SolSignRequestKeys.outputAddress.toString()];
        const contractAddress = map[SolSignRequestKeys.contractAddress.toString()];
        const uuid = map[SolSignRequestKeys.uuid.toString()]; // No need for .bytes, fromHex handles it
        const origin = map[SolSignRequestKeys.origin.toString()];
        const fee = map[SolSignRequestKeys.fee.toString()];
        return new SolSignRequest({
            uuid: (0, format_1.fromHex)(uuid),
            signData: signData,
            signType: signType,
            derivationPath: derivationPath,
            outputAddress: outputAddress,
            contractAddress: contractAddress,
            origin: origin,
            fee: fee,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.SolSignRequest = SolSignRequest;
//# sourceMappingURL=SolSignRequest.js.map