import { ChainConf, NetConf } from "../chainConf";

export const belConf = new ChainConf({
  name: 'Bells',
  coin: 'bells',
  symbol: 'BEL',
  coinType: -1,
  decimal: 8,
  mainnet: new NetConf({
    networkType: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'bc',
      pubKeyHash: 0x19,
      scriptHash: 0x24,
      wif: 0x99,
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
    },
  }),
  testnet: new NetConf({
    networkType: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'bc',
      pubKeyHash: 0x19,
      scriptHash: 0x24,
      wif: 0x99,
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
    },
  }),
});
