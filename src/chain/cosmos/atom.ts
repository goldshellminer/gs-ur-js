import { ChainConf, NetConf } from "../chainConf";

export const atomConf = new ChainConf({
    name: 'Cosmos Hub',
    coin: 'ATOM',
    symbol: 'ATOM',
    coinType: 118,
    decimal: 6,
    minAmount: 0.0001,
    mainnet: new NetConf({
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
    testnet: new NetConf({
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