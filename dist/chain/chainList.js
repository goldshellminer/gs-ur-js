"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainConfByChainId = getChainConfByChainId;
exports.getChainConfByCoinType = getChainConfByCoinType;
exports.getChainConf = getChainConf;
exports.formatChainName = formatChainName;
exports.classifyChain = classifyChain;
const chainConf_1 = require("./chainConf");
const chain_1 = require("./chain");
const coinSeparator = "|";
const chainConfList = new Map([
    ['btc', chain_1.btcConf],
    ['bch', chain_1.bchConf],
    ['ltc', chain_1.ltcConf],
    ['doge', chain_1.dogeConf],
    ['hns', chain_1.hnsConf],
    ['eth', chain_1.ethConf],
    ['arbitrum', chain_1.arbitrumConf],
    ['polygon', chain_1.polygonConf],
    ['avax', chain_1.avaxConf],
    ['bnb', chain_1.bnbConf],
    ['base', chain_1.baseConf],
    ['ftm', chain_1.ftmConf],
    ['optimism', chain_1.optimismConf],
    ['zksync_era', chain_1.zksyncEraConf],
    ['sol', chain_1.solConf],
    ['trx', chain_1.trxConf],
    ['ton', chain_1.tonConf],
    ['atom', chain_1.atomConf],
    ['kava', chain_1.kavaConf],
    ['sei', chain_1.seiConf],
    ['alph', chain_1.alphConf],
    ['kaspa', chain_1.kasConf],
    ['kas', chain_1.kasConf],
]);
function getChainConfByChainId(chainId, net = chainConf_1.Net.main) {
    const chainConf = Array.from(chainConfList.values()).find(e => e.netConf.ethChainConf && e.netConf.ethChainConf.id === chainId);
    if (chainConf) {
        chainConf.setNet(net);
    }
    return chainConf;
}
function getChainConfByCoinType(coinType, net = chainConf_1.Net.main) {
    const chainConf = Array.from(chainConfList.values()).find(e => e.coinType === coinType);
    if (chainConf) {
        chainConf.setNet(net);
    }
    return chainConf;
}
function getChainConf(chain, net = chainConf_1.Net.main) {
    const chainName = classifyChain(chain).toLowerCase();
    if (chainConfList.has(chainName)) {
        const chainConf = chainConfList.get(chainName);
        chainConf.setNet(net);
        return chainConf;
    }
    throw new Error(`chain ${chain} not supported`);
}
function formatChainName(chain) {
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
function classifyChain(chain) {
    if (chain.includes(coinSeparator)) {
        chain = chain.split(coinSeparator)[0];
    }
    return formatChainName(chain);
}
//# sourceMappingURL=chainList.js.map