import { UR } from "@ngraveio/bc-ur";
import { SignType } from "../../registry/sol/SolSignRequest";
export declare class GsWalletSolSDK {
    static parseSignature(ur: UR): Record<string, any>;
    static generateSignRequest({ uuid, signData, signType, path, xfp, outputAddress, contractAddress, origin, fee, }: {
        uuid: string;
        signData: string;
        signType: SignType;
        path: string;
        xfp: string;
        outputAddress?: string;
        contractAddress?: string;
        origin?: string;
        fee?: number;
    }): UR;
}
