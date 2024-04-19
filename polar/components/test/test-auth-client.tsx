"use client"
import { jwtDecode } from "jwt-decode";
import { Web3 } from "web3";

import {
    encrypt,
    recoverPersonalSignature,
    recoverTypedSignatureLegacy,
    recoverTypedSignature,
    recoverTypedSignature_v4 as recoverTypedSignatureV4,
} from 'eth-sig-util';
import { useAccount } from "wagmi";
import { useState } from "react";
import router, { Router } from "next/router";
import { redirect } from "next/navigation";




const TestAuthClient = ({ token }) => {
    // set a provider in the sepolia testnet using node rpc url
    const web3 = new Web3("https://rpc.sepolia.org")
    let decoded: any = jwtDecode(token);
    // const [recoveredAddress, setRecoveredAddress] = useState(null)



    const polar_data = localStorage.getItem('polar');
    const polar = JSON.parse(polar_data);
    let message = `${polar.message}${polar.nonce}`
    console.log(message)

    console.log(" from localstorage", polar);

    let signature = decoded.signature

    const address = decoded.address
    const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`;

    const recoveredAddr = recoverPersonalSignature({
        data: msg,
        sig: signature,
    });

    // setRecoveredAddress(recoveredAddr)

    console.log("addressR", recoveredAddr)
    console.log("addressO", address)

    if (!(recoveredAddr.toLowerCase().trim() == address.toString().toLowerCase().trim())) { 
        console.log('Signature verification failed');
    }
    else {
        console.log('Signature verified');
        redirect("/test/application")
    }


    // let encoded_message = encode_defunct(bytes(message, encoding='utf8'))
    // let recoveredAddress = web3.eth.accounts[0].recover_message(message , signature)
    // console.log("recoveredAddress", recoveredAddress)


    console.log("decoded", decoded);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Auth Client</h1>
            {recoveredAddr ?
                (<div>Recovered Address: {recoveredAddr}</div>):( <div>Recovering address...</div>)
            }
        </div>
    )
}
export default TestAuthClient;