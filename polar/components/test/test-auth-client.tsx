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

    const node_crypto = require('crypto');
    const jwt = require('jsonwebtoken');
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

    let user_data = {
        address: address,
        data: decoded.user_data,
    }

    // identify user
    if (!(recoveredAddr.toLowerCase().trim() == address.toString().toLowerCase().trim())) {
        console.log('Signature verification failed');
    }
    else {
        try {
            console.log('Signature verified');
            // localStorage.setItem('user', JSON.stringify(user_data));

            // if correct user -> send user_data to /test/application

            let payload = JSON.stringify(user_data);
            console.log("this is user_data : ", payload);
            // generate jwt_token include user_data
            let secret = node_crypto.randomBytes(32).toString('base64');
            console.log("Jwt secret", secret)
            if (typeof secret !== 'string') {
                console.error('Invalid JWT secret. Secret must be a string.');
                throw new TypeError('Invalid JWT secret. Secret must be a string.');
            }
            const expiresIn = '12h';
            // create jwt from payload using jwt secret above
            const token = jwt.sign(payload, secret);
            console.log('JWT token:', token);
            // Construct the URL with query parameters
            const params = new URLSearchParams();
            const encodedUserData = encodeURIComponent(token);
            params.set('jwt', encodedUserData);

            // Convert the query object into a query string and perform the redirect
            const queryString = params.toString();
            const url = `/test/application?${queryString}`;
            redirect(url)

        } catch (error) {
            console.error('Error encoding JWT:', error);
            throw error;
        }
    }



    console.log("decoded", decoded);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Auth Client</h1>
            {recoveredAddr ?
                (<div>Recovered Address: {recoveredAddr}</div>) : (<div>Recovering address...</div>)
            }
        </div>
    )
}
export default TestAuthClient;