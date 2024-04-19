"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'

const jwt = require('jsonwebtoken');

const AuthMagicComponent = ({ message, nonce, redirect_url }) => {

    const [signature, setSignature] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState('');
    const { address } = useAccount()

    // Extract message and nonce from search params


    // Function to handle signing the message

    const generateJwt = () => {
        // Generate a JWT secret for auth purposes
        console.log('Generate a JWT secret for auth purposes')

        // Save to filecoin, mint an NFT that contains the id/name/address
        // of the project to the user's wallet
        const node_crypto = require('crypto');
        let secret = node_crypto.randomBytes(32).toString('base64');
        console.log("Jwt secret", secret)

        if (typeof secret !== 'string') {
            console.error('Invalid JWT secret. Secret must be a string.');
            throw new TypeError('Invalid JWT secret. Secret must be a string.');
        }

        let payload = {
            address,
            signature
        }

        console.log('Auth payload:', payload)

        const expiresIn = '12h';

        // create jwt from payload using jwt secret above

        try {
            const token = jwt.sign(payload, secret);
            console.log('JWT token:', token);
            setToken(token);
        } catch (error) {
            console.error('Error encoding JWT:', error);
            throw error;
        }

    }

    const signMessage = async (message, nonce, address) => {
        let account = address
        if (!window.ethereum) {
            setError('Please install MetaMask!');
            return;
        }
        // const provider = window.ethereum.providers.find((provider) => provider.isMetaMask);
        const provider = window.ethereum;

        try {
            
            //const accounts = await provider.send("eth_requestAccounts", []);
            
            const fullMessage = `${message}${nonce}`;
            
            let message_sign = {
                message: fullMessage,
            }

            
            const params = [account, fullMessage];
            const method = 'personal_sign';

            console.log('account:', account);

            const signature = await provider.request({ method, params, from: account });
            setSignature(signature);
            console.log('Signature:', signature);
        } catch (err) {
            setError('Error signing message: ' + err.message);
            console.log(error);
        }
    };



    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="flex flex-row gap-x-6">
                <div className="card w-96  bg-primary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">Message and nonce from client</h2>
                        <p>Message: {message}</p>
                        <p>Nonce: {nonce}</p>
                        <div className="card-actions justify-end">
                            <button className="btn" onClick={() => signMessage(message, nonce, address)}>Create signature</button>
                        </div>
                    </div>
                </div>

                <div className="card w-96  bg-primary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">Signature</h2>
                        {signature ? (
                            <p>Signature: {signature.slice(0, 12) + '....' + signature.slice(-12)}</p>
                        ) : (
                            <p>{error || "Waiting for message and nonce..."}</p>
                        )}
                        <div className="card-actions justify-end">
                            {token ? (
                                <Link href={{
                                    pathname: redirect_url,
                                    query: {
                                        jwt_token: token,
                                        
                                    },
                                }}>
                                    <button className="btn btn-success">Authenticate client</button>
                                </Link>
                            ) : (
                                <button className="btn" disabled={!signature} onClick={() => generateJwt()}>Generate token</button>
                            )}

                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default AuthMagicComponent;
