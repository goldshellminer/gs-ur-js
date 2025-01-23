import { CryptoCoinInfo, CryptoKeypath, PathComponent, CryptoHDKey, DataItem, encodeDataItem } from '../../src';

describe('CoinInfo', () => {
  it('test construct public test', () => {
    const hex =
      'A5035821026FE2355745BB2DB3630BBC80EF5D58951C963C841F54170BA6E5C12BE7FC12A6045820CED155C72456255881793514EDC5BD9447E7F74ABB88C6D6B6480FD016EE8C8505D90131A1020106D90130A1018A182CF501F501F500F401F4081AE9181CF3';
    const coinInfo = new CryptoCoinInfo(
      undefined,
      2,
    );
    const originkeypath = new CryptoKeypath([
      new PathComponent( 44,true ),
      new PathComponent( 1,true ),
      new PathComponent( 1,true ),
      new PathComponent( 0,false ),
      new PathComponent( 1,false ),
    ]);
    const cryptoHDKey = new CryptoHDKey({
      isMaster: false,
      keyData: Buffer.from(
        '026fe2355745bb2db3630bbc80ef5d58951c963c841f54170ba6e5c12be7fc12a6',
        'hex',
      ),
      chainCode: Buffer.from(
        'ced155c72456255881793514edc5bd9447e7f74abb88c6d6b6480fd016ee8c85',
        'hex',
      ),
      useInfo: coinInfo,
      parentFingerprint: Buffer.from('e9181cf3', 'hex'),
      origin: originkeypath,
    });

    expect(cryptoHDKey.toCBOR().toString('hex')).toBe(hex.toLowerCase());
    const ur = cryptoHDKey.toUREncoder(1000).nextPart();
    expect(ur).toBe(
      'ur:crypto-hdkey/onaxhdclaojlvoechgferkdpqdiabdrflawshlhdmdcemtfnlrctghchbdolvwsednvdztbgolaahdcxtottgostdkhfdahdlykkecbbweskrymwflvdylgerkloswtbrpfdbsticmwylklpahtaadehoyaoadamtaaddyoyadlecsdwykadykadykaewkadwkaycywlcscewfihbdaehn',
    );
  });
});


