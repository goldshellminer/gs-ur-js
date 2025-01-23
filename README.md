# gs-ur-js

This repository contains the JavaScript SDK for interacting with Goldshell's GSWallet. GSWallet is a hardware wallet that securely transmits information via QR codes.  This SDK allows developers to integrate GSWallet functionality into their applications.

## Features

* **Secure QR Code Communication:** Enables secure communication with GSWallet using QR codes.
* **Multi-Currency Support:**  Supports various cryptocurrencies (currently under development, examples below show BTC and ETH).
* **Transaction Signing:**  Allows parsing signature of transactions from the GSWallet device.

## Getting Started

These instructions will guide you through setting up and using the `gs-ur-js` SDK.


### Prerequisites

* Node.js and npm (or yarn or pnpm) installed.


### Installation

Choose your preferred package manager:

```bash
// Using npm:
npm install gs-ur-js

// Using yarn:
yarn add gs-ur-js

// Using pnpm:
pnpm add gs-ur-js
```

### Example 

#### Bitcoin (BTC) Transaction

```js
import { useState } from "react";
import { GsWalletPsbtSDK } from "gs-ur-js";
import { AnimatedQRCode, AnimatedQRScanner, URType } from "@keystonehq/animated-qr";

const btcSignRequest01 = {
    uuid: uuid,
    psbt: '70736274ff0100d202000000034363e7be5a985692abfab3dfd8b3e4af89eb39a0bfc44271cb208a3917ca28130100000000ffffffff1e5271a99a0488a26aa32378871b6e74f6cf8c9e89bcd77f8b8c037371576cba0000000000ffffffffb71f67bc5a9053e5b69a545a873dceed31aa9c601a87e8ed2579f41dbd9932a40000000000ffffffff023b7c00000000000022512095aff4da1c10e41953deacc322064aab1781c2dcfac1fc72bc9680402b7ab10bcb050000000000001976a914d249c3f3ceda6d5ef5802246fa63ed6270eb215488ac00000000000100eb02000000011e5271a99a0488a26aa32378871b6e74f6cf8c9e89bcd77f8b8c037371576cba010000006b483045022100d403d8b6710f317dfb5f53dcca95ced8fc187da128bb70c73cac3bb2116ece11022061009006d6aaed77fa594f06a8e5a14d13c67edc729cb97ef7862125dd64317a012102829e0f55c984e9b015c6d44bc2ac947d70f514d118bb3ad8995280c597b57ef0ffffffff02e54400000000000022512095aff4da1c10e41953deacc322064aab1781c2dcfac1fc72bc9680402b7ab10be37e0000000000001976a914d249c3f3ceda6d5ef5802246fa63ed6270eb215488ac00000000000100fd090202000000032a4ee007fbac92b4f36c23c165eedf27077a5a580a0712dca04fa7d905cc61d3010000006a473044022069c946bf923a78e45910af68e3ad972329f782fb5c1ef42bb476e9320eb8da8e02207ea237b7201e137d3690888f8d0a828de580c0b02e7024477bf23d6a79fd3c95012102829e0f55c984e9b015c6d44bc2ac947d70f514d118bb3ad8995280c597b57ef0ffffffff2a4ee007fbac92b4f36c23c165eedf27077a5a580a0712dca04fa7d905cc61d3000000006b483045022100c177624b81e39e59a579a7f1d152b6d03330c2a6c6ba63dae351ff407673e13a02205e47d885f3a2d684915bcaf852eded66b770de6a5738bbd458b6a3bfbde1a3c2012102829e0f55c984e9b015c6d44bc2ac947d70f514d118bb3ad8995280c597b57ef0ffffffff19c6ba3a930b3b1c0c7309a85ef41067768d3eee18c271169e65ef3985d55e1f020000006b483045022100c18d4da1ffe13f48ec5f233e4a6d051ef81d63a5a521032c5c359404ff80d37102202a1a02dac5ff5bd9fb81bcc5c8f7a86c4c11b52d4919a293f00717b147573e18012102829e0f55c984e9b015c6d44bc2ac947d70f514d118bb3ad8995280c597b57ef0ffffffff02d0070000000000001976a914d249c3f3ceda6d5ef5802246fa63ed6270eb215488acd3d40000000000001976a914d249c3f3ceda6d5ef5802246fa63ed6270eb215488ac00000000000100c4020000000001014363e7be5a985692abfab3dfd8b3e4af89eb39a0bfc44271cb208a3917ca28130000000000ffffffff0288130000000000001976a914d249c3f3ceda6d5ef5802246fa63ed6270eb215488ac571e00000000000022512095aff4da1c10e41953deacc322064aab1781c2dcfac1fc72bc9680402b7ab10b0140381e35baf41df0e6276a4cb278890804b9a4aac9e4c870d2a42b2adcbe69a7cf0dfa1f5c486d4c89d352187ec104276e16f65347e1ba789d596c713a14cff7e900000000000000',
    path: "m/44'/0'/0'/0/0",
    xfp: '27c3831f',
    origin: "GsWallet",
};

export const BitcoinLegacy = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [psbtSignedData, setpsbtSignedData] = useState(null);

  const ur = GsWalletPsbtSDK.generateSignRequest(btcSignRequest);
  console.log("ur.cbor.toString(hex): ", ur.cbor.toString("hex"));

  const onSucceed = ({ type, cbor }) => {
    const psbtSignature = GsWalletPsbtSDK.parseSignature(new UR(Buffer.from(cbor, "hex"), type))
    console.log("psbt: ", psbtSignature);
    setpsbtSignedData(psbtSignature);
    setIsScanning(false);
  }

  const onError = (errorMessage) => {
    console.log("error: ", errorMessage);
    setpsbtSignedData(null);
    setIsScanning(false);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}> {/* Use flexbox for layout */}
      {isScanning ? (
        <AnimatedQRScanner
          handleScan={onSucceed}
          handleError={onError}
          urTypes={[URType.CryptoPSBT]}
          options={{ width: 400, height: 300 }}
        />
      ) : (
        <>
          <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")} />
          <button style={{ marginLeft: '20px' }} onClick={() => setIsScanning(true)}>Scan GsWallet</button>
          {psbtSignedData && ( // Conditionally render the box
            <div>
              <h3>psbtSigned Data:</h3>
              <pre>{psbtSignedData}</pre> {/* Display psbtSigned directly */}
            </div>
          )}
          {psbtSignedData === null && <div style={{ marginLeft: '40px' }}>Waiting for scan...</div>}
        </>
      )}
    </div>
  );
}
```

