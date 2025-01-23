import { UR } from "@ngraveio/bc-ur";
export declare class GsWalletTronSDK {
    static parseSignature(ur: UR): Record<string, any>;
    static generateSignRequest({ uuid, signData, path, fee, xfp, origin, }: {
        uuid: string;
        signData: string;
        path: string;
        fee?: number;
        xfp: string;
        origin?: string;
    }): UR;
}
