import { DataItem, decodeToDataItem } from '../cbor/index';
import { RegistryType, RegistryTypes } from './RegistryType';
import { RegistryItem } from './RegistryItem';
import { getChainConfByChainId } from '../chain/chainList';

enum CoinInfoKeys {
  type = 1,
  network,
}

export enum Network {
  mainnet = 1,
  testnet,
}

export class CryptoCoinInfo extends RegistryItem {
  constructor(private type?: number, private network?: Network) {
    super();
  }

  getRegistryType(): RegistryType {
    return RegistryTypes.CRYPTO_COIN_INFO;
  }

  getType(): number {
    return this.type ?? 0;
  }

  getNetwork(): Network {
    return this.network ?? Network.mainnet;
  }

  chainConf() {
    return getChainConfByChainId(this.type ?? 0);
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
    if (this.type !== undefined) {
      map[CoinInfoKeys.type] = this.type;
    }
    if (this.network !== undefined) {
      map[CoinInfoKeys.network] = this.network;
    }
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): CryptoCoinInfo {
    const map = dataItem.getData() as Record<string, any>;
    if (!map) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }

    const type = map[CoinInfoKeys.type];
    const network = map[CoinInfoKeys.network];

    return new CryptoCoinInfo(type, network);
  }

  static fromCBOR(cborPayload: Buffer): CryptoCoinInfo {
    const dataItem = decodeToDataItem(cborPayload); // 使用 CBOR 解码
    return this.fromDataItem(dataItem);
  }
}

