import { RegistryTypes, ExtendedRegistryTypes } from "./registry/RegistryType";
import { patchTags } from "./cbor/utils";


export const registryTags = Object.values(RegistryTypes)
    .filter((r) => !!r.getTag())
    .map((r) => r.getTag());
const extentedRegistryTags = Object.values(ExtendedRegistryTypes).map((R) =>
    R.getTag(),
);
patchTags(registryTags.concat(extentedRegistryTags) as number[]);

export const initializeTags = () => {
    console.log("Initializing registry tags...");
    const registryTags = Object.values(RegistryTypes)
        .filter((r) => !!r.getTag())
        .map((r) => r.getTag());
    const extendedRegistryTags = Object.values(ExtendedRegistryTypes).map((R) =>
        R.getTag(),
    );
    patchTags(registryTags.concat(extendedRegistryTags) as number[]);
    console.log("Initialized tags:", registryTags.concat(extendedRegistryTags));
};
