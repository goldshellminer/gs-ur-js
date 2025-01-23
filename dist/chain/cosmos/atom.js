"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atomConf = void 0;
const chainConf_1 = require("../chainConf");
exports.atomConf = new chainConf_1.ChainConf({
    name: 'Cosmos Hub',
    coin: 'ATOM',
    symbol: 'ATOM',
    coinType: 118,
    decimal: 6,
    minAmount: 0.0001,
    mainnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'cosmos',
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
            bech32: 'cosmos',
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
//# sourceMappingURL=atom.js.map