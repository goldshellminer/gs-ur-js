"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedRegistryTypes = exports.RegistryTypes = exports.RegistryType = void 0;
class RegistryType {
    constructor(type, tag) {
        this.type = type;
        this.tag = tag;
        this.getTag = () => this.tag;
        this.getType = () => this.type;
    }
}
exports.RegistryType = RegistryType;
exports.RegistryTypes = {
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
exports.ExtendedRegistryTypes = {
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
// export class ExtendedRegistryTypes extends RegistryType {
//   constructor(type: string, tag?: number) {
//     super(type, tag);
//   }
//   static CRYPTO_MULTI_ACCOUNTS = new RegistryType("crypto-multi-accounts", 1103);
//   static QR_HARDWARE_CALL = new RegistryType("qr-hardware-call", 1201);
//   static KEY_DERIVATION_CALL = new RegistryType("key-derivation-call", 1301);
//   static KEY_DERIVATION_SCHEMA = new RegistryType("key-derivation-schema", 1302);
//   static GS_SIGN_REQUEST = new RegistryType("gs-sign-request", 6101);
//   static GS_SIGNATURE = new RegistryType("gs-signature", 6102);
//   static GS_VERIFY_REQUEST = new RegistryType("gs-verify-request", 6107);
//   static GS_VERIFY_RESPONSE = new RegistryType("gs-verify-response", 6108);
//   static CRYPTO_TXELEMENT = new RegistryType("crypto-txelement", 6110);
//   static CRYPTO_GSPL = new RegistryType("gspl", 6111);
//   static CRYPTO_TXENTITY = new RegistryType("crypto-txentity", 6112);
//   static ETH_SIGN_REQUEST = new RegistryType("eth-sign-request", 401);
//   static ETH_SIGNATURE = new RegistryType("eth-signature", 402);
//   static ETH_NFT_ITEM = new RegistryType("eth-nft-item", 403);
//   static PSBT_SIGN_REQUEST = new RegistryType("psbt-sign-request", 8101);
//   static PSBT_SIGNATURE = new RegistryType("psbt-signature", 8102);
//   static BTC_SIGN_REQUEST = new RegistryType("btc-sign-request", 8103);
//   static BTC_SIGNATURE = new RegistryType("btc-signature", 8104);
//   static ALPH_SIGN_REQUEST = new RegistryType("alph-sign-request", 8110);
//   static ALPH_SIGNATURE = new RegistryType("alph-signature", 8111);
//   // DELETE
//   static BTC_INSCRIBE_REQUEST = new RegistryType("btc-inscribe-request", 8105);
//   static BTC_INSCRIBE_SIGNATURE = new RegistryType("btc-inscribe-signature", 8106);
//   static SOL_SIGN_REQUEST = new RegistryType("sol-sign-request", 1101);
//   static SOL_SIGNATURE = new RegistryType("sol-signature", 1102);
//   static SOL_NFT_ITEM = new RegistryType("sol-nft-item", 1104);
//   static COSMOS_SIGN_REQUEST = new RegistryType("cosmos-sign-request", 1201);
//   static COSMOS_SIGNATURE = new RegistryType("cosmos-signature", 1202);
//   static TRON_SIGN_REQUEST = new RegistryType("tron-sign-request", 1301);
//   static TRON_SIGNATURE = new RegistryType("tron-signature", 1302);
// }
//# sourceMappingURL=RegistryType.js.map