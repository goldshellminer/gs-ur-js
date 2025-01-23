import { ChainConf, NetConf } from "../chainConf";

export const btcConf = new ChainConf({
    name: 'Bitcoin',
    coin: 'BTC',
    symbol: 'BTC',
    coinType: 0,
    decimal: 8,
    minAmount: 0.000001,
    mainnet: new NetConf({
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
    testnet: new NetConf({
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'bc',
            wif: 0xef,
            pubKeyHash: 0x6f,
            scriptHash: 0xc4,
            bip32: {
                public: 0x043587cf,
                private: 0x04358394,
            },
        },
    }),
});