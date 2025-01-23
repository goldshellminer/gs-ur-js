import { UR } from "@ngraveio/bc-ur";
import { EthDataType } from "../../registry/eth/EthSignRequest";
export declare class GsWalletEthereumSDK {
    static parseSignature(ur: UR): Record<string, any>;
    static generateSignRequest({ uuid, signData, dataType, path, xfp, chainId, address, origin, }: {
        uuid: string;
        signData: string;
        dataType: EthDataType;
        path: string;
        xfp: string;
        chainId: number;
        address?: string;
        origin?: string;
    }): UR;
}
