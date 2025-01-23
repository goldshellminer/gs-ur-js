"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsVerifyRequest = exports.GsVerifyRequestKeys = void 0;
const cbor_1 = require("../../cbor");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
var GsVerifyRequestKeys;
(function (GsVerifyRequestKeys) {
    GsVerifyRequestKeys[GsVerifyRequestKeys["puzzle"] = 1] = "puzzle";
})(GsVerifyRequestKeys || (exports.GsVerifyRequestKeys = GsVerifyRequestKeys = {}));
class GsVerifyRequest extends RegistryItem_1.RegistryItem {
    constructor(puzzle) {
        super();
        this.puzzle = puzzle;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.GS_VERIFY_REQUEST;
    }
    getPuzzle() {
        return this.puzzle;
    }
    toDataItem() {
        const map = {};
        map[GsVerifyRequestKeys.puzzle] = this.puzzle;
        return new cbor_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const puzzle = map[GsVerifyRequestKeys.puzzle.toString()];
        return new GsVerifyRequest(puzzle);
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, cbor_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.GsVerifyRequest = GsVerifyRequest;
//# sourceMappingURL=GsVerifyRequest.js.map