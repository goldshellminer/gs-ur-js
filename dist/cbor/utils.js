"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchTags = void 0;
const cbor_1 = require("../cbor");
const alreadyPatchedTag = [];
const patchTags = (tags) => {
    tags.forEach((tag) => {
        if (alreadyPatchedTag.find((i) => i === tag))
            return;
        (0, cbor_1.addSemanticEncode)(tag, (data) => {
            if (data instanceof cbor_1.DataItem) {
                if (data.getTag() === tag) {
                    return data.getData();
                }
            }
        });
        (0, cbor_1.addSemanticDecode)(tag, (data) => {
            return new cbor_1.DataItem(data, tag);
        });
        alreadyPatchedTag.push(tag);
    });
};
exports.patchTags = patchTags;
//# sourceMappingURL=utils.js.map