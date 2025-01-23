import { UR } from "@ngraveio/bc-ur";
import { ExtendedRegistryTypes } from "../../registry/RegistryType";
import { uuidParse } from "../../utils/uuid";
import { fromHex, parsePath, toHex } from "../../utils/format";
import { CryptoKeypath, PathComponent } from "../../registry/CryptoKeyPath";
import { CosmosSignature } from "../../registry/cosmos/CosmosSignature";
import { CosmosSignRequest } from "../../registry/cosmos/CosmosSignRequest";

export class GsWalletCosmosSDK {
  static parseSignature(ur: UR): Record<string, any> {
    if (ur.type !== ExtendedRegistryTypes.COSMOS_SIGNATURE.getType()) {
      throw new Error('type not match');
    }
    const sig = CosmosSignature.fromCBOR(ur.cbor);
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
    fee,
  }: {
    uuid: string;
    signData: string;
    path: string;
    chain: string;
    xfp: string;
    origin?: string;
    fee?: number;
  }): UR {
    return new CosmosSignRequest({
      uuid: Buffer.from(uuidParse(uuid)),
      signData: fromHex(signData),
      derivationPath: new CryptoKeypath(
        parsePath(path).map((e) => new PathComponent(e.index, e.hardened)),
        fromHex(xfp),
      ),
      chain: chain,
      origin: origin,
      fee: fee,
    }).toUR();
  }
}
