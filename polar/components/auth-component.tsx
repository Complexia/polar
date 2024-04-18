"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import React, { useState, useEffect } from 'react';

const AuthMagicComponent = ({ message, nonce }) => {

    const [signature, setSignature] = useState(null);
    const [error, setError] = useState('');

    // Extract message and nonce from search params


    // Function to handle signing the message

    const signMessage = async (message, nonce) => {
        if (!window.ethereum) {
            setError('Please install MetaMask!');
            return;
        }
        const provider = window.ethereum.providers.find((provider) => provider.isMetaMask);
        

        try {
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            //const accounts = await provider.send("eth_requestAccounts", []);
            const account = accounts[0];
            const fullMessage = `${message}${nonce}`;
            const params = [fullMessage, account];
            const method = 'personal_sign';

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
                            <button className="btn" onClick={() => signMessage(message, nonce)}>Create signature</button>
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
                            <button className="btn" disabled={!signature}>Authenticate client</button>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default AuthMagicComponent;
