"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dogeConf = void 0;
const chainConf_1 = require("../chainConf");
exports.dogeConf = new chainConf_1.ChainConf({
    name: 'Dogecoin',
    coin: 'DOGE',
    symbol: 'DOGE',
    coinType: 3,
    decimal: 8,
    minAmount: 5,
    mainnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '\x19Dogecoin Signed Message:\n',
            bech32: 'bc',
            wif: 0x9e,
            pubKeyHash: 0x1e,
            scriptHash: 0x16,
            bip32: {
                public: 0x02facafd,
                private: 0x02fac398,
            },
        },
    }),
    testnet: new chainConf_1.NetConf({
        networkType: {
            messagePrefix: '\x19Dogecoin Signed Message:\n',
            bech32: 'bc',
            wif: 0x9e,
            pubKeyHash: 0x1e,
            scriptHash: 0x16,
            bip32: {
                public: 0x02facafd,
                private: 0x02fac398,
            },
        },
    }),
});
//# sourceMappingURL=doge.js.map