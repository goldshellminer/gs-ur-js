import { DataItem, decodeToDataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from "../RegistryType";
import { fromHex } from '../../utils/format';
import { generateUuid } from '../../utils/uuid';

enum EthSignRequestKeys {
  uuid = 1,
  signData,
  dataType,
  chainId,
  derivationPath,
  address,
  origin,
}

export enum EthDataType {
  transaction = 1,
  typedData,
  personalMessage,
  typedTransaction,
}

export class EthSignRequest extends RegistryItem {
  uuid?: Buffer;
  signData: Buffer;
  dataType: EthDataType;
  chainId?: number;
  derivationPath: CryptoKeypath;
  address?: Buffer;
  origin?: string;

  constructor(params: {
    uuid?: Buffer;
    signData: Buffer;
    dataType: EthDataType;
    chainId?: number;
    derivationPath: CryptoKeypath;
    address?: Buffer;
    origin?: string;
  }) {
    super();
    this.uuid = params.uuid;
    this.signData = params.signData;
    this.dataType = params.dataType;
    this.chainId = params.chainId;
    this.derivationPath = params.derivationPath;
    this.address = params.address;
    this.origin = params.origin;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.ETH_SIGN_REQUEST;
  }

  getRequestId(): Buffer {
    if (!this.uuid) {
      this.uuid = generateUuid();
    }
    return this.uuid;
  }

  getSignData(): Buffer {
    return this.signData;
  }

  getEthDataType(): EthDataType {
    return this.dataType;
  }

  getChainId(): number | undefined {
    return this.chainId;
  }

  getDerivationPath(): string | null {
    return this.derivationPath.getPath();
  }

  getSourceFingerprint(): Buffer | undefined {
    return this.derivationPath.getSourceFingerprint();
  }

  getSignRequestAddress(): Buffer | undefined {
    return this.address;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};

    map[EthSignRequestKeys.uuid] = new DataItem(this.getRequestId(), RegistryTypes.UUID.getTag());
    map[EthSignRequestKeys.signData] = this.signData;
    map[EthSignRequestKeys.dataType] = this.dataType.valueOf();

    if (this.chainId !== undefined) {
      map[EthSignRequestKeys.chainId] = this.chainId;
    }

    const keyPath = this.derivationPath.toDataItem();
    keyPath.setTag(this.derivationPath.getRegistryType().getTag());
    map[EthSignRequestKeys.derivationPath] = keyPath;

    if (this.address !== undefined) {
      map[EthSignRequestKeys.address] = this.address;
    }

    if (this.origin !== undefined) {
      map[EthSignRequestKeys.origin] = this.origin;
    }
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): EthSignRequest {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }

    const signData = fromHex(map[EthSignRequestKeys.signData.toString()]);
    const dataType = EthDataType[map[EthSignRequestKeys.dataType.toString()] as keyof typeof EthDataType]; // 更安全的类型转换
    const derivationPath = CryptoKeypath.fromDataItem(map[EthSignRequestKeys.derivationPath.toString()]);
    const chainId = map[EthSignRequestKeys.chainId.toString()];
    const address = map[EthSignRequestKeys.address.toString()] ? fromHex(map[EthSignRequestKeys.address.toString()]) : undefined;
    const uuid = map[EthSignRequestKeys.uuid.toString()] ? fromHex(map[EthSignRequestKeys.uuid.toString()]) : undefined;
    const origin = map[EthSignRequestKeys.origin.toString()];

    return new EthSignRequest({
      uuid,
      signData,
      dataType,
      chainId,
      derivationPath,
      address,
      origin,
    });
  }

  static fromCBOR(cborPayload: Buffer): EthSignRequest {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}