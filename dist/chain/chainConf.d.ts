import * as bitcoin from 'bitcoinjs-lib';
declare class ChainConf {
    name: string;
    coin: string;
    symbol: string;
    coinType: number;
    decimal: number;
    mainnet: NetConf;
    testnet: NetConf;
    minAmount?: number;
    blockTime?: number;
    interval?: number;
    net: Net;
    constructor({ name, coin, symbol, coinType, decimal, minAmount, mainnet, testnet, net, blockTime, interval, }: {
        name: string;
        coin: string;
        symbol: string;
        coinType: number;
        decimal: number;
        minAmount?: number;
        mainnet: NetConf;
        testnet: NetConf;
        net?: Net;
        blockTime?: number;
        interval?: number;
    });
    setNet(net: Net): void;
    get netConf(): NetConf;
}
declare class NetConf {
    networkType: bitcoin.Network;
    ethChainConf?: EthChainConf;
    constructor({ networkType, ethChainConf }: {
        networkType: bitcoin.Network;
        ethChainConf?: EthChainConf;
    });
}
declare class EthChainConf {
    id: number;
    type: TxType;
    custom: boolean;
    constructor({ id, type, custom }: {
        id: number;
        type: TxType;
        custom?: boolean;
    });
}
declare enum Net {
    main = 0,
    test = 1
}
declare enum TxType {
    inscribe = 0,
    brc20 = 1,
    taproot = 2,// Commencing with "bc1p". Extremely nominal network expenses. BIP86, P2TR, Bech32m.
    nestedSegWit = 3,// Commencing with "3". Moderate network expenses. BIP49, P2SH-P2WPKH, Base58.
    nativeSegWit = 4,// Commencing with "bc1". Subdued network expenses. BIP84. P2WPKH, Bech32.
    legacy = 5,
    eip1559 = 6,
    tron = 7,
    hns = 8,
    btc = 9,
    sol = 10,
    ton = 11,
    atom = 12,
    none = 13
}
export { ChainConf, NetConf, EthChainConf, Net, TxType };
