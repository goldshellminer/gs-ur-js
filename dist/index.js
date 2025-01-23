"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UR = exports.format = exports.patchTags = exports.URRegistryDecoder = exports.Buffer = exports.extend = exports.PathComponent = exports.CryptoPsbt = exports.CryptoCoinInfoNetwork = exports.CryptoCoinInfo = exports.CryptoKeypath = exports.CryptoHDKey = exports.CryptoGspl = exports.CryptoTxElement = exports.CryptoTxEntity = exports.Bytes = exports.uuidStringify = exports.generateUuidStr = exports.DataItem = void 0;
require("./patchCBOR");
const buffer_1 = require("buffer/");
Object.defineProperty(exports, "Buffer", { enumerable: true, get: function () { return buffer_1.Buffer; } });
const Bytes_1 = require("./registry/Bytes");
Object.defineProperty(exports, "Bytes", { enumerable: true, get: function () { return Bytes_1.Bytes; } });
const CryptoCoinInfo_1 = require("./registry/CryptoCoinInfo");
Object.defineProperty(exports, "CryptoCoinInfo", { enumerable: true, get: function () { return CryptoCoinInfo_1.CryptoCoinInfo; } });
Object.defineProperty(exports, "CryptoCoinInfoNetwork", { enumerable: true, get: function () { return CryptoCoinInfo_1.Network; } });
const CryptoPsbt_1 = require("./registry/CryptoPsbt");
Object.defineProperty(exports, "CryptoPsbt", { enumerable: true, get: function () { return CryptoPsbt_1.CryptoPsbt; } });
const RegistryItem_1 = require("./registry/RegistryItem");
const RegistryType_1 = require("./registry/RegistryType");
const cbor_1 = require("./cbor");
const utils_1 = require("./cbor/utils");
Object.defineProperty(exports, "patchTags", { enumerable: true, get: function () { return utils_1.patchTags; } });
const CryptoKeyPath_1 = require("./registry/CryptoKeyPath");
Object.defineProperty(exports, "CryptoKeypath", { enumerable: true, get: function () { return CryptoKeyPath_1.CryptoKeypath; } });
Object.defineProperty(exports, "PathComponent", { enumerable: true, get: function () { return CryptoKeyPath_1.PathComponent; } });
const CryptoHdKey_1 = require("./registry/CryptoHdKey");
Object.defineProperty(exports, "CryptoHDKey", { enumerable: true, get: function () { return CryptoHdKey_1.CryptoHDKey; } });
const CryptoGspl_1 = require("./registry/CryptoGspl");
Object.defineProperty(exports, "CryptoGspl", { enumerable: true, get: function () { return CryptoGspl_1.CryptoGspl; } });
const CryptoTxElement_1 = require("./registry/CryptoTxElement");
Object.defineProperty(exports, "CryptoTxElement", { enumerable: true, get: function () { return CryptoTxElement_1.CryptoTxElement; } });
const CryptoTxEntity_1 = require("./registry/CryptoTxEntity");
Object.defineProperty(exports, "CryptoTxEntity", { enumerable: true, get: function () { return CryptoTxEntity_1.CryptoTxEntity; } });
const decoder_1 = require("./decoder");
Object.defineProperty(exports, "URRegistryDecoder", { enumerable: true, get: function () { return decoder_1.URRegistryDecoder; } });
var cbor_2 = require("./cbor");
Object.defineProperty(exports, "DataItem", { enumerable: true, get: function () { return cbor_2.DataItem; } });
var uuid_1 = require("./utils/uuid");
Object.defineProperty(exports, "generateUuidStr", { enumerable: true, get: function () { return uuid_1.generateUuidStr; } });
Object.defineProperty(exports, "uuidStringify", { enumerable: true, get: function () { return uuid_1.uuidStringify; } });
const cbor = {
    addReader: cbor_1.addReader,
    addSemanticDecode: cbor_1.addSemanticDecode,
    addSemanticEncode: cbor_1.addSemanticEncode,
    addWriter: cbor_1.addWriter,
    patchTags: utils_1.patchTags,
};
const extend = {
    RegistryType: RegistryType_1.RegistryType,
    RegistryTypes: RegistryType_1.RegistryTypes,
    RegistryItem: RegistryItem_1.RegistryItem,
    ExtendedRegistryTypes: RegistryType_1.ExtendedRegistryTypes,
    decodeToDataItem: cbor_1.decodeToDataItem,
    encodeDataItem: cbor_1.encodeDataItem,
    cbor,
};
exports.extend = extend;
exports.format = __importStar(require("./utils/format"));
var bc_ur_1 = require("@ngraveio/bc-ur");
Object.defineProperty(exports, "UR", { enumerable: true, get: function () { return bc_ur_1.UR; } });
__exportStar(require("./cbor"), exports);
__exportStar(require("./patchCBOR"), exports);
__exportStar(require("./registry/CryptoGspl"), exports);
__exportStar(require("./registry/eth"), exports);
__exportStar(require("./registry/sol/SolSignRequest"), exports);
__exportStar(require("./registry/sol/SolSignature"), exports);
__exportStar(require("./registry/alph/AlphSignRequest"), exports);
__exportStar(require("./registry/alph/AlphSignature"), exports);
__exportStar(require("./registry/btc/BtcSignRequest"), exports);
__exportStar(require("./registry/btc/BtcSignature"), exports);
__exportStar(require("./registry/btc/PsbtSignRequest"), exports);
__exportStar(require("./registry/btc/PsbtSignature"), exports);
__exportStar(require("./registry/btc/BtcInscribeRequest"), exports);
__exportStar(require("./registry/btc/BtcInscribeSignature"), exports);
__exportStar(require("./registry/cosmos/CosmosSignRequest"), exports);
__exportStar(require("./registry/cosmos/CosmosSignature"), exports);
__exportStar(require("./registry/tron/TronSignRequest"), exports);
__exportStar(require("./registry/tron/TronSignature"), exports);
__exportStar(require("./registry/gs-basic-chain/GsSignRequest"), exports);
__exportStar(require("./registry/gs-basic-chain/GsSignature"), exports);
__exportStar(require("./registry/verify/GsVerifyRequest"), exports);
__exportStar(require("./registry/verify/GsVerifyResponse"), exports);
__exportStar(require("./registry/RegistryItem"), exports);
__exportStar(require("./registry/RegistryType"), exports);
__exportStar(require("./keyring/wallet/multiAccount"), exports);
__exportStar(require("./keyring/chain/alph"), exports);
__exportStar(require("./keyring/chain/btc"), exports);
__exportStar(require("./keyring/chain/psbt"), exports);
__exportStar(require("./keyring/chain/cosmos"), exports);
__exportStar(require("./keyring/chain/ethereum"), exports);
__exportStar(require("./keyring/chain/sol"), exports);
__exportStar(require("./keyring/chain/tron"), exports);
//# sourceMappingURL=index.js.map