
import { DataItem, decodeToDataItem } from '../cbor/index';
import { RegistryItem } from './RegistryItem';
import { RegistryType, RegistryTypes } from './RegistryType';

export class CryptoPsbt extends RegistryItem {
  data: Buffer;

  constructor(data: Buffer) {
    super();
    this.data = data;
  }

  getRegistryType(): RegistryType {
    return RegistryTypes.CRYPTO_PSBT;
  }

  toDataItem(): DataItem {
    return new DataItem(this.data, RegistryTypes.CRYPTO_PSBT.getTag());
  }

  static fromDataItem = (dataItem: DataItem) => {
    const psbt = dataItem.getData();
    if (!psbt) {
      throw new Error(
        `#[ur-registry][CryptoPSBT][fn.fromDataItem]: decoded [dataItem][#data] is undefined: ${dataItem}`,
      );
    }
    return new CryptoPsbt(psbt);
  };

  static fromCBOR(cborPayload: Buffer): CryptoPsbt {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}