import { DataItem, decodeToDataItem } from '../../cbor/index';
import { CryptoHDKey } from '../CryptoHdKey';
import { RegistryItem } from "../RegistryItem";
import { ExtendedRegistryTypes, RegistryType } from "../RegistryType";

enum MultiAccountsKeys {
  masterFingerprint = 1,
  keys,
  device,
  deviceId,
  version,
  nickName,
}

export class CryptoMultiAccounts extends RegistryItem {
  masterFingerprint: Buffer;
  keys: CryptoHDKey[];
  device: string;
  deviceId: string;
  version: string;
  nickName?: string;

  constructor(params: {
    masterFingerprint: Buffer;
    keys: CryptoHDKey[];
    device: string;
    deviceId: string;
    version: string;
    nickName?: string;
  }) {
    super();
    this.masterFingerprint = params.masterFingerprint;
    this.keys = params.keys;
    this.device = params.device;
    this.deviceId = params.deviceId;
    this.version = params.version;
    this.nickName = params.nickName;
  }

  getRegistryType(): RegistryType {
    return ExtendedRegistryTypes.CRYPTO_MULTI_ACCOUNTS;
  }

  getMasterFingerprint(): Buffer {
    return this.masterFingerprint;
  }

  getKeys(): CryptoHDKey[] {
    return this.keys;
  }

  getDevice(): string {
    return this.device;
  }

  getDeviceId(): string {
    return this.deviceId;
  }

  getVersion(): string {
    return this.version;
  }

  toDataItem(): DataItem {
    const map: Record<number, any> = {};

    // Assuming masterFingerprint is a Buffer in TypeScript
    const masterFingerprintView = new DataView(this.masterFingerprint.buffer);
    const masterFingerprintUint32 = masterFingerprintView.getUint32(0, true);  // true for little-endian
    map[MultiAccountsKeys.masterFingerprint] = masterFingerprintUint32;

    map[MultiAccountsKeys.keys] = this.keys.map((item) => {
      const dataItem = item.toDataItem();
      dataItem.setTag(item.getRegistryType().getTag());
      return dataItem;
    });

    map[MultiAccountsKeys.device] = this.device;
    map[MultiAccountsKeys.deviceId] = this.deviceId;
    map[MultiAccountsKeys.version] = this.version;

    if (this.nickName !== undefined) {
      map[MultiAccountsKeys.nickName] = this.nickName;
    }

    return new DataItem(map);
  }

  static fromDataItem(dataItem: DataItem): CryptoMultiAccounts {
    const map = dataItem.getData() as Record<string, any>;
    if (map == null) {
      throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
    }
    const masterFingerprint = new Buffer(4);
    const _masterFingerprint = map[MultiAccountsKeys.masterFingerprint.toString()];
    if (_masterFingerprint !== null && _masterFingerprint !== undefined) {
      const dataView = new DataView(masterFingerprint.buffer);
      dataView.setUint32(0, _masterFingerprint, true); // True for little-endian
    }


    const keys = (map[MultiAccountsKeys.keys.toString()] as any[]).map((item: any) => CryptoHDKey.fromDataItem(item));
    const device = map[MultiAccountsKeys.device.toString()] as string;
    const deviceId = map[MultiAccountsKeys.deviceId.toString()] as string;
    const version = map[MultiAccountsKeys.version.toString()] as string;
    const nickName = map[MultiAccountsKeys.nickName.toString()] as string | undefined;


    return new CryptoMultiAccounts({ masterFingerprint, keys, device, deviceId, version, nickName });
  }

  static fromCBOR(cborPayload: Buffer): CryptoMultiAccounts {  // Assuming 'Buffer' is available
    const dataItem = decodeToDataItem(cborPayload);
    return this.fromDataItem(dataItem);
  }
}
