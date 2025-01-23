import './patchCBOR';
import { Buffer } from 'buffer/';
import { Bytes } from './registry/Bytes';
import {
  CryptoCoinInfo,
//   Type as CryptoCoinInfoType,
  Network as CryptoCoinInfoNetwork,
} from './registry/CryptoCoinInfo';
import { CryptoPsbt } from './registry/CryptoPsbt';


import { RegistryItem } from './registry/RegistryItem';
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from './registry/RegistryType';

import {
  addReader,
  addSemanticDecode,
  addSemanticEncode,
  addWriter,
  decodeToDataItem,
  encodeDataItem,
} from './cbor';


import { patchTags } from './cbor/utils';
import { CryptoKeypath, PathComponent } from './registry/CryptoKeyPath';
import { CryptoHDKey } from './registry/CryptoHdKey';
import { CryptoGspl } from './registry/CryptoGspl';
import { CryptoTxElement } from './registry/CryptoTxElement';
import { CryptoTxEntity } from './registry/CryptoTxEntity';
import { URRegistryDecoder } from './decoder';

export { DataItem } from './cbor';
export { generateUuidStr, uuidStringify } from './utils/uuid';

const cbor = {
  addReader,
  addSemanticDecode,
  addSemanticEncode,
  addWriter,
  patchTags,
};

const extend = {
  RegistryType,
  RegistryTypes,
  RegistryItem,
  ExtendedRegistryTypes,
  decodeToDataItem,
  encodeDataItem,
  cbor,
};

export {
  Bytes,
  CryptoTxEntity,
  CryptoTxElement,
  CryptoGspl,  
  CryptoHDKey,
  CryptoKeypath,
  CryptoCoinInfo,
  CryptoCoinInfoNetwork,
  CryptoPsbt,
  PathComponent,
  extend,
  Buffer,
  URRegistryDecoder,
};

export { patchTags };
export * as format from './utils/format';
export { UR } from "@ngraveio/bc-ur";
export * from './cbor';
export * from './patchCBOR'
export * from './registry/CryptoGspl';
export * from './registry/eth/EthSignRequest';
export * from './registry/eth/EthSignature';
export * from './registry/sol/SolSignRequest';
export * from './registry/sol/SolSignature';
export * from './registry/alph/AlphSignRequest';
export * from './registry/alph/AlphSignature';
export * from './registry/btc/BtcSignRequest';
export * from './registry/btc/BtcSignature';
export * from './registry/btc/PsbtSignRequest';
export * from './registry/btc/PsbtSignature';
export * from './registry/btc/BtcInscribeRequest';
export * from './registry/btc/BtcInscribeSignature';
export * from './registry/cosmos/CosmosSignRequest';
export * from './registry/cosmos/CosmosSignature';
export * from './registry/tron/TronSignRequest';
export * from './registry/tron/TronSignature';
export * from './registry/gs-basic-chain/GsSignRequest';
export * from './registry/gs-basic-chain/GsSignature';
export * from './registry/verify/GsVerifyRequest';
export * from './registry/verify/GsVerifyResponse';

export * from './registry/RegistryItem';
export * from './registry/RegistryType';

export * from './keyring/wallet/multiAccount';
export * from './keyring/chain/alph';
export * from './keyring/chain/btc';
export * from './keyring/chain/psbt';
export * from './keyring/chain/cosmos';
export * from './keyring/chain/ethereum';
export * from './keyring/chain/sol';
export * from './keyring/chain/tron';
