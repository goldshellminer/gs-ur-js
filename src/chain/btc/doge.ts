import { ChainConf, NetConf } from "../chainConf";

export const dogeConf = new ChainConf({
    name: 'Dogecoin',
    coin: 'DOGE',
    symbol: 'DOGE',
    coinType: 3,
    decimal: 8,
    minAmount: 5,
    mainnet: new NetConf({
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
    testnet: new NetConf({
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