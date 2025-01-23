"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsWalletSolSDK = void 0;
const RegistryType_1 = require("../../registry/RegistryType");
const uuid_1 = require("../../utils/uuid");
const format_1 = require("../../utils/format");
const CryptoKeyPath_1 = require("../../registry/CryptoKeyPath");
const SolSignRequest_1 = require("../../registry/sol/SolSignRequest");
const SolSignature_1 = require("../../registry/sol/SolSignature");
class GsWalletSolSDK {
    static parseSignature(ur) {
        if (ur.type !== RegistryType_1.ExtendedRegistryTypes.SOL_SIGNATURE.getType()) {
            throw new Error('type not match');
        }
        const sig = SolSignature_1.SolSignature.fromCBOR(ur.cbor);
        const uuid = sig.getRequestId();
        return {
            'uuid': uuid, // == null ? null : uuidStringify(uuid),
            'signature': (0, format_1.toHex)(sig.getSignature()),
            'origin': sig.getOrigin(),
        };
    }
    static generateSignRequest({ uuid, signData, signType, path, xfp, outputAddress, contractAddress, origin, fee, }) {
        console.log(signData);
        return new SolSignRequest_1.SolSignRequest({
            uuid: Buffer.from((0, uuid_1.uuidParse)(uuid)),
            signData: (0, format_1.fromHex)(signData),
            signType: signType,
            derivationPath: new CryptoKeyPath_1.CryptoKeypath((0, format_1.parsePath)(path).map((e) => new CryptoKeyPath_1.PathComponent(e.index, e.hardened)), (0, format_1.fromHex)(xfp)),
            outputAddress: outputAddress,
            contractAddress: contractAddress,
            origin: origin,
            fee: fee,
        }).toUR();
    }
}
exports.GsWalletSolSDK = GsWalletSolSDK;
//# sourceMappingURL=sol.js.map