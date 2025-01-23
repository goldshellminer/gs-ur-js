"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsWalletBTCSDK = void 0;
const RegistryType_1 = require("../../registry/RegistryType");
const CryptoGspl_1 = require("../../registry/CryptoGspl");
const uuid_1 = require("../../utils/uuid");
const format_1 = require("../../utils/format");
const CryptoKeyPath_1 = require("../../registry/CryptoKeyPath");
const BtcSignRequest_1 = require("../../registry/btc/BtcSignRequest");
const BtcSignature_1 = require("../../registry/btc/BtcSignature");
const CryptoTxElement_1 = require("../../registry/CryptoTxElement");
class GsWalletBTCSDK {
    static parseSignature(ur) {
        if (ur.type !== RegistryType_1.ExtendedRegistryTypes.BTC_SIGNATURE.getType()) {
            throw new Error('type not match');
        }
        const sig = BtcSignature_1.BtcSignature.fromCBOR(ur.cbor);
        const uuid = sig.getRequestId();
        return {
            'uuid': uuid, // == null ? null : uuidStringify(uuid),
            'gspl': sig.getGspl(),
            'origin': sig.getOrigin(),
        };
    }
    static generateSignRequest({ uuid, hexData, dataType, inputs, change, path, xfp, origin, }) {
        return new BtcSignRequest_1.BtcSignRequest({
            uuid: Buffer.from((0, uuid_1.uuidParse)(uuid)),
            gspl: new CryptoGspl_1.CryptoGspl({
                data: (0, format_1.fromHex)(hexData),
                dataType: dataType,
                inputs: inputs?.map((e) => (0, CryptoTxElement_1.parseTxElement)(e)),
                change: change ? (0, CryptoTxElement_1.parseTxElement)(change) : undefined,
            }),
            derivationPath: new CryptoKeyPath_1.CryptoKeypath((0, format_1.parsePath)(path).map((e) => new CryptoKeyPath_1.PathComponent(e.index, e.hardened)), (0, format_1.fromHex)(xfp)),
            origin: origin,
        }).toUR();
    }
}
exports.GsWalletBTCSDK = GsWalletBTCSDK;
//# sourceMappingURL=btc.js.map