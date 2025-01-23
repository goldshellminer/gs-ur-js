"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seiConf = void 0;
const chainConf_1 = require("../chainConf");
exports.seiConf = new chainConf_1.ChainConf({
    name: 'Sei',
    coin: 'SEI',
    symbol: 'SEI',
    coinType: 118,
    decimal: 6,
    minAmount: 0.0001,
    mainnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'sei',
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
            bech32: 'sei',
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
//# sourceMappingURL=sei.js.map