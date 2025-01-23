"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsWalletTronSDK = void 0;
const RegistryType_1 = require("../../registry/RegistryType");
const uuid_1 = require("../../utils/uuid");
const format_1 = require("../../utils/format");
const CryptoKeyPath_1 = require("../../registry/CryptoKeyPath");
const TronSignRequest_1 = require("../../registry/tron/TronSignRequest");
const TronSignature_1 = require("../../registry/tron/TronSignature");
class GsWalletTronSDK {
    static parseSignature(ur) {
        if (ur.type !== RegistryType_1.ExtendedRegistryTypes.TRON_SIGNATURE.getType()) {
            throw new Error('type not match');
        }
        const sig = TronSignature_1.TronSignature.fromCBOR(ur.cbor);
        const uuid = sig.getRequestId();
        return {
            'uuid': uuid, // == null ? null : uuidStringify(uuid),
            'signature': (0, format_1.toHex)(sig.getSignature()),
            'origin': sig.getOrigin(),
        };
    }
    static generateSignRequest({ uuid, signData, path, fee, xfp, origin, }) {
        return new TronSignRequest_1.TronSignRequest({
            uuid: Buffer.from((0, uuid_1.uuidParse)(uuid)),
            signData: (0, format_1.fromHex)(signData),
            derivationPath: new CryptoKeyPath_1.CryptoKeypath((0, format_1.parsePath)(path).map((e) => new CryptoKeyPath_1.PathComponent(e.index, e.hardened)), (0, format_1.fromHex)(xfp)),
            fee: fee,
            origin: origin,
        }).toUR();
    }
}
exports.GsWalletTronSDK = GsWalletTronSDK;
//# sourceMappingURL=tron.js.map