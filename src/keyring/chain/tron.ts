import { UR } from "@ngraveio/bc-ur";
import { ExtendedRegistryTypes } from "../../registry/RegistryType";
import { uuidParse } from "../../utils/uuid";
import { fromHex, parsePath, toHex } from "../../utils/format";
import { CryptoKeypath, PathComponent } from "../../registry/CryptoKeyPath";
import { TronSignRequest } from "../../registry/tron/TronSignRequest";
import { TronSignature } from "../../registry/tron/TronSignature";

export class GsWalletTronSDK {
  static parseSignature(ur: UR): Record<string, any> {
    if (ur.type !== ExtendedRegistryTypes.TRON_SIGNATURE.getType()) {
      throw new Error('type not match');
    }
    const sig = TronSignature.fromCBOR(ur.cbor);
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
    path,
    fee,
    xfp,
    origin,
  }: {
    uuid: string;
    signData: string;
    path: string;
    fee?: number;
    xfp: string;
    origin?: string;
  }): UR {
    return new TronSignRequest({
      uuid: Buffer.from(uuidParse(uuid)),
      signData: fromHex(signData),
      derivationPath: new CryptoKeypath(
        parsePath(path).map((e) => new PathComponent(e.index, e.hardened)),
        fromHex(xfp),
      ),
      fee: fee,
      origin: origin,
    }).toUR();
  }
}
