"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsWalletChainSDK = void 0;
const RegistryType_1 = require("../../registry/RegistryType");
const uuid_1 = require("../../utils/uuid");
const format_1 = require("../../utils/format");
const CryptoKeyPath_1 = require("../../registry/CryptoKeyPath");
const GsSignRequest_1 = require("../../registry/gs-basic-chain/GsSignRequest");
const GsSignature_1 = require("../../registry/gs-basic-chain/GsSignature");
class GsWalletChainSDK {
    static parseSignature(ur) {
        if (ur.type !== RegistryType_1.ExtendedRegistryTypes.GS_SIGNATURE.getType()) {
            throw new Error('type not match');
        }
        const sig = GsSignature_1.GsSignature.fromCBOR(ur.cbor);
        const uuid = sig.getRequestId();
        return {
            'uuid': uuid, // == null ? null : uuidStringify(uuid),
            'signature': (0, format_1.toHex)(sig.getSignature()),
            'origin': sig.getOrigin(),
        };
    }
    static generateSignRequest({ uuid, signData, path, chain, xfp, origin, }) {
        return new GsSignRequest_1.GsSignRequest({
            uuid: uuid ? Buffer.from((0, uuid_1.uuidParse)(uuid)) : undefined,
            signData: (0, format_1.fromHex)(signData),
            derivationPath: new CryptoKeyPath_1.CryptoKeypath((0, format_1.parsePath)(path).map((e) => new CryptoKeyPath_1.PathComponent(e.index, e.hardened)), (0, format_1.fromHex)(xfp)),
            chain: chain,
            origin: origin,
        }).toUR();
    }
}
exports.GsWalletChainSDK = GsWalletChainSDK;
//# sourceMappingURL=gs.js.map