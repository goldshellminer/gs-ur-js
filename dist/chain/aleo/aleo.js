"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kavaConf = void 0;
const chainConf_1 = require("../chainConf");
exports.kavaConf = new chainConf_1.ChainConf({
    name: 'Kava',
    coin: 'KAVA',
    symbol: 'KAVA',
    coinType: 459,
    decimal: 6,
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
                private: 76066276
            }
        }
    }),
    testnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'bc',
            wif: 128,
            pubKeyHash: 0,
            scriptHash: 5,
            bip32: {
                public: 76067358,
                private: 76066276
            }
        }
    }),
});
//# sourceMappingURL=aleo.js.map