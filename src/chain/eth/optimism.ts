import { ChainConf, EthChainConf, NetConf, TxType } from "../chainConf";

export const optimismConf = new ChainConf({
    name: 'Optimism',
    coin: 'Optimism',
    symbol: 'ETH',
    coinType: 60,
    decimal: 6,
    minAmount: 0.0001,
    mainnet: new NetConf({
        ethChainConf: new EthChainConf({
            id: 10,
            type: TxType.legacy,
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
    testnet: new NetConf({
        ethChainConf: new EthChainConf({
            id: 10,
            type: TxType.legacy,
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