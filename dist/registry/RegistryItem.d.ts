import { UR, UREncoder } from '@ngraveio/bc-ur';
import { RegistryType } from './RegistryType';
import { DataItem } from '../cbor/index';
export declare abstract class RegistryItem {
    abstract getRegistryType(): RegistryType;
    abstract toDataItem(): DataItem;
    toCBOR(): Buffer;
    toUR(): UR;
    toUREncoder(maxFragmentLength?: number, firstSeqNum?: number, minFragmentLength?: number): UREncoder;
}
