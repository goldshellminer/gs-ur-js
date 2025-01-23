"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsWalletPsbtSDK = void 0;
const RegistryType_1 = require("../../registry/RegistryType");
const uuid_1 = require("../../utils/uuid");
const format_1 = require("../../utils/format");
const CryptoKeyPath_1 = require("../../registry/CryptoKeyPath");
const BtcInscribeRequest_1 = require("../../registry/btc/BtcInscribeRequest");
const BtcInscribeSignature_1 = require("../../registry/btc/BtcInscribeSignature");
const PsbtSignRequest_1 = require("../../registry/btc/PsbtSignRequest");
const PsbtSignature_1 = require("../../registry/btc/PsbtSignature");
class GsWalletPsbtSDK {
    static parseSignature(ur) {
        if (ur.type !== RegistryType_1.ExtendedRegistryTypes.PSBT_SIGNATURE.getType()) {
            throw new Error('type not match');
        }
        const sig = PsbtSignature_1.PsbtSignature.fromCBOR(ur.cbor);
        const uuid = sig.getRequestId();
        return {
            'uuid': uuid, // == null ? null : uuidStringify(uuid),
            'psbt': (0, format_1.toHex)(sig.getSignature()),
            'origin': sig.getOrigin(),
        };
    }
    static generateSignRequest({ uuid, psbt, path, xfp, origin, }) {
        return new PsbtSignRequest_1.PsbtSignRequest({
            uuid: Buffer.from((0, uuid_1.uuidParse)(uuid)),
            psbt: (0, format_1.fromHex)(psbt),
            derivationPath: new CryptoKeyPath_1.CryptoKeypath((0, format_1.parsePath)(path).map((e) => new CryptoKeyPath_1.PathComponent(e.index, e.hardened)), (0, format_1.fromHex)(xfp)),
            origin: origin,
        }).toUR();
    }
    static parseInscribeSignature(ur) {
        if (ur.type !== RegistryType_1.ExtendedRegistryTypes.BTC_INSCRIBE_SIGNATURE.getType()) {
            throw new Error('type not match');
        }
        const sig = BtcInscribeSignature_1.BtcInscribeSignature.fromCBOR(ur.cbor);
        const uuid = sig.getRequestId();
        return {
            'uuid': uuid ? (0, uuid_1.uuidStringify)(uuid) : null,
            'commitSignature': (0, format_1.toHex)(sig.getCommitSignature()),
            'revealSignature': (0, format_1.toHex)(sig.getRevealSignature()),
            'origin': sig.getOrigin(),
        };
    }
    static generateInscribeRequest({ uuid, commitData, revealData, origin, }) {
        return new BtcInscribeRequest_1.BtcInscribeRequest({
            uuid: uuid ? Buffer.from((0, uuid_1.uuidParse)(uuid)) : undefined,
            commitData: (0, format_1.fromHex)(commitData),
            revealData: (0, format_1.fromHex)(revealData),
            origin: origin,
        }).toUR();
    }
}
exports.GsWalletPsbtSDK = GsWalletPsbtSDK;
//# sourceMappingURL=psbt.js.map