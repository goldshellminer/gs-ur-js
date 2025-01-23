import { DataItem, decodeToDataItem } from '../cbor/index';
import { RegistryItem } from "./RegistryItem";
import { ExtendedRegistryTypes, RegistryType } from './RegistryType';
import { bigIntToBytes } from '../utils/format';

enum TxEntityKeys {
  address = 1,
  amount,
}

export class CryptoTxEntity extends RegistryItem {
  private readonly address?: string;
  private readonly amount?: Buffer;

  constructor(options: { address?: string; amount?: Buffer }) {
    super();
    this.address = options.address;
    this.amount = options.amount;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.CRYPTO_TXENTITY;
  }

  getAmount(): Buffer | undefined {
    return this.amount;
  }

  getAddress(): string | undefined {
    return this.address;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
    if (this.amount !== undefined) {
      map[TxEntityKeys.amount] = this.amount;
    }
    if (this.address !== undefined) {
      map[TxEntityKeys.address] = this.address;
    }
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): CryptoTxEntity {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }

    const address: string | undefined = map[TxEntityKeys.address.toString()];
    const amountData: any = map[TxEntityKeys.amount.toString()];
    const amount: Buffer | undefined = typeof amountData === 'string' ? bigIntToBytes(amountData) : undefined;

    return new CryptoTxEntity({
      address: address,
      amount: amount,
    });
  }

  static fromCBOR(cborPayload: Buffer): CryptoTxEntity {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}

export function parseTxEntity(txEntityMap: Record<string, any>): CryptoTxEntity {
  const address: string | undefined = txEntityMap["address"];
  const amount: Buffer | undefined = txEntityMap["amount"] ? bigIntToBytes(txEntityMap["amount"]) : undefined;

  return new CryptoTxEntity({
    address: address,
    amount: amount,
  });
}