"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bnbConf = void 0;
const chainConf_1 = require("../chainConf");
exports.bnbConf = new chainConf_1.ChainConf({
    name: 'BNB',
    coin: 'BNB',
    symbol: 'BNB',
    coinType: 60,
    decimal: 6,
    minAmount: 0.0001,
    mainnet: new chainConf_1.NetConf({
        ethChainConf: new chainConf_1.EthChainConf({
            id: 56,
            type: chainConf_1.TxType.legacy,
        }),
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
        ethChainConf: new chainConf_1.EthChainConf({
            id: 56,
            type: chainConf_1.TxType.legacy,
        }),
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'tb',
            wif: 239,
            pubKeyHash: 111,
            scriptHash: 196,
            bip32: {
                public: 70617039,
                private: 70615956,
            },
        },
    }),
});
//# sourceMappingURL=bnb.js.map