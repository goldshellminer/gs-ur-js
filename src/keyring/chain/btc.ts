import { UR } from "@ngraveio/bc-ur";
import { ExtendedRegistryTypes } from "../../registry/RegistryType";
import { CryptoGspl, GsplDataType } from "../../registry/CryptoGspl";
import { uuidParse } from "../../utils/uuid";
import { fromHex, parsePath } from "../../utils/format";
import { CryptoKeypath, PathComponent } from "../../registry/CryptoKeyPath";
import { BtcSignRequest } from "../../registry/btc/BtcSignRequest";
import { BtcSignature } from "../../registry/btc/BtcSignature";
import { parseTxElement } from "../../registry/CryptoTxElement";

export class GsWalletBTCSDK {
  static parseSignature(ur: UR): Record<string, any> {
    if (ur.type !== ExtendedRegistryTypes.BTC_SIGNATURE.getType()) {
      throw new Error('type not match');
    }
    const sig = BtcSignature.fromCBOR(ur.cbor);
    const uuid = sig.getRequestId();
    return {
      'uuid': uuid, // == null ? null : uuidStringify(uuid),
      'gspl': sig.getGspl(),
      'origin': sig.getOrigin(),
    };
  }

  static generateSignRequest({
    uuid,
    hexData,
    dataType,
    inputs,
    change,
    path,
    xfp,
    origin,
  }: {
    uuid: string;
    hexData: string;
    dataType: GsplDataType;
    inputs?: Record<string, any>[];
    change?: Record<string, any>;
    path: string;
    xfp: string;
    origin?: string;
  }): UR {
    return new BtcSignRequest({
      uuid: Buffer.from(uuidParse(uuid)),
      gspl: new CryptoGspl({
        data: fromHex(hexData),
        dataType: dataType,
        inputs: inputs?.map((e) => parseTxElement(e)),
        change: change ? parseTxElement(change) : undefined,
      }),
      derivationPath: new CryptoKeypath(
        parsePath(path).map((e) => new PathComponent(e.index, e.hardened)),
        fromHex(xfp),
      ),
      origin: origin,
    }).toUR();
  }
}
