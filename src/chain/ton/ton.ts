import { ChainConf, EthChainConf, NetConf, TxType } from "../chainConf";

export const tonConf = new ChainConf({
    name: 'Toncoin',
    coin: 'TON',
    symbol: 'TON',
    coinType: 60,
    decimal: 9,
    minAmount: 0.001,
    mainnet: new NetConf({
        ethChainConf: new EthChainConf({
            id: -1,
            type: TxType.sol,
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
            type: TxType.sol,
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
