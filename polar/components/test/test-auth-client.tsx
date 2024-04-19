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




const TestAuthClient = ({ token }) => {
    // set a provider in the sepolia testnet using node rpc url
    const web3 = new Web3("https://rpc.sepolia.org")
    let decoded: any = jwtDecode(token);

    

    const polar_data = localStorage.getItem('polar');
    const polar = JSON.parse(polar_data);
    let message = `${polar.message}${polar.nonce}`
    console.log(message)

    console.log(" from localstorage", polar);

    let signature = decoded.signature

    const address = useAccount();
    const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`;

    const recoveredAddr = recoverPersonalSignature({
        data: msg,
        sig: signature,
    });

    console.log("recoveredAddr", recoveredAddr)


    // let encoded_message = encode_defunct(bytes(message, encoding='utf8'))
    // let recoveredAddress = web3.eth.accounts[0].recover_message(message , signature)
    // console.log("recoveredAddress", recoveredAddress)


    console.log("decoded", decoded);
    return (
        <div>
            <h1>Auth Client</h1>
        </div>
    )
}
export default TestAuthClient;