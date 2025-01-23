import { URDecoder } from '@ngraveio/bc-ur';
import { ExtendedRegistryTypes, RegistryTypes } from '../registry/RegistryType';
import { Bytes, CryptoKeypath, CryptoHDKey, CryptoCoinInfo, GsVerifyResponse, CryptoPsbt, CryptoTxEntity, CryptoTxElement, CryptoGspl, parseMultiAccounts, PsbtSignature, BtcSignature, EthSignature, GsSignature, AlphSignature, BtcInscribeSignature, SolSignature, CosmosSignature, TronSignature } from '..';

export class URRegistryDecoder extends URDecoder {
    public resultRegistryType = () => {
        const ur = this.resultUR();
        switch (ur.type) {
            case RegistryTypes.BYTES.getType():
                return Bytes.fromCBOR(ur.cbor);
            case RegistryTypes.CRYPTO_HDKEY.getType():
                return CryptoHDKey.fromCBOR(ur.cbor);
            case RegistryTypes.CRYPTO_KEYPATH.getType():
                return CryptoKeypath.fromCBOR(ur.cbor);
            case RegistryTypes.CRYPTO_COIN_INFO.getType():
                return CryptoCoinInfo.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.CRYPTO_TXENTITY.getType():
                return CryptoTxEntity.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.CRYPTO_TXELEMENT.getType():
                return CryptoTxElement.fromCBOR(ur.cbor);
            case RegistryTypes.CRYPTO_PSBT.getType():
                return CryptoPsbt.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.CRYPTO_GSPL.getType():
                return CryptoGspl.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.CRYPTO_MULTI_ACCOUNTS.getType():
                return parseMultiAccounts(ur);
            case ExtendedRegistryTypes.GS_SIGNATURE.getType():
                return GsSignature.fromCBOR(ur.cbor);
              case ExtendedRegistryTypes.GS_VERIFY_RESPONSE.getType():
                return GsVerifyResponse.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.ETH_SIGNATURE.getType():
                return EthSignature.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.PSBT_SIGNATURE.getType():
                return PsbtSignature.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.BTC_SIGNATURE.getType():
                return BtcSignature.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.ALPH_SIGNATURE.getType():
                return AlphSignature.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.BTC_INSCRIBE_SIGNATURE.getType():
                return BtcInscribeSignature.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.SOL_SIGNATURE.getType():
                return SolSignature.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.COSMOS_SIGNATURE.getType():
                return CosmosSignature.fromCBOR(ur.cbor);
            case ExtendedRegistryTypes.TRON_SIGNATURE.getType():
                return TronSignature.fromCBOR(ur.cbor);
            default:
                throw new Error(
                    `#[ur-registry][Decoder][fn.resultRegistryType]: registry type ${ur.type} is not supported now`,
                );
        }
    };
}