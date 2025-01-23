import 'dart:typed_data';

import { ChainConf, NetConf } from "../chainConf";

// ignore: constant_identifier_names
const SC_ADDRESS_LENGTH = 32;
// ignore: non_constant_identifier_names
const SC_INDEX = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]);
// ignore: constant_identifier_names
const TIME_LOCK_HASH =
    '5187b7a8021bf4f2c004ea3a54cfece1754f11c7624d2363c7f4cf4fddd1441e';
// ignore: constant_identifier_names
const SIG_HASH =
    'b36010eb285c154a8cd63084acbe7eac0c4d625ab4e1a76e624a8798cb63497b';

export const scConf = new ChainConf({
    name: 'Siacoin',
    coin: 'SC',
    symbol: 'SC',
    coinType: 1991,
    decimal: 8,
    mainnet: new NetConf({
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'bc',
            wif: 128,
            pubKeyHash: 0,
            scriptHash: 5,
            bip32: {
                public: 76067358,
                private: 76066276,
            },
        },
    }),
    testnet: new NetConf({
        networkType: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'bc',
            wif: 128,
            pubKeyHash: 0,
            scriptHash: 5,
            bip32: {
                public: 76067358,
                private: 76066276,
            },
        },
    }),
});