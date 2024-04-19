import DeployButton from "@/components/DeployButton";

import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import AuthButton from "@/components/client/auth-button";
import Link from "next/link";
import TxnButton from "@/components/web3Button";



export default async function Index(context) {
    let response = context.searchParams["response"]

    const client_redirect_url = "http://localhost:3000/test/application";
    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    // call user context which should be filled in auth-redirect
    // const user = useUserContext();

    // if user is not null, then render the web3js page to click a buttoon to gen a random number
    // make a new button somewhere takes a param which is the name
    // name can be generate random number
    // this button redirects you to polar with params that iclude contract name and address,
    // contract abi
    // contract method to call
    // once on polar, you can call the contract method using web3js
    // return result back to client

    let redirec_url = "http://localhost:3000/auth/magic/auth-txn";
    let name = Math.random().toString(36).substring(2, 15);

    let address = "0xA36432F7B12f160F685717c4Ab12EB883a682810";
    const contract_abi = [
        {
            outputs: [
                {
                    internalType: "uint256",
                    name: "randomNo",
                    type: "uint256",
                },
            ],
            name: "generateRandomNumber",
            stateMutability: "nonpayable",
            type: "function",
        },
    ] as const;

    const contract_method = "generateRandomNumber";



    const isSupabaseConnected = canInitSupabaseClient();

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    <DeployButton />
                    <AuthButton />
                </div>
            </nav>
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">



                <main className="flex-1 flex flex-col gap-6">
                    <h2 className="font-bold text-4xl mb-4">web3 steps</h2>
                    <div className="flex flex-row space-x-4">
                        <div>
                            <TxnButton />
                        </div>
                        <div className="mt-2">
                            {response ? (
                                <div>{response}</div>
                            ) : (
                                <div>Waiting for bananas</div>
                            )}

                        </div>
                    </div>

                </main>
            </div>


        </div>
    );
}
