import { UR } from "@ngraveio/bc-ur";
import { ExtendedRegistryTypes } from "../../registry/RegistryType";
import { uuidParse } from "../../utils/uuid";
import { fromHex, parsePath, toHex } from "../../utils/format";
import { CryptoKeypath, PathComponent } from "../../registry/CryptoKeyPath";
import { EthDataType, EthSignRequest } from "../../registry/eth/EthSignRequest";
import { EthSignature } from "../../registry/eth/EthSignature";

export class GsWalletEthereumSDK {
  static parseSignature(ur: UR): Record<string, any> {
    if (ur.type !== ExtendedRegistryTypes.ETH_SIGNATURE.getType()) {
      throw new Error('type not match');
    }
    const sig = EthSignature.fromCBOR(ur.cbor);
    const uuid = sig.getRequestId();
    return {
      'uuid': uuid, // == null ? null : uuidStringify(uuid),
      'signature': toHex(sig.getSignature()),
      'origin': sig.getOrigin(),
    };
  }

  static generateSignRequest({
    uuid,
    signData,
    dataType,
    path,
    xfp,
    chainId,
    address,
    origin,
  }: {
    uuid: string;
    signData: string;
    dataType: EthDataType;
    path: string;
    xfp: string;
    chainId: number;
    address?: string;
    origin?: string;
  }): UR {
    return new EthSignRequest({
      uuid: Buffer.from(uuidParse(uuid)),
      signData: fromHex(signData),
      dataType: dataType,
      derivationPath: new CryptoKeypath(
        parsePath(path).map((e) => new PathComponent(e.index, e.hardened)),
        fromHex(xfp),
      ),
      chainId: chainId,
      address: address ? fromHex(address) : undefined,
      origin: origin,
    }).toUR();
  }
}
