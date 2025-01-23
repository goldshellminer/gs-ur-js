import { ChainConf, Net } from './chainConf';

import { kavaConf, alphConf, bchConf, btcConf, dogeConf, hnsConf, kasConf, ltcConf, atomConf, seiConf, arbitrumConf, avaxConf, baseConf, bnbConf, ethConf, ftmConf, optimismConf, polygonConf, zksyncEraConf, solConf, tonConf, trxConf } from './chain';

const coinSeparator = "|";

const chainConfList: Map<string, ChainConf> = new Map([
  ['btc', btcConf],
  ['bch', bchConf],
  ['ltc', ltcConf],
  ['doge', dogeConf],
  ['hns', hnsConf],
  ['eth', ethConf],
  ['arbitrum', arbitrumConf],
  ['polygon', polygonConf],
  ['avax', avaxConf],
  ['bnb', bnbConf],
  ['base', baseConf],
  ['ftm', ftmConf],
  ['optimism', optimismConf],
  ['zksync_era', zksyncEraConf],
  ['sol', solConf],
  ['trx', trxConf],
  ['ton', tonConf],
  ['atom', atomConf],
  ['kava', kavaConf],
  ['sei', seiConf],
  ['alph', alphConf],
  ['kaspa', kasConf],
  ['kas', kasConf],
]);

export function getChainConfByChainId(chainId: number, net: Net = Net.main): ChainConf | undefined {
  const chainConf = Array.from(chainConfList.values()).find(e => e.netConf.ethChainConf && e.netConf.ethChainConf.id === chainId);
  if (chainConf) {
    chainConf.setNet(net);
  }
  return chainConf;
}

export function getChainConfByCoinType(coinType: number, net: Net = Net.main): ChainConf | undefined {
  const chainConf = Array.from(chainConfList.values()).find(e => e.coinType === coinType);
  if (chainConf) {
    chainConf.setNet(net);
  }
  return chainConf;
}

export function getChainConf(chain: string, net: Net = Net.main): ChainConf {
  const chainName = classifyChain(chain).toLowerCase();
  if (chainConfList.has(chainName)) {
    const chainConf = chainConfList.get(chainName)!;
    chainConf.setNet(net);
    return chainConf;
  }
  throw new Error(`chain ${chain} not supported`);
}

export function formatChainName(chain: string): string {
  chain = chain.toLowerCase();
  switch (chain.replace(/_/g, '').replace(/\s/g, '')) {
    case 'bitcoin':
      return 'btc';
    case 'bitcoincash':
      return 'bch';
    case 'litecoin':
      return 'ltc';
    case 'dogecoin':
      return 'doge';
    case 'handshake':
      return 'hns';
    case 'ethereum':
      return 'eth';
    case 'arbitrumone':
      return 'arbitrum';
    case 'avalanchec':
    case 'avalanche':
      return 'avax';
    case 'bnbsmartchain':
      return 'bnb';
    case 'fantom':
      return 'ftm';
    case 'zksyncera':
      return 'zksync_era';
    case 'solana':
      return 'sol';
    case 'tron':
      return 'trx';
    case 'toncoin':
      return 'ton';
    case 'cosmoshub':
      return 'atom';
    case 'alephium':
      return 'alph';
    case 'kas':
      return 'kaspa';
    default:
      return chain;
  }
}

export function classifyChain(chain: string): string {
  if (chain.includes(coinSeparator)) {
    chain = chain.split(coinSeparator)[0];
  }
  return formatChainName(chain);
}
