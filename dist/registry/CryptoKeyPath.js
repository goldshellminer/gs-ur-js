"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoKeypath = exports.PathComponent = void 0;
const index_1 = require("../cbor/index");
const RegistryItem_1 = require("./RegistryItem");
const RegistryType_1 = require("./RegistryType");
var KeyPathKeys;
(function (KeyPathKeys) {
    KeyPathKeys[KeyPathKeys["components"] = 1] = "components";
    KeyPathKeys[KeyPathKeys["sourceFingerprint"] = 2] = "sourceFingerprint";
    KeyPathKeys[KeyPathKeys["depth"] = 3] = "depth";
})(KeyPathKeys || (KeyPathKeys = {}));
class PathComponent {
    constructor(index, hardened = false) {
        this.index = index;
        this.hardened = hardened;
        this.wildcard = index === undefined;
        if (index !== undefined && (index & PathComponent.HARDENED_BIT) !== 0) {
            throw new Error(`Invalid index ${index} - most significant bit cannot be set`);
        }
    }
    getIndex() {
        return this.index;
    }
    isWildcard() {
        return this.wildcard;
    }
    isHardened() {
        return this.hardened;
    }
}
exports.PathComponent = PathComponent;
PathComponent.HARDENED_BIT = 0x80000000;
class CryptoKeypath extends RegistryItem_1.RegistryItem {
    constructor(components = [], sourceFingerprint, depth) {
        super();
        this.components = components;
        this.sourceFingerprint = sourceFingerprint;
        this.depth = depth;
    }
    getRegistryType() {
        return RegistryType_1.RegistryTypes.CRYPTO_KEYPATH;
    }
    getPath() {
        if (this.components.length === 0) {
            return null;
        }
        const pathComponents = this.components.map(component => {
            return `${component.isWildcard() ? '*' : component.getIndex()}${component.isHardened() ? "'" : ''}`;
        }).join('/');
        return pathComponents;
    }
    getComponents() {
        return this.components;
    }
    getSourceFingerprint() {
        return this.sourceFingerprint;
    }
    getDepth() {
        return this.depth;
    }
    toDataItem() {
        const map = {};
        const componentsData = [];
        for (let component of this.components) {
            if (component.isWildcard()) {
                componentsData.push([]);
            }
            else {
                componentsData.push(component.getIndex());
            }
            componentsData.push(component.isHardened());
        }
        map[KeyPathKeys.components] = componentsData;
        if (this.sourceFingerprint) {
            map[KeyPathKeys.sourceFingerprint] = new DataView(this.sourceFingerprint.buffer).getUint32(0, true);
        }
        if (this.depth !== undefined) {
            map[KeyPathKeys.depth] = this.depth;
        }
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (map == null) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const pathComponents = [];
        const components = map[KeyPathKeys.components];
        for (let i = 0; i < components.length; i += 2) {
            const isHardened = components[i + 1];
            const path = components[i];
            if (typeof path === 'number') {
                pathComponents.push(new PathComponent(path, isHardened));
            }
            else {
                pathComponents.push(new PathComponent(undefined, isHardened));
            }
        }
        const sourceFingerprintData = map[KeyPathKeys.sourceFingerprint];
        let sourceFingerprint;
        if (sourceFingerprintData !== undefined) {
            sourceFingerprint = Buffer.alloc(4);
            new DataView(sourceFingerprint.buffer).setUint32(0, sourceFingerprintData, true);
        }
        const depth = map[KeyPathKeys.depth];
        return new CryptoKeypath(pathComponents, sourceFingerprint, depth);
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload);
        return this.fromDataItem(dataItem);
    }
}
exports.CryptoKeypath = CryptoKeypath;
//# sourceMappingURL=CryptoKeyPath.js.map