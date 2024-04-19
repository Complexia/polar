"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'
import { useUserContext } from './user-context';
import { Web3 } from "web3";

const jwt = require('jsonwebtoken');

const TxnTexas = ({ redirect_url, contract, contract_abi, contract_method, }) => {

    // set a provider in the sepolia testnet using node rpc url
    const web3 = new Web3("https://rpc.sepolia.org");

    // interacting with the smart contract
    const abi_string = contract_abi;

    const address = contract;
    console.log("contract", contract)
    

    let abi = JSON.parse(abi_string);

    // create a new contract object, providing the ABI and address
    const contracts = new web3.eth.Contract(abi, address);

    // using contract.methods to get value
    const activate_banana = () => {
        contracts.methods[contract_method]()
        .call()
        .then(console.log);
    };

    // Extract message and nonce from search params



    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="flex flex-row gap-x-6">
                <div className="card w-96  bg-primary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">Transaction</h2>
                        <div className="card-actions justify-end">
                            <button className="btn" onClick={() => activate_banana()}>Authorize transaction</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96  bg-primary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">Signature</h2>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TxnTexas;
