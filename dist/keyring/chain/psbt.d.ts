import { UR } from "@ngraveio/bc-ur";
export declare class GsWalletPsbtSDK {
    static parseSignature(ur: UR): Record<string, any>;
    static generateSignRequest({ uuid, psbt, path, xfp, origin, }: {
        uuid: string;
        psbt: string;
        path: string;
        xfp: string;
        origin?: string;
    }): UR;
    static parseInscribeSignature(ur: UR): Record<string, any>;
    static generateInscribeRequest({ uuid, commitData, revealData, origin, }: {
        uuid?: string;
        commitData: string;
        revealData: string;
        origin?: string;
    }): UR;
}
