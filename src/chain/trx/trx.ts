import { ChainConf, EthChainConf, NetConf, TxType } from "../chainConf";

export const trxConf = new ChainConf({
    name: 'Tron',
    coin: 'TRX',
    symbol: 'TRX',
    coinType: 195,
    decimal: 6,
    minAmount: 0.0001,
    mainnet: new NetConf({
        ethChainConf: new EthChainConf({
            id: -1,
            type: TxType.tron,
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
            id: -1,
            type: TxType.tron,
        }),
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'tb',
            wif: 239,
            pubKeyHash: 111,
            scriptHash: 196,
            bip32: {
                public: 70617039,
                private: 70615956,
            },
        },
    }),
});
