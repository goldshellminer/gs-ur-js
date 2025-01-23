import { UR, UREncoder } from '@ngraveio/bc-ur';
import { RegistryType } from './RegistryType';
import { encodeDataItem, DataItem } from '../cbor/index';

export abstract class RegistryItem {
  abstract getRegistryType(): RegistryType;
  abstract toDataItem(): DataItem;

  toCBOR(): Buffer {
    if (this.toDataItem() === undefined) {
      throw new Error(`# [ur-registry][RegistryItem][fn.toCBOR]: registry ${this.getRegistryType()}'s method toDataItem returns undefined`);
    }
    return encodeDataItem(this.toDataItem());
  }

  toUR(): UR {
    return new UR(this.toCBOR(), this.getRegistryType().getType());
  }

  toUREncoder(
    maxFragmentLength?: number,
    firstSeqNum?: number,
    minFragmentLength?: number,
  ): UREncoder {
    const ur = this.toUR();
    return new UREncoder(
      ur,
      maxFragmentLength,
      firstSeqNum,
      minFragmentLength,
    );
  }
}

