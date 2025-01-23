"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphSignRequest = void 0;
const cbor_1 = require("../../cbor");
const CryptoKeyPath_1 = require("../CryptoKeyPath");
const CryptoTxEntity_1 = require("../CryptoTxEntity");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
var AlphSignRequestKeys;
(function (AlphSignRequestKeys) {
    AlphSignRequestKeys[AlphSignRequestKeys["uuid"] = 1] = "uuid";
    AlphSignRequestKeys[AlphSignRequestKeys["data"] = 2] = "data";
    AlphSignRequestKeys[AlphSignRequestKeys["derivationPath"] = 3] = "derivationPath";
    AlphSignRequestKeys[AlphSignRequestKeys["outputs"] = 4] = "outputs";
    AlphSignRequestKeys[AlphSignRequestKeys["origin"] = 5] = "origin";
})(AlphSignRequestKeys || (AlphSignRequestKeys = {}));
class AlphSignRequest extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.uuid = params.uuid;
        this.data = params.data;
        this.derivationPath = params.derivationPath;
        this.outputs = params.outputs;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.ALPH_SIGN_REQUEST;
    }
    getRequestId() {
        return this.uuid;
    }
    getData() {
        return this.data;
    }
    getPath() {
        return this.derivationPath;
    }
    getOutputs() {
        return this.outputs;
    }
    getOrigin() {
        return this.origin;
    }
    toDataItem() {
        const map = {};
        map[AlphSignRequestKeys.uuid] = new cbor_1.DataItem(this.getRequestId(), RegistryType_1.RegistryTypes.UUID.getTag());
        map[AlphSignRequestKeys.data] = this.getData();
        if (this.derivationPath) {
            let derivationPathDataItem = this.derivationPath.toDataItem();
            derivationPathDataItem.setTag(this.derivationPath.getRegistryType().getTag());
            map[AlphSignRequestKeys.derivationPath] = derivationPathDataItem;
        }
        if (this.outputs && this.outputs.length > 0) {
            const outputsData = this.outputs.map((output) => {
                let outputDataItem = output.toDataItem();
                outputDataItem.setTag(output.getRegistryType().getTag());
                return outputDataItem;
            });
            map[AlphSignRequestKeys.outputs] = outputsData;
        }
        if (this.origin) {
            map[AlphSignRequestKeys.origin] = this.origin;
        }
        return new cbor_1.DataItem(map);
    }
    static fromDataItem(jsonData) {
        let map;
        if (typeof jsonData === 'string') {
            try {
                map = JSON.parse(jsonData);
            }
            catch (e) {
                throw new Error('Invalid JSON string provided to fromDataItem');
            }
        }
        else if (typeof jsonData === 'object' && jsonData !== null) {
            map = jsonData;
        }
        else {
            throw new Error('Param for fromDataItem is neither String nor Map, please check it!');
        }
        const data = map[AlphSignRequestKeys.data];
        const uuid = map[AlphSignRequestKeys.uuid]?.bytes;
        const derivationPath = map[AlphSignRequestKeys.derivationPath]
            ? CryptoKeyPath_1.CryptoKeypath.fromDataItem(map[AlphSignRequestKeys.derivationPath])
            : undefined;
        const outputs = map[AlphSignRequestKeys.outputs]
            ? map[AlphSignRequestKeys.outputs].map((e) => CryptoTxEntity_1.CryptoTxEntity.fromDataItem(e))
            : undefined;
        const origin = map[AlphSignRequestKeys.origin];
        if (!uuid || !data) {
            throw new Error('UUID and Data are required fields for AlphSignRequest');
        }
        return new AlphSignRequest({
            uuid: Buffer.from(uuid),
            data: Buffer.from(data),
            derivationPath,
            outputs,
            origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, cbor_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.AlphSignRequest = AlphSignRequest;
//# sourceMappingURL=AlphSignRequest.js.map