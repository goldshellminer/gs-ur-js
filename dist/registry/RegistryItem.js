"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistryItem = void 0;
const bc_ur_1 = require("@ngraveio/bc-ur");
const index_1 = require("../cbor/index");
class RegistryItem {
    toCBOR() {
        if (this.toDataItem() === undefined) {
            throw new Error(`# [ur-registry][RegistryItem][fn.toCBOR]: registry ${this.getRegistryType()}'s method toDataItem returns undefined`);
        }
        return (0, index_1.encodeDataItem)(this.toDataItem());
    }
    toUR() {
        return new bc_ur_1.UR(this.toCBOR(), this.getRegistryType().getType());
    }
    toUREncoder(maxFragmentLength, firstSeqNum, minFragmentLength) {
        const ur = this.toUR();
        return new bc_ur_1.UREncoder(ur, maxFragmentLength, firstSeqNum, minFragmentLength);
    }
}
exports.RegistryItem = RegistryItem;
//# sourceMappingURL=RegistryItem.js.map