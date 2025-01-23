"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataItem = void 0;
class DataItem {
    constructor(data, tag) {
        this.setTag = (tag) => {
            this.tag = tag;
        };
        this.clearTag = () => {
            this.tag = undefined;
        };
        this.getTag = () => {
            return this.tag;
        };
        this.getData = () => {
            return this.data;
        };
        this.data = data;
        this.tag = tag;
    }
}
exports.DataItem = DataItem;
// encode: function (data, format) {
//   for (var i = 0; i < writerFunctions.length; i++) {
//     var func = writerFunctions[i];
//     var writer = func(format);
//     if (writer) {
//       encodeWriter(data, writer);
//       return writer.result();
//     }
//   }
//   throw new Error('Unsupported output format: ' + format);
// },
// // DataItem: {getData: () => any}
// encodeDataItem: function (data, format) {
//   for (var i = 0; i < writerFunctions.length; i++) {
//     var func = writerFunctions[i];
//     var writer = func(format);
//     if (writer) {
//       if (data.getTag() !== undefined) {
//         encodeWriter(data, writer);
//         return writer.result();
//       } else {
//         encodeWriter(data.getData(), writer);
//         return writer.result();
//       }
//     }
//   }
// export function cborSetTags(data: any, tags: number): any {
//   cbor.addSemanticEncode(tags, (data: any) => {
//     if (data instanceof Map) {
//       return Array.from(data);
//     }
//     return data;
//   })
//   return cbor.encode(data);
// }
// export function cborDecodeTags(data: any, tags: number): any {
//   cbor.addSemanticDecode(tags, function (data) {
//     if (data instanceof Map) {
//       return new Map(data)
//     }
//     return data;
//   })
//   return cbor.decode(data);
// }
//# sourceMappingURL=DataItem.js.map