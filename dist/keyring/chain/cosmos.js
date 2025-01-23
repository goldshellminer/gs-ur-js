"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsWalletCosmosSDK = void 0;
const RegistryType_1 = require("../../registry/RegistryType");
const uuid_1 = require("../../utils/uuid");
const format_1 = require("../../utils/format");
const CryptoKeyPath_1 = require("../../registry/CryptoKeyPath");
const CosmosSignature_1 = require("../../registry/cosmos/CosmosSignature");
const CosmosSignRequest_1 = require("../../registry/cosmos/CosmosSignRequest");
class GsWalletCosmosSDK {
    static parseSignature(ur) {
        if (ur.type !== RegistryType_1.ExtendedRegistryTypes.COSMOS_SIGNATURE.getType()) {
            throw new Error('type not match');
        }
        const sig = CosmosSignature_1.CosmosSignature.fromCBOR(ur.cbor);
        const uuid = sig.getRequestId();
        return {
            'uuid': uuid, // == null ? null : uuidStringify(uuid),
            'signature': (0, format_1.toHex)(sig.getSignature()),
            'origin': sig.getOrigin(),
        };
    }
    static generateSignRequest({ uuid, signData, path, chain, xfp, origin, fee, }) {
        return new CosmosSignRequest_1.CosmosSignRequest({
            uuid: Buffer.from((0, uuid_1.uuidParse)(uuid)),
            signData: (0, format_1.fromHex)(signData),
            derivationPath: new CryptoKeyPath_1.CryptoKeypath((0, format_1.parsePath)(path).map((e) => new CryptoKeyPath_1.PathComponent(e.index, e.hardened)), (0, format_1.fromHex)(xfp)),
            chain: chain,
            origin: origin,
            fee: fee,
        }).toUR();
    }
}
exports.GsWalletCosmosSDK = GsWalletCosmosSDK;
//# sourceMappingURL=cosmos.js.map