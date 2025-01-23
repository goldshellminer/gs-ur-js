import { UR } from "@ngraveio/bc-ur";
import { ExtendedRegistryTypes } from "../../registry/RegistryType";
import { CryptoMultiAccounts } from "../../registry/extended/CryptoMultiAccounts";
import { parseCryptoHDKey } from "./hdkey";

export function parseMultiAccounts(ur: UR): Record<string, any> {
    if (ur.type !== ExtendedRegistryTypes.CRYPTO_MULTI_ACCOUNTS.getType()) {
      throw new Error('type not match');
    }
  
    const accounts = CryptoMultiAccounts.fromCBOR(ur.cbor);
    const masterFingerprint = accounts.masterFingerprint;
  
    return {
      device: accounts.device,
      masterFingerprint: masterFingerprint,
      keys: accounts.keys.map((hdKey) => parseCryptoHDKey(hdKey)),
      deviceId: accounts.deviceId,
      version: accounts.version,
      nickName: accounts.nickName,
    };
  }