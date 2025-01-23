"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolSignature = void 0;
const index_1 = require("../../cbor/index");
const RegistryType_1 = require("../RegistryType");
const GsSignature_1 = require("../gs-basic-chain/GsSignature");
const format_1 = require("../../utils/format");
class SolSignature extends GsSignature_1.GsSignature {
    constructor(params) {
        super(params);
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.SOL_SIGNATURE;
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const signature = map[GsSignature_1.GsSignatureKeys.signature.toString()];
        const uuid = map[GsSignature_1.GsSignatureKeys.uuid.toString()];
        const origin = map[GsSignature_1.GsSignatureKeys.origin.toString()];
        return new GsSignature_1.GsSignature({ signature: (0, format_1.fromHex)(signature), uuid: (0, format_1.fromHex)(uuid), origin });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.SolSignature = SolSignature;
//# sourceMappingURL=SolSignature.js.map