#### Ethereum (ETH) Transaction

```js
import {useState} from "react";
import { UR } from "@ngraveio/bc-ur";
import {GsWalletEthereumSDK } from "gs-ur-js"
import {AnimatedQRCode, AnimatedQRScanner, URType} from "@keystonehq/animated-qr"

const ethSignRequest = {
    txParams: txParams01,
    uuid: uuid,
    signData: '02F2010584055D4A8585098B25B31F825208945BBF79B36DAD45334E6BE9EB57B2166FCB46172287071AFD498D000080C0C0C0C0',
    dataType: EthDataType.typedTransaction,
    path: "m/44'/60'/0'/0/0",
    chainId: 1,
    xfp: '27c3831f',
    fee: 0,
    origin: "GsWalconst",
};

export const Ethereum = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [ethSignedData, setethSignedData] = useState(null);

    const ur = GsWalletEthereumSDK.generateSignRequest(ethSignRequest);
    console.log("ur.type: ", ur.type);
    console.log("ur.cbor.toString(hex): ", ur.cbor.toString("hex"));

    const onSucceed = ({type, cbor}) => {
        const ethSigned = GsWalletEthereumSDK.parseSignature(new UR(Buffer.from(cbor, "hex"), type))
        console.log("signature: ", ethSigned);
        setethSignedData(ethSigned); 
        setIsScanning(false);
    }

    const onError = (errorMessage) => {
        console.log("error: ",errorMessage);
        setethSignedData(null);
        setIsScanning(false);
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}> {/* Use flexbox for layout */}
        {isScanning
            ? <AnimatedQRScanner
                handleScan={onSucceed}
                handleError={onError}
                urTypes={[URType.ETH_SIGNATURE]}
                options={{
                    width: 400,
                    height: 300
                }}
            />
            : (
                <>
                    <AnimatedQRCode
                        type={ur.type}
                        cbor={ur.cbor.toString("hex")}
                    />
                    <button  style={{marginLeft: '20px'}} onClick={() => setIsScanning(true)}>Scan GsWallet</button>
              {ethSignedData && ( // Conditionally render the box
                <div>
                  <h3>ethSigned Data:</h3>
                  <pre>{ethSignedData}</pre> {/* Display ethSigned directly */}
                </div>
              )}
              {ethSignedData === null && <div style={{marginLeft: '40px'}}>Waiting for scan...</div>}
            </>
          )}
        </div>
      );
}

```