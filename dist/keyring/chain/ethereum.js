"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsWalletEthereumSDK = void 0;
const RegistryType_1 = require("../../registry/RegistryType");
const uuid_1 = require("../../utils/uuid");
const format_1 = require("../../utils/format");
const CryptoKeyPath_1 = require("../../registry/CryptoKeyPath");
const EthSignRequest_1 = require("../../registry/eth/EthSignRequest");
const EthSignature_1 = require("../../registry/eth/EthSignature");
class GsWalletEthereumSDK {
    static parseSignature(ur) {
        if (ur.type !== RegistryType_1.ExtendedRegistryTypes.ETH_SIGNATURE.getType()) {
            throw new Error('type not match');
        }
        const sig = EthSignature_1.EthSignature.fromCBOR(ur.cbor);
        const uuid = sig.getRequestId();
        return {
            'uuid': uuid, // == null ? null : uuidStringify(uuid),
            'signature': (0, format_1.toHex)(sig.getSignature()),
            'origin': sig.getOrigin(),
        };
    }
    static generateSignRequest({ uuid, signData, dataType, path, xfp, chainId, address, origin, }) {
        return new EthSignRequest_1.EthSignRequest({
            uuid: Buffer.from((0, uuid_1.uuidParse)(uuid)),
            signData: (0, format_1.fromHex)(signData),
            dataType: dataType,
            derivationPath: new CryptoKeyPath_1.CryptoKeypath((0, format_1.parsePath)(path).map((e) => new CryptoKeyPath_1.PathComponent(e.index, e.hardened)), (0, format_1.fromHex)(xfp)),
            chainId: chainId,
            address: address ? (0, format_1.fromHex)(address) : undefined,
            origin: origin,
        }).toUR();
    }
}
exports.GsWalletEthereumSDK = GsWalletEthereumSDK;
//# sourceMappingURL=ethereum.js.map