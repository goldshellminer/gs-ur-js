import * as bitcoin from 'bitcoinjs-lib';
class ChainConf {
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
  net: Net = Net.main;

  constructor({
    name,
    coin,
    symbol,
    coinType,
    decimal,
    minAmount,
    mainnet,
    testnet,
    net = Net.main,
    blockTime,
    interval,
  }: {
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
  }) {
    this.name = name;
    this.coin = coin;
    this.symbol = symbol;
    this.coinType = coinType;
    this.decimal = decimal;
    this.minAmount = minAmount;
    this.mainnet = mainnet;
    this.testnet = testnet;
    this.net = net;
    this.blockTime = blockTime;
    this.interval = interval;
  }

  setNet(net: Net) {
    this.net = net;
  }

  get netConf(): NetConf {
    return this.net === Net.main ? this.mainnet : this.testnet;
  }
}

class NetConf {
  networkType: bitcoin.Network;
  ethChainConf?: EthChainConf;

  constructor({ networkType, ethChainConf }: { networkType: bitcoin.Network; ethChainConf?: EthChainConf }) {
    this.networkType = networkType;
    this.ethChainConf = ethChainConf;
  }
}

class EthChainConf {
  id: number;
  type: TxType;
  custom: boolean;

  constructor({ id, type, custom = false }: { id: number; type: TxType; custom?: boolean }) {
    this.id = id;
    this.type = type;
    this.custom = custom;
  }
}

enum Net {
  main,
  test,
}

enum TxType {
  inscribe,
  brc20,
  taproot, // Commencing with "bc1p". Extremely nominal network expenses. BIP86, P2TR, Bech32m.
  nestedSegWit, // Commencing with "3". Moderate network expenses. BIP49, P2SH-P2WPKH, Base58.
  nativeSegWit, // Commencing with "bc1". Subdued network expenses. BIP84. P2WPKH, Bech32.
  legacy,
  eip1559,
  tron,
  hns,
  btc,
  sol,
  ton,
  atom,
  none,
}

export { ChainConf, NetConf, EthChainConf, Net, TxType };
