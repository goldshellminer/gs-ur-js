export class RegistryType {
  constructor(private type: string, private tag?: number) { }
  getTag = () => this.tag;
  getType = () => this.type;
}

export const RegistryTypes = {
  UUID: new RegistryType('uuid', 37),
  BYTES: new RegistryType('bytes', undefined),
  CRYPTO_HDKEY: new RegistryType('crypto-hdkey', 40303),
  CRYPTO_KEYPATH: new RegistryType('crypto-keypath', 40304),
  CRYPTO_COIN_INFO: new RegistryType('crypto-coin-info', 40305),
  CRYPTO_ECKEY: new RegistryType('crypto-eckey', 40306),
  CRYPTO_ADDRESS: new RegistryType('crypto-address', 40307),
  CRYPTO_OUTPUT: new RegistryType('crypto-output', 40308),
  CRYPTO_PSBT: new RegistryType('crypto-psbt', 40310),
  CRYPTO_ACCOUNT: new RegistryType('crypto-account', 40311),
};

export const ExtendedRegistryTypes = {
  CRYPTO_MULTI_ACCOUNTS: new RegistryType("crypto-multi-accounts", 1103),
  QR_HARDWARE_CALL: new RegistryType("qr-hardware-call", 1201),
  KEY_DERIVATION_CALL: new RegistryType("key-derivation-call", 1301),
  KEY_DERIVATION_SCHEMA: new RegistryType("key-derivation-schema", 1302),

  GS_SIGN_REQUEST: new RegistryType("gs-sign-request", 6101),
  GS_SIGNATURE: new RegistryType("gs-signature", 6102),
  GS_VERIFY_REQUEST: new RegistryType("gs-verify-request", 6107),
  GS_VERIFY_RESPONSE: new RegistryType("gs-verify-response", 6108),
  CRYPTO_TXELEMENT: new RegistryType("crypto-txelement", 6110),
  CRYPTO_GSPL: new RegistryType("gspl", 6111),
  CRYPTO_TXENTITY: new RegistryType("crypto-txentity", 6112),

  ETH_SIGN_REQUEST: new RegistryType("eth-sign-request", 401),
  ETH_SIGNATURE: new RegistryType("eth-signature", 402),
  ETH_NFT_ITEM: new RegistryType("eth-nft-item", 403),

  PSBT_SIGN_REQUEST: new RegistryType("psbt-sign-request", 8101),
  PSBT_SIGNATURE: new RegistryType("psbt-signature", 8102),
  BTC_SIGN_REQUEST: new RegistryType("btc-sign-request", 8103),
  BTC_SIGNATURE: new RegistryType("btc-signature", 8104),
  ALPH_SIGN_REQUEST: new RegistryType("alph-sign-request", 8110),
  ALPH_SIGNATURE: new RegistryType("alph-signature", 8111),
  // DELETE
  BTC_INSCRIBE_REQUEST: new RegistryType("btc-inscribe-request", 8105),
  BTC_INSCRIBE_SIGNATURE: new RegistryType("btc-inscribe-signature", 8106),

  SOL_SIGN_REQUEST: new RegistryType("sol-sign-request", 1101),
  SOL_SIGNATURE: new RegistryType("sol-signature", 1102),
  SOL_NFT_ITEM: new RegistryType("sol-nft-item", 1104),

  COSMOS_SIGN_REQUEST: new RegistryType("cosmos-sign-request", 1201),
  COSMOS_SIGNATURE: new RegistryType("cosmos-signature", 1202),

  TRON_SIGN_REQUEST: new RegistryType("tron-sign-request", 1301),
  TRON_SIGNATURE: new RegistryType("tron-signature", 1302),
};
