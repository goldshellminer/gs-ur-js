import { decodeToDataItem, DataItem } from '../../cbor';
import { GsplDataType } from '../CryptoGspl';
import { CryptoKeypath } from "../CryptoKeyPath";
import { CryptoTxEntity } from "../CryptoTxEntity";
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from "../RegistryType";

enum AlphSignRequestKeys {
  uuid = 1,
  data,
  derivationPath,
  outputs,
  origin,
}

export class AlphSignRequest extends RegistryItem {
  uuid: Buffer;
  data: Buffer;
  // dataType?: GsplDataType;
  derivationPath?: CryptoKeypath;
  outputs?: CryptoTxEntity[];
  origin?: string;

  constructor(params: {
    uuid: Buffer;
    data: Buffer;
    // dataType?: GsplDataType;
    derivationPath?: CryptoKeypath;
    outputs?: CryptoTxEntity[];
    origin?: string;
  }) {
    super();
    this.uuid = params.uuid;
    this.data = params.data;
    // this.dataType = params.dataType;
    this.derivationPath = params.derivationPath;
    this.outputs = params.outputs;
    this.origin = params.origin;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.ALPH_SIGN_REQUEST;
  }

  getRequestId(): Buffer {
    return this.uuid;
  }

  getData(): Buffer {
    return this.data;
  }

  getPath(): CryptoKeypath | undefined {
    return this.derivationPath;
  }

  getOutputs(): CryptoTxEntity[] | undefined {
    return this.outputs;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  toDataItem(): DataItem {
    const map: { [key: number]: any } = {};

    map[AlphSignRequestKeys.uuid] = new DataItem(this.getRequestId(), RegistryTypes.UUID.getTag());

    map[AlphSignRequestKeys.data] = this.getData();

    if (this.derivationPath) {
      let derivationPathDataItem = this.derivationPath.toDataItem();
      derivationPathDataItem.setTag(this.derivationPath.getRegistryType().getTag());
      map[AlphSignRequestKeys.derivationPath] = derivationPathDataItem;
    }

    if (this.outputs && this.outputs.length > 0) {
      const outputsData: any[] = this.outputs.map((output) => {
        let outputDataItem = output.toDataItem();
        outputDataItem.setTag(output.getRegistryType().getTag());
        return outputDataItem;
      });
      map[AlphSignRequestKeys.outputs] = outputsData;
    }

    if (this.origin) {
      map[AlphSignRequestKeys.origin] = this.origin;
    }

    return new DataItem(map);
  }

  static fromDataItem(jsonData: any): AlphSignRequest {
    let map: any;

    if (typeof jsonData === 'string') {
      try {
        map = JSON.parse(jsonData);
      } catch (e) {
        throw new Error('Invalid JSON string provided to fromDataItem');
      }
    } else if (typeof jsonData === 'object' && jsonData !== null) {
      map = jsonData;
    } else {
      throw new Error('Param for fromDataItem is neither String nor Map, please check it!');
    }

    const data = map[AlphSignRequestKeys.data];
    const uuid = map[AlphSignRequestKeys.uuid]?.bytes;
    const derivationPath = map[AlphSignRequestKeys.derivationPath]
      ? CryptoKeypath.fromDataItem(map[AlphSignRequestKeys.derivationPath])
      : undefined;
    const outputs = map[AlphSignRequestKeys.outputs]
      ? map[AlphSignRequestKeys.outputs].map((e: any) => CryptoTxEntity.fromDataItem(e))
      : undefined;
    const origin = map[AlphSignRequestKeys.origin];

    if (!uuid || !data) {
      throw new Error('UUID and Data are required fields for AlphSignRequest');
    }

    return new AlphSignRequest({
      uuid: Buffer.from(uuid),
      data: Buffer.from(data),
      derivationPath,
      outputs,
      origin,
    });
  }

  static fromCBOR(cborPayload: Buffer): AlphSignRequest {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}