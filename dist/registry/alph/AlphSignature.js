"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphSignature = void 0;
const RegistryType_1 = require("../RegistryType");
const GsSignature_1 = require("../gs-basic-chain/GsSignature");
const cbor_1 = require("../../cbor");
class AlphSignature extends GsSignature_1.GsSignature {
    constructor(params) {
        super(params);
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.ALPH_SIGNATURE;
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (!map) {
            throw new Error("Param for fromDataItem is neither String nor object, please check it!");
        }
        const signature = Buffer.from(map[GsSignature_1.GsSignatureKeys.signature.toString()], 'hex');
        const uuid = map[GsSignature_1.GsSignatureKeys.uuid.toString()] ? Buffer.from(map[GsSignature_1.GsSignatureKeys.uuid.toString()], 'hex') : undefined;
        const origin = map[GsSignature_1.GsSignatureKeys.origin.toString()];
        return new GsSignature_1.GsSignature({
            signature: signature,
            uuid: uuid,
            origin: origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, cbor_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.AlphSignature = AlphSignature;
//# sourceMappingURL=AlphSignature.js.map