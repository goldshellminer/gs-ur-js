import { ChainConf, NetConf } from "../chainConf";

export const seiConf = new ChainConf({
    name: 'Sei',
    coin: 'SEI',
    symbol: 'SEI',
    coinType: 118,
    decimal: 6,
    minAmount: 0.0001,
    mainnet: new NetConf({
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
    testnet: new NetConf({
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