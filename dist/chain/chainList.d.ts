import { ChainConf, Net } from './chainConf';
export declare function getChainConfByChainId(chainId: number, net?: Net): ChainConf | undefined;
export declare function getChainConfByCoinType(coinType: number, net?: Net): ChainConf | undefined;
export declare function getChainConf(chain: string, net?: Net): ChainConf;
export declare function formatChainName(chain: string): string;
export declare function classifyChain(chain: string): string;
