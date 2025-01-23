"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PsbtSignRequest = void 0;
const index_1 = require("../../cbor/index");
const CryptoKeyPath_1 = require("../CryptoKeyPath");
const RegistryItem_1 = require("../RegistryItem");
const RegistryType_1 = require("../RegistryType");
const format_1 = require("../../utils/format");
const uuid_1 = require("../../utils/uuid");
var PsbtSignRequestKeys;
(function (PsbtSignRequestKeys) {
    PsbtSignRequestKeys[PsbtSignRequestKeys["uuid"] = 1] = "uuid";
    PsbtSignRequestKeys[PsbtSignRequestKeys["psbt"] = 2] = "psbt";
    PsbtSignRequestKeys[PsbtSignRequestKeys["derivationPath"] = 3] = "derivationPath";
    PsbtSignRequestKeys[PsbtSignRequestKeys["origin"] = 4] = "origin";
})(PsbtSignRequestKeys || (PsbtSignRequestKeys = {}));
class PsbtSignRequest extends RegistryItem_1.RegistryItem {
    constructor(params) {
        super();
        this.uuid = params.uuid;
        this.psbt = params.psbt;
        this.derivationPath = params.derivationPath;
        this.origin = params.origin;
    }
    getRegistryType() {
        return RegistryType_1.ExtendedRegistryTypes.PSBT_SIGN_REQUEST;
    }
    getRequestId() {
        if (!this.uuid) {
            this.uuid = (0, uuid_1.generateUuid)();
        }
        return this.uuid;
    }
    getSignData() {
        return this.psbt;
    }
    getPath() {
        return this.derivationPath;
    }
    getOrigin() {
        return this.origin;
    }
    toDataItem() {
        const map = {};
        map[PsbtSignRequestKeys.uuid] = new index_1.DataItem(this.getRequestId(), RegistryType_1.RegistryTypes.UUID.getTag());
        map[PsbtSignRequestKeys.psbt] = new index_1.DataItem(this.psbt, RegistryType_1.RegistryTypes.CRYPTO_PSBT.getTag());
        if (this.derivationPath) {
            const derivationPathDataItem = this.derivationPath.toDataItem();
            derivationPathDataItem.setTag(this.derivationPath.getRegistryType().getTag());
            map[PsbtSignRequestKeys.derivationPath] = derivationPathDataItem;
        }
        if (this.origin) {
            map[PsbtSignRequestKeys.origin] = this.origin;
        }
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const psbt = (0, format_1.fromHex)(map[PsbtSignRequestKeys.psbt.toString()]);
        const uuid = map[PsbtSignRequestKeys.uuid.toString()] ? (0, format_1.fromHex)(map[PsbtSignRequestKeys.uuid.toString()]) : undefined;
        const derivationPath = map[PsbtSignRequestKeys.derivationPath.toString()]
            ? CryptoKeyPath_1.CryptoKeypath.fromDataItem(map[PsbtSignRequestKeys.derivationPath.toString()])
            : undefined;
        const origin = map[PsbtSignRequestKeys.origin.toString()];
        return new PsbtSignRequest({
            uuid: uuid,
            psbt: psbt,
            derivationPath: derivationPath,
            origin: origin,
        });
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.PsbtSignRequest = PsbtSignRequest;
//# sourceMappingURL=PsbtSignRequest.js.map