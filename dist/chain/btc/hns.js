"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hnsConf = void 0;
const chainConf_1 = require("../chainConf");
exports.hnsConf = new chainConf_1.ChainConf({
    name: 'Handshake',
    coin: 'HNS',
    symbol: 'HNS',
    coinType: 5353,
    blockTime: 10,
    interval: 36,
    decimal: 6,
    minAmount: 0.1,
    mainnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '',
            bech32: 'hs',
            wif: 0x80,
            pubKeyHash: 0,
            scriptHash: 5,
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4,
            },
        },
    }),
    testnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '',
            bech32: 'rs',
            wif: 0x5a,
            pubKeyHash: 0,
            scriptHash: 5,
            bip32: {
                public: 0xeab4fa05,
                private: 0xeab404c7,
            },
        },
    }),
});
//# sourceMappingURL=hns.js.map