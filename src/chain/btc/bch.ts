import { ChainConf, NetConf } from "../chainConf";

export const bchConf = new ChainConf({
  name: 'Bitcoin Cash',
  coin: 'BCH',
  symbol: 'BCH',
  coinType: 145,
  decimal: 8,
  minAmount: 0.0001,
  mainnet: new NetConf({
    networkType: {
      messagePrefix: '\u0019BitcoinCash Signed Message:\n',
      wif: 128,
      pubKeyHash: 0,
      scriptHash: 5,
      bech32: 'bc',
      // prefix: 'bitcoincash',
      bip32: { public: 76067358, private: 76066276 },
    },
  }),
  testnet: new NetConf({
    networkType: {
      messagePrefix: '\u0019BitcoinCash Signed Message:\n',
      wif: 128,
      pubKeyHash: 0,
      scriptHash: 5,
      bech32: 'bc',
      // prefix: 'bitcoincash',
      bip32: { public: 76067358, private: 76066276 },
    },
  }),
});