"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoCoinInfo = exports.Network = void 0;
const index_1 = require("../cbor/index");
const RegistryType_1 = require("./RegistryType");
const RegistryItem_1 = require("./RegistryItem");
const chainList_1 = require("../chain/chainList");
var CoinInfoKeys;
(function (CoinInfoKeys) {
    CoinInfoKeys[CoinInfoKeys["type"] = 1] = "type";
    CoinInfoKeys[CoinInfoKeys["network"] = 2] = "network";
})(CoinInfoKeys || (CoinInfoKeys = {}));
var Network;
(function (Network) {
    Network[Network["mainnet"] = 1] = "mainnet";
    Network[Network["testnet"] = 2] = "testnet";
})(Network || (exports.Network = Network = {}));
class CryptoCoinInfo extends RegistryItem_1.RegistryItem {
    constructor(type, network) {
        super();
        this.type = type;
        this.network = network;
    }
    getRegistryType() {
        return RegistryType_1.RegistryTypes.CRYPTO_COIN_INFO;
    }
    getType() {
        return this.type ?? 0;
    }
    getNetwork() {
        return this.network ?? Network.mainnet;
    }
    chainConf() {
        return (0, chainList_1.getChainConfByChainId)(this.type ?? 0);
    }
    toDataItem() {
        const map = {};
        if (this.type !== undefined) {
            map[CoinInfoKeys.type] = this.type;
        }
        if (this.network !== undefined) {
            map[CoinInfoKeys.network] = this.network;
        }
        return new index_1.DataItem(map);
    }
    static fromDataItem(dataItem) {
        const map = dataItem.getData();
        if (!map) {
            throw new Error("Param for fromDataItem is neither String nor Map, please check it!");
        }
        const type = map[CoinInfoKeys.type];
        const network = map[CoinInfoKeys.network];
        return new CryptoCoinInfo(type, network);
    }
    static fromCBOR(cborPayload) {
        const dataItem = (0, index_1.decodeToDataItem)(cborPayload); // 使用 CBOR 解码
        return this.fromDataItem(dataItem);
    }
}
exports.CryptoCoinInfo = CryptoCoinInfo;
//# sourceMappingURL=CryptoCoinInfo.js.map