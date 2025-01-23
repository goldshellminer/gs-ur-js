import { UR } from "@ngraveio/bc-ur";
import { ExtendedRegistryTypes } from "../../registry/RegistryType";
import { AlphSignature } from "../../registry/alph/AlphSignature";
import { AlphSignRequest } from "../../registry/alph/AlphSignRequest";
import { uuidParse } from "../../utils/uuid";
import { fromHex, parsePath } from "../../utils/format";
import { parseTxEntity } from "../../registry/CryptoTxEntity";
import { CryptoKeypath, PathComponent } from "../../registry/CryptoKeyPath";
import { GsplDataType } from "../../registry/CryptoGspl";

export class GsWalletAlphSDK {
  static parseSignature(ur: UR): Record<string, any> {
    if (ur.type !== ExtendedRegistryTypes.ALPH_SIGNATURE.getType()) {
      throw new Error('type not match');
    }
    const sig = AlphSignature.fromCBOR(ur.cbor);
    const uuid = sig.getRequestId();
    return {
      'uuid': uuid, // == null ? null : uuidStringify(uuid),
      'signature': sig.getSignature(),
      'origin': sig.getOrigin(),
    };
  }

  static generateSignRequest({
    uuid,
    hexData,
    dataType,
    outputs,
    path,
    xfp,
    origin,
  }: {
    uuid: string;
    hexData: string;
    dataType?: GsplDataType;
    outputs?: Record<string, any>[];
    path: string;
    xfp: string;
    origin?: string;
  }): UR {
    return new AlphSignRequest({
      uuid: Buffer.from(uuidParse(uuid)),
      data: fromHex(hexData),
      outputs: outputs?.map((e) => parseTxEntity(e)),
      derivationPath: new CryptoKeypath(
        parsePath(path).map((e) => new PathComponent(e.index, e.hardened)),
        fromHex(xfp),
      ),
      origin: origin,
    }).toUR();
  }
}
