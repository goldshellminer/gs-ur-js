"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthSignRequest = exports.EthDataType = void 0;
const index_1 = require("../../cbor/index");
const CryptoKeyPath_1 = require("../CryptoKeyPath");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const format_1 = require("../../utils/format");
const uuid_1 = require("../../utils/uuid");
var EthSignRequestKeys;
(function (EthSignRequestKeys) {
    EthSignRequestKeys[EthSignRequestKeys["uuid"] = 1] = "uuid";
    EthSignRequestKeys[EthSignRequestKeys["signData"] = 2] = "signData";
    EthSignRequestKeys[EthSignRequestKeys["dataType"] = 3] = "dataType";
    EthSignRequestKeys[EthSignRequestKeys["chainId"] = 4] = "chainId";
    EthSignRequestKeys[EthSignRequestKeys["derivationPath"] = 5] = "derivationPath";
    EthSignRequestKeys[EthSignRequestKeys["address"] = 6] = "address";
    EthSignRequestKeys[EthSignRequestKeys["origin"] = 7] = "origin";
})(EthSignRequestKeys || (EthSignRequestKeys = {}));
var EthDataType;
(function (EthDataType) {
    EthDataType[EthDataType["transaction"] = 1] = "transaction";
    EthDataType[EthDataType["typedData"] = 2] = "typedData";
    EthDataType[EthDataType["personalMessage"] = 3] = "personalMessage";
    EthDataType[EthDataType["typedTransaction"] = 4] = "typedTransaction";
})(EthDataType || (exports.EthDataType = EthDataType = {}));
class EthSignRequest extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.uuid = params.uuid;
        this.signData = params.signData;
        this.dataType = params.dataType;
        this.chainId = params.chainId;
        this.derivationPath = params.derivationPath;
        this.address = params.address;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.ETH_SIGN_REQUEST;
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
    getEthDataType() {
        return this.dataType;
    }
    getChainId() {
        return this.chainId;
    }
    getDerivationPath() {
        return this.derivationPath.getPath();
    }
    getSourceFingerprint() {
        return this.derivationPath.getSourceFingerprint();
    }
    getSignRequestAddress() {
        return this.address;
    }
    getOrigin() {
        return this.origin;
    }
    toDataItem() {
        const map = {};
        map[EthSignRequestKeys.uuid] = new index_1.DataItem(this.getRequestId(), RegistryType_1.RegistryTypes.UUID.getTag());
        map[EthSignRequestKeys.signData] = this.signData;
        map[EthSignRequestKeys.dataType] = this.dataType.valueOf();
        if (this.chainId !== undefined) {
            map[EthSignRequestKeys.chainId] = this.chainId;
        }
        const keyPath = this.derivationPath.toDataItem();
        keyPath.setTag(this.derivationPath.getRegistryType().getTag());
        map[EthSignRequestKeys.derivationPath] = keyPath;
        if (this.address !== undefined) {
            map[EthSignRequestKeys.address] = this.address;
        }
        if (this.origin !== undefined) {
            map[EthSignRequestKeys.origin] = this.origin;
        }
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const signData = (0, format_1.fromHex)(map[EthSignRequestKeys.signData.toString()]);
        const dataType = EthDataType[map[EthSignRequestKeys.dataType.toString()]]; // 更安全的类型转换
        const derivationPath = CryptoKeyPath_1.CryptoKeypath.fromDataItem(map[EthSignRequestKeys.derivationPath.toString()]);
        const chainId = map[EthSignRequestKeys.chainId.toString()];
        const address = map[EthSignRequestKeys.address.toString()] ? (0, format_1.fromHex)(map[EthSignRequestKeys.address.toString()]) : undefined;
        const uuid = map[EthSignRequestKeys.uuid.toString()] ? (0, format_1.fromHex)(map[EthSignRequestKeys.uuid.toString()]) : undefined;
        const origin = map[EthSignRequestKeys.origin.toString()];
        return new EthSignRequest({
            uuid,
            signData,
            dataType,
            chainId,
            derivationPath,
            address,
            origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.EthSignRequest = EthSignRequest;
//# sourceMappingURL=EthSignRequest.js.map