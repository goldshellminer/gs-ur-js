"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.belConf = void 0;
const chainConf_1 = require("../chainConf");
exports.belConf = new chainConf_1.ChainConf({
    name: 'Bells',
    coin: 'bells',
    symbol: 'BEL',
    coinType: -1,
    decimal: 8,
    mainnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'bc',
            pubKeyHash: 0x19,
            scriptHash: 0x24,
            wif: 0x99,
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4
            },
        },
    }),
    testnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'bc',
            pubKeyHash: 0x19,
            scriptHash: 0x24,
            wif: 0x99,
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4
            },
        },
    }),
});
//# sourceMappingURL=bel.js.map