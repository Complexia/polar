"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'
import { useUserContext } from './user-context';
import { Web3 } from "web3";
import { set } from 'react-hook-form';

const jwt = require('jsonwebtoken');

const TxnTexas = ({ redirect_url, contract, contract_abi, contract_method, }) => {

    const [res, setRes] = useState(null);

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
    const activate_banana = async () => {
        // try {
        //     const response = await contracts.methods[contract_method]().call();
        //     console.log("response", response)
        //     setRes(response);
        //     //test
        //     // const subscription = contracts.events.RandomNo()
        //     // subscription.on("data", console.log);
        //     // Set up subscription to the RandomNo event
        //     //end.
        // } catch (error) {
        //     console.error("Error occurred while getting response from contract:", error);
        //     throw error; // Rethrow the error for handling elsewhere if needed
        // }
        // let data = contracts.provider;
        // console.log("thissi teset",data);

        const result: any = await contracts.methods
        [contract_method]()
            .call()

        const numberResult = parseInt(result, 16);
        console.log("Number result:", numberResult);
        setRes(numberResult);

        console.log("result", result)
        console.log(result)

    };

    // Extract message and nonce from search params



    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="flex flex-row gap-x-6">
                <div className="card w-full  bg-primary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">Transaction</h2>
                        <p>Contract address: {contract}</p>
                        <p>Contract method: {contract_method}</p>
                        <p>Description</p>
                        <div className="card-actions justify-end">
                            <button className="btn" onClick={() => activate_banana()}>Authorize transaction</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96  bg-primary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">Contract response</h2>
                        {res ? (
                            <p>Response: {res}</p>
                        ) : (
                            <p>{"Waiting for response..."}</p>
                        )}

                        <div className="card-actions justify-end">
                            <Link href={{
                                pathname: redirect_url,
                                query: {
                                    response: res,
                                    
                                },
                            }}>
                                <button className="btn" disabled={!res}>Return response to client</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TxnTexas;
