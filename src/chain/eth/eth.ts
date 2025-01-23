import { ChainConf, EthChainConf, NetConf, TxType } from "../chainConf";

export const ethConf = new ChainConf({
  name: 'Ethereum',
  coin: 'ETH',
  symbol: 'ETH',
  coinType: 60,
  decimal: 18,
  minAmount: 0.0001,
  mainnet: new NetConf({
    ethChainConf: new EthChainConf({
      id: 1,
      type: TxType.eip1559,
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
      id: 5,
      type: TxType.eip1559,
    }),
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