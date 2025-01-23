import { UR } from "@ngraveio/bc-ur";
import { GsWalletAlphSDK } from "../../src";
import { fromHex, toHex } from "../../src/utils/format";
import { GsplDataType } from "../../src/registry/CryptoGspl";

describe('Alph', () => {
  test('Alph generateSignRequest', () => {
    const ur = GsWalletAlphSDK.generateSignRequest({
      uuid: "cf75aef0-8d24-11ef-90ac-6dae386eaee6",
      hexData: "00000080004e20c1174876e80001a883fcf30592c310ce05ec7021ca3514a830dd3b6b73641f34c977146ba73b66abc447120002f27628958e3daf580e8e4fe120e1ded5761ea6b035d865a540726de65f08555a02c378cad1e25d0000000624efe13e0e7a9522c289253619a07da7787681d9d76031d9374333202469f100000000000000000000c40a68372bfb836000000624efe13e0e7a9522c289253619a07da7787681d9d76031d9374333202469f100000000000000000000",
      dataType: GsplDataType.transaction,
      path: "m/44'/1234'/0'/0/0",
      outputs: [
        {
          "address": "1Qz7am3MSYoiZuPhYBJfaSrC46HaHwnbt62ycFNbK9DA",
          "amount": "0034000000000000000"
        }
      ],
      xfp: "27c3831f",
      origin: "gswallet"
    });

    expect(toHex(ur.cbor)).toBe("a501d82550cf75aef08d2411ef90ac6dae386eaee60258bc00000080004e20c1174876e80001a883fcf30592c310ce05ec7021ca3514a830dd3b6b73641f34c977146ba73b66abc447120002f27628958e3daf580e8e4fe120e1ded5761ea6b035d865a540726de65f08555a02c378cad1e25d0000000624efe13e0e7a9522c289253619a07da7787681d9d76031d9374333202469f100000000000000000000c40a68372bfb836000000624efe13e0e7a9522c289253619a07da7787681d9d76031d9374333202469f10000000000000000000003d99d70a2018a182cf51904d2f500f500f400f4021a1f83c3270481d917e0a2024778cad1e25d000001782c31517a37616d334d53596f695a75506859424a66615372433436486148776e627436327963464e624b3944410568677377616c6c6574");
  });

  test('Alph parseSignature', ()  => {
    const cbor = "a301d82550cf75aef08d2411ef90ac6dae386eaee6025840e4a25c45dd255e6f5ea25b5980299f33345d3f75b5b353959d183900610fe11f5160c972d14d4d1ed23a560d8f51deddbd8cf28b5869be76961b299c1e383f850368475357414c4c4554";
    const ur = new UR(fromHex(cbor), "alph-signature");
    const alphSigned = GsWalletAlphSDK.parseSignature(ur);
console.log(alphSigned);
    expect(alphSigned).toEqual({
      "uuid": [207,117,174,240,141,36,17,239,144,172,109,174,56,110,174,230],
      "signature": [228,162,92,69,221,37,94,111,94,162,91,89,128,41,159,51,52,93,63,117,181,179,83,149,157,24,57,0,97,15,225,31,81,96,201,114,209,77,77,30,210,58,86,13,143,81,222,221,189,140,242,139,88,105,190,118,150,27,41,156,30,56,63,133],
      "origin": "GSWALLET"
    });
  });
});