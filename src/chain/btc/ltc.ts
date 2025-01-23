import { ChainConf, NetConf } from "../chainConf";

export const ltcConf = new ChainConf({
    name: 'Litecoin',
    coin: 'LTC',
    symbol: 'LTC',
    coinType: 2,
    decimal: 8,
    minAmount: 0.001,
    mainnet: new NetConf({
        networkType: {
            messagePrefix: '\x19Litecoin Signed Message:\n',
            bech32: 'ltc',
            wif: 0xb0,
            pubKeyHash: 0x30,
            scriptHash: 0x32,
            bip32: {
                public: 0x019da462,
                private: 0x019d9cfe,
            },
        },
    }),
    testnet: new NetConf({
        networkType: {
            messagePrefix: '\x19Litecoin Signed Message:\n',
            bech32: 'ltc',
            wif: 0xb0,
            pubKeyHash: 0x30,
            scriptHash: 0x32,
            bip32: {
                public: 0x019da462,
                private: 0x019d9cfe,
            },
        },
    }),
});