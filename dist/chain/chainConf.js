"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxType = exports.Net = exports.EthChainConf = exports.NetConf = exports.ChainConf = void 0;
class ChainConf {
    constructor({ name, coin, symbol, coinType, decimal, minAmount, mainnet, testnet, net = Net.main, blockTime, interval, }) {
        this.net = Net.main;
        this.name = name;
        this.coin = coin;
        this.symbol = symbol;
        this.coinType = coinType;
        this.decimal = decimal;
        this.minAmount = minAmount;
        this.mainnet = mainnet;
        this.testnet = testnet;
        this.net = net;
        this.blockTime = blockTime;
        this.interval = interval;
    }
    setNet(net) {
        this.net = net;
    }
    get netConf() {
        return this.net === Net.main ? this.mainnet : this.testnet;
    }
}
exports.ChainConf = ChainConf;
class NetConf {
    constructor({ networkType, ethChainConf }) {
        this.networkType = networkType;
        this.ethChainConf = ethChainConf;
    }
}
exports.NetConf = NetConf;
class EthChainConf {
    constructor({ id, type, custom = false }) {
        this.id = id;
        this.type = type;
        this.custom = custom;
    }
}
exports.EthChainConf = EthChainConf;
var Net;
(function (Net) {
    Net[Net["main"] = 0] = "main";
    Net[Net["test"] = 1] = "test";
})(Net || (exports.Net = Net = {}));
var TxType;
(function (TxType) {
    TxType[TxType["inscribe"] = 0] = "inscribe";
    TxType[TxType["brc20"] = 1] = "brc20";
    TxType[TxType["taproot"] = 2] = "taproot";
    TxType[TxType["nestedSegWit"] = 3] = "nestedSegWit";
    TxType[TxType["nativeSegWit"] = 4] = "nativeSegWit";
    TxType[TxType["legacy"] = 5] = "legacy";
    TxType[TxType["eip1559"] = 6] = "eip1559";
    TxType[TxType["tron"] = 7] = "tron";
    TxType[TxType["hns"] = 8] = "hns";
    TxType[TxType["btc"] = 9] = "btc";
    TxType[TxType["sol"] = 10] = "sol";
    TxType[TxType["ton"] = 11] = "ton";
    TxType[TxType["atom"] = 12] = "atom";
    TxType[TxType["none"] = 13] = "none";
})(TxType || (exports.TxType = TxType = {}));
//# sourceMappingURL=chainConf.js.map