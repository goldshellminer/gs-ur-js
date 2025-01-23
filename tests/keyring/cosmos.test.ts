import { UR } from "@ngraveio/bc-ur";
import { GsWalletCosmosSDK } from "../../src";
import { fromHex, toHex } from "../../src/utils/format";

describe('atom', () => {
  it('atom generateSignRequest', () => {
    const ur: UR = GsWalletCosmosSDK.generateSignRequest({
      uuid: "cf727aa0-8d24-11ef-90ac-6dae386eaee6",
      signData: "0aa1010a8f010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e64126f0a2d636f736d6f7331373074666d7a3463323375336177746637346b6535746e676b656d6a6d3561617236376c6d70122d636f736d6f7331373074666d7a3463323375336177746637346b6535746e676b656d6a6d3561617236376c6d701a0f0a057561746f6d1206393738383030120d687562205468652067686f737412670a500a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a21030edaa670d688c4ab1c9a8272c88fe62ec15be8c08903c43929e7be666c44953612040a020801180112130a0d0a057561746f6d12043139333610efdc041a0b636f736d6f736875622d3420d7917d",
      path: "m/44'/118'/0'/0/0",
      xfp: "27c3831f",
      chain: "Cosmos_Hub",
      origin: undefined,
      fee: 2000,
    });

    expect(toHex(ur.cbor)).toBe("a501d82550cf727aa08d2411ef90ac6dae386eaee60259011e0aa1010a8f010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e64126f0a2d636f736d6f7331373074666d7a3463323375336177746637346b6535746e676b656d6a6d3561617236376c6d70122d636f736d6f7331373074666d7a3463323375336177746637346b6535746e676b656d6a6d3561617236376c6d701a0f0a057561746f6d1206393738383030120d687562205468652067686f737412670a500a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a21030edaa670d688c4ab1c9a8272c88fe62ec15be8c08903c43929e7be666c44953612040a020801180112130a0d0a057561746f6d12043139333610efdc041a0b636f736d6f736875622d3420d7917d03d99d70a2018a182cf51876f500f500f400f4021a1f83c327046a436f736d6f735f487562061907d0");
  });

  it('atom parseSignature', () => {
    const cbor = "a301d82550cf727aa08d2411ef90ac6dae386eaee6025840e6de945a91c14458b6a21fff2f3035882379e1da281ae1894d81fa525ab7b0e015ae216c7fe528d669a5b303aa3a61e79f0b9f54b18aa2739dfd8fc6988c8f100368475357414c4c4554";
    const ur: UR = new UR(fromHex(cbor), "cosmos-signature");
    const atomSigned = GsWalletCosmosSDK.parseSignature(ur);

    expect(atomSigned).toBe({
      uuid: [207, 114, 122, 160, 141, 36, 17, 239, 144, 172, 109, 174, 56, 110, 174, 230],
      signature: "e6de945a91c14458b6a21fff2f3035882379e1da281ae1894d81fa525ab7b0e015ae216c7fe528d669a5b303aa3a61e79f0b9f54b18aa2739dfd8fc6988c8f10",
      origin: "GSWALLET"
    });
  });
});
