"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsWalletAlphSDK = void 0;
const RegistryType_1 = require("../../registry/RegistryType");
const AlphSignature_1 = require("../../registry/alph/AlphSignature");
const AlphSignRequest_1 = require("../../registry/alph/AlphSignRequest");
const uuid_1 = require("../../utils/uuid");
const format_1 = require("../../utils/format");
const CryptoTxEntity_1 = require("../../registry/CryptoTxEntity");
const CryptoKeyPath_1 = require("../../registry/CryptoKeyPath");
class GsWalletAlphSDK {
    static parseSignature(ur) {
        if (ur.type !== RegistryType_1.ExtendedRegistryTypes.ALPH_SIGNATURE.getType()) {
            throw new Error('type not match');
        }
        const sig = AlphSignature_1.AlphSignature.fromCBOR(ur.cbor);
        const uuid = sig.getRequestId();
        return {
            'uuid': uuid, // == null ? null : uuidStringify(uuid),
            'signature': sig.getSignature(),
            'origin': sig.getOrigin(),
        };
    }
    static generateSignRequest({ uuid, hexData, dataType, outputs, path, xfp, origin, }) {
        return new AlphSignRequest_1.AlphSignRequest({
            uuid: Buffer.from((0, uuid_1.uuidParse)(uuid)),
            data: (0, format_1.fromHex)(hexData),
            outputs: outputs?.map((e) => (0, CryptoTxEntity_1.parseTxEntity)(e)),
            derivationPath: new CryptoKeyPath_1.CryptoKeypath((0, format_1.parsePath)(path).map((e) => new CryptoKeyPath_1.PathComponent(e.index, e.hardened)), (0, format_1.fromHex)(xfp)),
            origin: origin,
        }).toUR();
    }
}
exports.GsWalletAlphSDK = GsWalletAlphSDK;
//# sourceMappingURL=alph.js.map