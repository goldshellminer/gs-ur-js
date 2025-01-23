import { UR } from "@ngraveio/bc-ur";
import { ExtendedRegistryTypes } from "../../registry/RegistryType";
import { uuidParse, uuidStringify } from "../../utils/uuid";
import { fromHex, parsePath, toHex } from "../../utils/format";
import { CryptoKeypath, PathComponent } from "../../registry/CryptoKeyPath";
import { BtcInscribeRequest } from "../../registry/btc/BtcInscribeRequest";
import { BtcInscribeSignature } from "../../registry/btc/BtcInscribeSignature";
import { PsbtSignRequest } from "../../registry/btc/PsbtSignRequest";
import { PsbtSignature } from "../../registry/btc/PsbtSignature";

export class GsWalletPsbtSDK {
  static parseSignature(ur: UR): Record<string, any> {
    if (ur.type !== ExtendedRegistryTypes.PSBT_SIGNATURE.getType()) {
      throw new Error('type not match');
    }
    const sig = PsbtSignature.fromCBOR(ur.cbor);
    const uuid = sig.getRequestId();
    return {
      'uuid': uuid, // == null ? null : uuidStringify(uuid),
      'psbt': toHex(sig.getSignature()),
      'origin': sig.getOrigin(),
    };
  }

  static generateSignRequest({
    uuid,
    psbt,
    path,
    xfp,
    origin,
  }: {
    uuid: string;
    psbt: string;
    path: string;
    xfp: string;
    origin?: string;
  }): UR {
    return new PsbtSignRequest({
      uuid: Buffer.from(uuidParse(uuid)),
      psbt: fromHex(psbt),
      derivationPath: new CryptoKeypath(
        parsePath(path).map((e) => new PathComponent(e.index, e.hardened)),
        fromHex(xfp),
      ),
      origin: origin,
    }).toUR();
  }

  static parseInscribeSignature(ur: UR): Record<string, any> {
    if (ur.type !== ExtendedRegistryTypes.BTC_INSCRIBE_SIGNATURE.getType()) {
      throw new Error('type not match');
    }
    const sig = BtcInscribeSignature.fromCBOR(ur.cbor);
    const uuid = sig.getRequestId();
    return {
      'uuid': uuid ? uuidStringify(uuid) : null,
      'commitSignature': toHex(sig.getCommitSignature()),
      'revealSignature': toHex(sig.getRevealSignature()),
      'origin': sig.getOrigin(),
    };
  }

  static generateInscribeRequest({
    uuid,
    commitData,
    revealData,
    origin,
  }: {
    uuid?: string;
    commitData: string;
    revealData: string;
    origin?: string;
  }): UR {
    return new BtcInscribeRequest({
      uuid: uuid ? Buffer.from(uuidParse(uuid)) : undefined,
      commitData: fromHex(commitData),
      revealData: fromHex(revealData),
      origin: origin,
    }).toUR();
  }
}
