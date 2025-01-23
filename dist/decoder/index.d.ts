import { URDecoder } from '@ngraveio/bc-ur';
import { Bytes, CryptoKeypath, CryptoHDKey, CryptoCoinInfo, GsVerifyResponse, CryptoPsbt, CryptoTxEntity, CryptoTxElement, CryptoGspl, PsbtSignature, BtcSignature, EthSignature, GsSignature, BtcInscribeSignature, CosmosSignature, TronSignature } from '..';
export declare class URRegistryDecoder extends URDecoder {
    resultRegistryType: () => Bytes | CryptoCoinInfo | Record<string, any> | CryptoPsbt | CryptoKeypath | CryptoHDKey | CryptoTxElement | CryptoGspl | CryptoTxEntity | GsSignature | GsVerifyResponse | EthSignature | PsbtSignature | BtcSignature | BtcInscribeSignature | CosmosSignature | TronSignature;
}
