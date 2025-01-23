import { UR } from "@ngraveio/bc-ur";
import { ExtendedRegistryTypes } from "../../registry/RegistryType";
import { uuidParse } from "../../utils/uuid";
import { fromHex, parsePath, toHex } from "../../utils/format";
import { CryptoKeypath, PathComponent } from "../../registry/CryptoKeyPath";
import { GsSignRequest } from "../../registry/gs-basic-chain/GsSignRequest";
import { GsSignature } from "../../registry/gs-basic-chain/GsSignature";

export class GsWalletChainSDK {
  static parseSignature(ur: UR): Record<string, any> {
    if (ur.type !== ExtendedRegistryTypes.GS_SIGNATURE.getType()) {
      throw new Error('type not match');
    }
    const sig = GsSignature.fromCBOR(ur.cbor);
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
    chain,
    xfp,
    origin,
  }: {
    uuid?: string;
    signData: string;
    path: string;
    chain: string;
    xfp: string;
    origin?: string;
  }): UR {
    return new GsSignRequest({
      uuid: uuid ? Buffer.from(uuidParse(uuid)) : undefined,
      signData: fromHex(signData),
      derivationPath: new CryptoKeypath(
        parsePath(path).map((e) => new PathComponent(e.index, e.hardened)),
        fromHex(xfp),
      ),
      chain: chain,
      origin: origin,
    }).toUR();
  }
}
