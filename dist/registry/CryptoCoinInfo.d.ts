import { DataItem } from '../cbor/index';
import { RegistryType } from './RegistryType';
import { RegistryItem } from './RegistryItem';
export declare enum Network {
    mainnet = 1,
    testnet = 2
}
export declare class CryptoCoinInfo extends RegistryItem {
    private type?;
    private network?;
    constructor(type?: number | undefined, network?: Network | undefined);
    getRegistryType(): RegistryType;
    getType(): number;
    getNetwork(): Network;
    chainConf(): import("../chain/chainConf").ChainConf | undefined;
    toDataItem(): DataItem;
    static fromDataItem(dataItem: DataItem): CryptoCoinInfo;
    static fromCBOR(cborPayload: Buffer): CryptoCoinInfo;
}
