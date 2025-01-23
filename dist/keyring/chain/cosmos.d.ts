import { UR } from "@ngraveio/bc-ur";
export declare class GsWalletCosmosSDK {
    static parseSignature(ur: UR): Record<string, any>;
    static generateSignRequest({ uuid, signData, path, chain, xfp, origin, fee, }: {
        uuid: string;
        signData: string;
        path: string;
        chain: string;
        xfp: string;
        origin?: string;
        fee?: number;
    }): UR;
}
