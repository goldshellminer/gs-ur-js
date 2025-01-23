import { UR } from "@ngraveio/bc-ur";
import { RegistryType, RegistryTypes } from "../../registry/RegistryType";
import { toHex } from "../../utils/format";
import { CryptoHDKey } from "../../registry/CryptoHdKey";
import { getChainConfByCoinType } from "../../chain/chainList";

export function parseHDKey(ur: UR): Record<string, any> {
    if (ur.type !== RegistryTypes.CRYPTO_HDKEY.getType()) {
        throw new Error("type not match");
    }

    const hdKey = CryptoHDKey.fromCBOR(ur.cbor);

    return parseCryptoHDKey(hdKey);
}

export function parseCryptoHDKey(hdKey: CryptoHDKey): Record<string, any> {
    const chainCode = hdKey.chainCode ? toHex(hdKey.chainCode) : undefined;
    const parentFingerprint = hdKey.parentFingerprint ? toHex(hdKey.parentFingerprint) : undefined;
    const origin = hdKey.origin;

    if (!origin?.getSourceFingerprint()) {
        throw new Error("HDKey is invalid");
    }
    const xfp = toHex(origin.getSourceFingerprint() ?? Buffer.alloc(0));

    let extendedPublicKey: string | undefined;
    if (chainCode && parentFingerprint) {
        extendedPublicKey = hdKey.getBip32Key();
    }

    const coinType = origin.getComponents()[1]?.getIndex() ?? 0;
    return {
        chain: getChainConfByCoinType(coinType)?.symbol,
        path: `m/${origin.getPath()}`,
        publicKey: toHex(hdKey.keyData!),
        name: hdKey.name,
        xfp: xfp,
        chainCode: chainCode,
        extendedPublicKey: extendedPublicKey,
        note: hdKey.note,
    };

}