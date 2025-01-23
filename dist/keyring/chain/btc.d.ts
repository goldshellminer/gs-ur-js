import { UR } from "@ngraveio/bc-ur";
import { GsplDataType } from "../../registry/CryptoGspl";
export declare class GsWalletBTCSDK {
    static parseSignature(ur: UR): Record<string, any>;
    static generateSignRequest({ uuid, hexData, dataType, inputs, change, path, xfp, origin, }: {
        uuid: string;
        hexData: string;
        dataType: GsplDataType;
        inputs?: Record<string, any>[];
        change?: Record<string, any>;
        path: string;
        xfp: string;
        origin?: string;
    }): UR;
}
