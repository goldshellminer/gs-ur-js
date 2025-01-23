"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solConf = void 0;
const chainConf_1 = require("../chainConf");
exports.solConf = new chainConf_1.ChainConf({
    name: 'Solana',
    coin: 'SOL',
    symbol: 'SOL',
    coinType: 501,
    decimal: 9,
    minAmount: 0.005,
    mainnet: new chainConf_1.NetConf({
        ethChainConf: new chainConf_1.EthChainConf({
            id: -1,
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
            id: -1,
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
});
//# sourceMappingURL=sol.js.map