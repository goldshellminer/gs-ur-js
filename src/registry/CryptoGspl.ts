import { DataItem, decodeToDataItem } from '../cbor/index';
import { RegistryItem } from './RegistryItem';
import { ExtendedRegistryTypes, RegistryType } from './RegistryType';
import { CryptoTxElement } from './CryptoTxElement';

enum GsbtKeys {
  data = 1,
  dataType,
  inputs,
  change,
}

export enum GsplDataType {
  transaction = 1,
  message,
}

export class CryptoGspl extends RegistryItem {
  data: Buffer;
  dataType: GsplDataType;
  inputs?: CryptoTxElement[];
  change?: CryptoTxElement;

  constructor(params: {
    data: Buffer;
    dataType: GsplDataType;
    inputs?: CryptoTxElement[];
    change?: CryptoTxElement;
  }) {
    super();
    this.data = params.data;
    this.dataType = params.dataType;
    this.inputs = params.inputs;
    this.change = params.change;
  }

  getRegistryType() {
    return ExtendedRegistryTypes.CRYPTO_GSPL;
  }

  toDataItem(): DataItem {  // 使用 cbor 库的类型
    const map: Record<number, any> = {};

    map[GsbtKeys.data] = this.data;
    map[GsbtKeys.dataType] = this.dataType.valueOf();

    if (this.inputs) {
      map[GsbtKeys.inputs] = this.inputs.map(input => {
        const inputDataItem = input.toDataItem();
        inputDataItem.setTag(input.getRegistryType().getTag());
        return inputDataItem; // Return the underlying data
      });
    }

    if (this.change) {
      const changeDataItem = this.change.toDataItem();
      changeDataItem.setTag(this.change.getRegistryType().getTag());
      map[GsbtKeys.change] = changeDataItem; // Return the underlying data
    }
    return new DataItem(map); // 返回 cbor.Map 对象
  }

  static fromDataItem(dataItem: DataItem): CryptoGspl {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }

    const data = Buffer.from(map[GsbtKeys.data.toString()], 'hex'); // 使用 Buffer.from
    const dataType = GsplDataType[map[GsbtKeys.dataType.toString()] as keyof typeof GsplDataType]; // 使用 keyof 
    const inputs = map[GsbtKeys.inputs.toString()]?.map((e: any) => CryptoTxElement.fromDataItem(e)) as CryptoTxElement[] | undefined;
    const change = map[GsbtKeys.change.toString()] ? CryptoTxElement.fromDataItem(map[GsbtKeys.change.toString()]) : undefined;

    return new CryptoGspl({
      data,
      dataType,
      inputs,
      change,
    });
  }

  static fromCBOR(cborPayload: Buffer): CryptoGspl {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}
