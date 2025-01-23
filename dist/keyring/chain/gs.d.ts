import { UR } from "@ngraveio/bc-ur";
export declare class GsWalletChainSDK {
    static parseSignature(ur: UR): Record<string, any>;
    static generateSignRequest({ uuid, signData, path, chain, xfp, origin, }: {
        uuid?: string;
        signData: string;
        path: string;
        chain: string;
        xfp: string;
        origin?: string;
    }): UR;
}
