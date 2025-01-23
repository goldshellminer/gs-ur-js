"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeTags = exports.registryTags = void 0;
const RegistryType_1 = require("./registry/RegistryType");
const utils_1 = require("./cbor/utils");
exports.registryTags = Object.values(RegistryType_1.RegistryTypes)
    .filter((r) => !!r.getTag())
    .map((r) => r.getTag());
const extentedRegistryTags = Object.values(RegistryType_1.ExtendedRegistryTypes).map((R) => R.getTag());
(0, utils_1.patchTags)(exports.registryTags.concat(extentedRegistryTags));
const initializeTags = () => {
    console.log("Initializing registry tags...");
    const registryTags = Object.values(RegistryType_1.RegistryTypes)
        .filter((r) => !!r.getTag())
        .map((r) => r.getTag());
    const extendedRegistryTags = Object.values(RegistryType_1.ExtendedRegistryTypes).map((R) => R.getTag());
    (0, utils_1.patchTags)(registryTags.concat(extendedRegistryTags));
    console.log("Initialized tags:", registryTags.concat(extendedRegistryTags));
};
exports.initializeTags = initializeTags;
//# sourceMappingURL=patchCBOR.js.map