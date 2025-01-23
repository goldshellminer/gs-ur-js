"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GsVerifyResponse = exports.GsVerifyResponseKeys = void 0;
const cbor_1 = require("../../cbor");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
var GsVerifyResponseKeys;
(function (GsVerifyResponseKeys) {
    GsVerifyResponseKeys[GsVerifyResponseKeys["deviceid"] = 1] = "deviceid";
    GsVerifyResponseKeys[GsVerifyResponseKeys["validation"] = 2] = "validation";
    GsVerifyResponseKeys[GsVerifyResponseKeys["origin"] = 3] = "origin";
})(GsVerifyResponseKeys || (exports.GsVerifyResponseKeys = GsVerifyResponseKeys = {}));
class GsVerifyResponse extends RegistryItem_1.RegistryItem {
    constructor(deviceid, validation, origin) {
        super();
        this.deviceid = deviceid;
        this.validation = validation;
        this.origin = origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.GS_VERIFY_RESPONSE;
    }
    getDeviceid() {
        return this.deviceid;
    }
    getValidation() {
        return this.validation;
    }
    getOrigin() {
        return this.origin;
    }
    toDataItem() {
        const map = {};
        map[GsVerifyResponseKeys.deviceid] = this.deviceid;
        map[GsVerifyResponseKeys.validation] = this.validation;
        if (this.origin !== undefined) {
            map[GsVerifyResponseKeys.origin] = this.origin;
        }
        return new cbor_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const deviceid = map[GsVerifyResponseKeys.deviceid.toString()];
        const validation = map[GsVerifyResponseKeys.validation.toString()];
        const origin = map[GsVerifyResponseKeys.origin.toString()];
        return new GsVerifyResponse(deviceid, validation, origin);
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, cbor_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.GsVerifyResponse = GsVerifyResponse;
//# sourceMappingURL=GsVerifyResponse.js.map