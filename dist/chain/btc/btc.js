"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.btcConf = void 0;
const chainConf_1 = require("../chainConf");
exports.btcConf = new chainConf_1.ChainConf({
    name: 'Bitcoin',
    coin: 'BTC',
    symbol: 'BTC',
    coinType: 0,
    decimal: 8,
    minAmount: 0.000001,
    mainnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'bc',
            wif: 128,
            pubKeyHash: 0,
            scriptHash: 5,
            bip32: {
                public: 76067358,
                private: 76066276,
            },
        },
    }),
    testnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'bc',
            wif: 0xef,
            pubKeyHash: 0x6f,
            scriptHash: 0xc4,
            bip32: {
                public: 0x043587cf,
                private: 0x04358394,
            },
        },
    }),
});
//# sourceMappingURL=btc.js.map