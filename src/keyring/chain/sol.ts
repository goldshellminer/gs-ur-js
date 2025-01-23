import { UR } from "@ngraveio/bc-ur";
import { ExtendedRegistryTypes } from "../../registry/RegistryType";
import { uuidParse } from "../../utils/uuid";
import { fromHex, parsePath, toHex } from "../../utils/format";
import { CryptoKeypath, PathComponent } from "../../registry/CryptoKeyPath";
import { SignType, SolSignRequest } from "../../registry/sol/SolSignRequest";
import { SolSignature } from "../../registry/sol/SolSignature";

export class GsWalletSolSDK {
  static parseSignature(ur: UR): Record<string, any> {
    if (ur.type !== ExtendedRegistryTypes.SOL_SIGNATURE.getType()) {
      throw new Error('type not match');
    }
    const sig = SolSignature.fromCBOR(ur.cbor);
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
    signType,
    path,
    xfp,
    outputAddress,
    contractAddress,
    origin,
    fee,
  }: {
    uuid: string;
    signData: string;
    signType: SignType;
    path: string;
    xfp: string;
    outputAddress?: string;
    contractAddress?: string;
    origin?: string;
    fee?: number;
  }): UR {
    console.log(signData);
    return new SolSignRequest({
      uuid: Buffer.from(uuidParse(uuid)),
      signData: fromHex(signData),
      signType: signType,
      derivationPath: new CryptoKeypath(
        parsePath(path).map((e) => new PathComponent(e.index, e.hardened)),
        fromHex(xfp),
      ),
      outputAddress: outputAddress,
      contractAddress: contractAddress,
      origin: origin,
      fee: fee,
    }).toUR();
  }
}
