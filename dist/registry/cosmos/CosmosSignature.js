"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosSignature = void 0;
const index_1 = require("../../cbor/index");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const format_1 = require("../../utils/format");
var CosmosSignatureKeys;
(function (CosmosSignatureKeys) {
    CosmosSignatureKeys[CosmosSignatureKeys["uuid"] = 1] = "uuid";
    CosmosSignatureKeys[CosmosSignatureKeys["signature"] = 2] = "signature";
    CosmosSignatureKeys[CosmosSignatureKeys["origin"] = 3] = "origin";
})(CosmosSignatureKeys || (CosmosSignatureKeys = {}));
class CosmosSignature extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.signature = params.signature;
        this.uuid = params.uuid;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.COSMOS_SIGNATURE;
    }
    getRequestId() {
        return this.uuid;
    }
    getSignature() {
        return this.signature;
    }
    getOrigin() {
        return this.origin;
    }
    toDataItem() {
        const map = {};
        map[CosmosSignatureKeys.uuid] = new index_1.DataItem(this.uuid, RegistryType_1.RegistryTypes.UUID.getTag());
        if (this.origin) {
            map[CosmosSignatureKeys.origin] = this.origin;
        }
        map[CosmosSignatureKeys.signature] = this.signature; // 直接使用 signature，无需 CborBytes
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const signature = (0, format_1.fromHex)(map[CosmosSignatureKeys.signature.toString()]);
        const uuid = (0, format_1.fromHex)(map[CosmosSignatureKeys.uuid.toString()]);
        const origin = map[CosmosSignatureKeys.origin.toString()];
        return new CosmosSignature({
            signature: signature,
            uuid: uuid,
            origin: origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.CosmosSignature = CosmosSignature;
//# sourceMappingURL=CosmosSignature.js.map