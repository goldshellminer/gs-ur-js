"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygonConf = void 0;
const chainConf_1 = require("../chainConf");
exports.polygonConf = new chainConf_1.ChainConf({
    name: 'Polygon',
    coin: 'Polygon',
    symbol: 'Polygon',
    coinType: 60,
    decimal: 6,
    minAmount: 0.0001,
    mainnet: new chainConf_1.NetConf({
        ethChainConf: new chainConf_1.EthChainConf({
            id: 137,
            type: chainConf_1.TxType.eip1559,
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
            id: 137,
            type: chainConf_1.TxType.eip1559,
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
//# sourceMappingURL=polygon.js.map