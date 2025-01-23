import { DataItem, decodeToDataItem } from '../../cbor/index';
import { CryptoKeypath } from "../CryptoKeyPath";
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType, RegistryTypes } from "../RegistryType";
import { fromHex } from '../../utils/format';
import { generateUuid } from '../../utils/uuid';

enum SolSignRequestKeys {
  uuid = 1,
  signData,
  derivationPath,
  outputAddress,
  origin,
  signType,
  contractAddress,
  fee,
}

export enum SignType {
  transaction = 1,
  message,
}

export class SolSignRequest extends RegistryItem {
  uuid?: Buffer;
  signData: Buffer;
  signType: SignType;
  derivationPath: CryptoKeypath;
  outputAddress?: string;
  contractAddress?: string;
  origin?: string;
  fee?: number;

  constructor(params: {
    uuid?: Buffer;
    signData: Buffer;
    signType: SignType;
    derivationPath: CryptoKeypath;
    outputAddress?: string;
    contractAddress?: string;
    origin?: string;
    fee?: number;
  }) {
    super();
    this.uuid = params.uuid;
    this.signData = params.signData;
    this.signType = params.signType;
    this.derivationPath = params.derivationPath;
    this.outputAddress = params.outputAddress;
    this.contractAddress = params.contractAddress;
    this.origin = params.origin;
    this.fee = params.fee;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.SOL_SIGN_REQUEST;
  }

  getRequestId(): Buffer {
    if (this.uuid === undefined) {
      this.uuid = generateUuid();
    }
    return this.uuid;
  }

  getSignData(): Buffer {
    return this.signData;
  }

  getSignType(): SignType {
    return this.signType;
  }

  getDerivationPath(): string | null {
    return this.derivationPath.getPath();
  }

  getSourceFingerprint(): Buffer | undefined {
    return this.derivationPath.getSourceFingerprint();
  }

  getOutputAddress(): string | undefined {
    return this.outputAddress;
  }

  getContractAddress(): string | undefined {
    return this.contractAddress;
  }

  getOrigin(): string | undefined {
    return this.origin;
  }

  getFee(): number | undefined {
    return this.fee;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};
  
    map[SolSignRequestKeys.uuid] = new DataItem(this.getRequestId(), RegistryTypes.UUID.getTag());
    map[SolSignRequestKeys.signData] = this.signData;
    const keyPath = this.derivationPath.toDataItem();
    keyPath.setTag(this.derivationPath.getRegistryType().getTag());
    map[SolSignRequestKeys.derivationPath] = keyPath;
  
    if (this.outputAddress) {
      map[SolSignRequestKeys.outputAddress] = this.outputAddress;
    }
  
    if (this.origin) {
      map[SolSignRequestKeys.origin] = this.origin;
    }
  
    map[SolSignRequestKeys.signType] = this.signType;
  
    if (this.contractAddress) {
      map[SolSignRequestKeys.contractAddress] = this.contractAddress;
    }
  
    if (this.fee) {
      map[SolSignRequestKeys.fee] = this.fee;
    }
  
    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): SolSignRequest {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const signData = fromHex(map[SolSignRequestKeys.signData.toString()]);
    const signType = SignType[map[SolSignRequestKeys.signType.toString()] as keyof typeof SignType]; // Type-safe enum access
    const derivationPath = CryptoKeypath.fromDataItem(map[SolSignRequestKeys.derivationPath.toString()]);
    const outputAddress = map[SolSignRequestKeys.outputAddress.toString()];
    const contractAddress = map[SolSignRequestKeys.contractAddress.toString()];
    const uuid = map[SolSignRequestKeys.uuid.toString()]; // No need for .bytes, fromHex handles it
    const origin = map[SolSignRequestKeys.origin.toString()];
    const fee = map[SolSignRequestKeys.fee.toString()];

    return new SolSignRequest({
      uuid: fromHex(uuid),
      signData: signData,
      signType: signType,
      derivationPath: derivationPath,
      outputAddress: outputAddress,
      contractAddress: contractAddress,
      origin: origin,
      fee: fee,
    });
  }


  static fromCBOR(cborPayload: Buffer): SolSignRequest {
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}