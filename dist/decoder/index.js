"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URRegistryDecoder = void 0;
const bc_ur_1 = require("@ngraveio/bc-ur");
const RegistryType_1 = require("../registry/RegistryType");
const __1 = require("..");
class URRegistryDecoder extends bc_ur_1.URDecoder {
    constructor() {
        super(...arguments);
        this.resultRegistryType = () => {
            const ur = this.resultUR();
            switch (ur.type) {
                case RegistryType_1.RegistryTypes.BYTES.getType():
                    return __1.Bytes.fromCBOR(ur.cbor);
                case RegistryType_1.RegistryTypes.CRYPTO_HDKEY.getType():
                    return __1.CryptoHDKey.fromCBOR(ur.cbor);
                case RegistryType_1.RegistryTypes.CRYPTO_KEYPATH.getType():
                    return __1.CryptoKeypath.fromCBOR(ur.cbor);
                case RegistryType_1.RegistryTypes.CRYPTO_COIN_INFO.getType():
                    return __1.CryptoCoinInfo.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.CRYPTO_TXENTITY.getType():
                    return __1.CryptoTxEntity.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.CRYPTO_TXELEMENT.getType():
                    return __1.CryptoTxElement.fromCBOR(ur.cbor);
                case RegistryType_1.RegistryTypes.CRYPTO_PSBT.getType():
                    return __1.CryptoPsbt.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.CRYPTO_GSPL.getType():
                    return __1.CryptoGspl.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.CRYPTO_MULTI_ACCOUNTS.getType():
                    return (0, __1.parseMultiAccounts)(ur);
                case RegistryType_1.ExtendedRegistryTypes.GS_SIGNATURE.getType():
                    return __1.GsSignature.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.GS_VERIFY_RESPONSE.getType():
                    return __1.GsVerifyResponse.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.ETH_SIGNATURE.getType():
                    return __1.EthSignature.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.PSBT_SIGNATURE.getType():
                    return __1.PsbtSignature.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.BTC_SIGNATURE.getType():
                    return __1.BtcSignature.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.ALPH_SIGNATURE.getType():
                    return __1.AlphSignature.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.BTC_INSCRIBE_SIGNATURE.getType():
                    return __1.BtcInscribeSignature.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.SOL_SIGNATURE.getType():
                    return __1.SolSignature.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.COSMOS_SIGNATURE.getType():
                    return __1.CosmosSignature.fromCBOR(ur.cbor);
                case RegistryType_1.ExtendedRegistryTypes.TRON_SIGNATURE.getType():
                    return __1.TronSignature.fromCBOR(ur.cbor);
                default:
                    throw new Error(`#[ur-registry][Decoder][fn.resultRegistryType]: registry type ${ur.type} is not supported now`);
            }
        };
    }
}
exports.URRegistryDecoder = URRegistryDecoder;
//# sourceMappingURL=index.js.map