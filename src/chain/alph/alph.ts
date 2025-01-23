import { ChainConf, NetConf } from "../chainConf";

export const alphConf = new ChainConf({
  name: 'Alephium',
  coin: 'ALPH',
  symbol: 'ALPH',
  coinType: 1234,
  decimal: 18,
  mainnet: new NetConf({
    networkType: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'bc',
      wif: 128,
      pubKeyHash: 0,
      scriptHash: 5,
      bip32: { public: 76067358, private: 76066276 },
    },
  }),
  testnet: new NetConf({
    networkType: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'bc',
      wif: 128,
      pubKeyHash: 0,
      scriptHash: 5,
      bip32: { public: 76067358, private: 76066276 },
    },
  }),
});