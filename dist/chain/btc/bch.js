"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bchConf = void 0;
const chainConf_1 = require("../chainConf");
exports.bchConf = new chainConf_1.ChainConf({
    name: 'Bitcoin Cash',
    coin: 'BCH',
    symbol: 'BCH',
    coinType: 145,
    decimal: 8,
    minAmount: 0.0001,
    mainnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '\u0019BitcoinCash Signed Message:\n',
            wif: 128,
            pubKeyHash: 0,
            scriptHash: 5,
            bech32: 'bc',
            // prefix: 'bitcoincash',
            bip32: { public: 76067358, private: 76066276 },
        },
    }),
    testnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '\u0019BitcoinCash Signed Message:\n',
            wif: 128,
            pubKeyHash: 0,
            scriptHash: 5,
            bech32: 'bc',
            // prefix: 'bitcoincash',
            bip32: { public: 76067358, private: 76066276 },
        },
    }),
});
//# sourceMappingURL=bch.js.map