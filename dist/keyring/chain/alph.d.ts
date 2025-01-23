import { UR } from "@ngraveio/bc-ur";
import { GsplDataType } from "../../registry/CryptoGspl";
export declare class GsWalletAlphSDK {
    static parseSignature(ur: UR): Record<string, any>;
    static generateSignRequest({ uuid, hexData, dataType, outputs, path, xfp, origin, }: {
        uuid: string;
        hexData: string;
        dataType?: GsplDataType;
        outputs?: Record<string, any>[];
        path: string;
        xfp: string;
        origin?: string;
    }): UR;
}
