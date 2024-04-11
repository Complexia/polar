"use client"

import { useEffect, useRef } from 'react';
import { Button } from "@/registry/new-york/ui/button";
import { IconGitHub, IconGoogle, IconOpenAI, PhantomIcon, SocialsIcon, SolanaIcon } from "@/registry/new-york/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/new-york/ui/tabs";
import { LoginButtonGoogle } from "../auth/googleLogin";
import { WalletMenu } from './wallet-menu';
import EtherWalletMenu from "./ether-wallet-menu";
import { BinanceWalletMenu } from './binance-wallet-menu';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const AuthModal = () => {
    const modalRef = useRef(null);  // Create a ref for the modal

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (modalRef.current && !modalRef.current.contains(event.target)) {

                const modal = (document.getElementById("auth-modal") as HTMLDialogElement);


                if (modal && typeof modal.close === "function") {
                    modal.close();

                }

            }
        };

        // Add when the component mounts
        document.addEventListener("mousedown", handleClickOutside);

        // Return function to be called when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { connect, connected, connecting, disconnect, disconnecting, publicKey, select, wallet, wallets } =
        useWallet();
    //console.log(publicKey.toBase58());

    return (
        <div>


            {publicKey ? (
                <WalletMultiButton />
            ) : (
                <button className="btn border text-xl " onClick={() => {
                    const modal = (document.getElementById("auth-modal") as HTMLDialogElement);
                    if (modal) {
                        modal.showModal();
                    }
                }}>
                    <div>Login</div>
                </button>

            )}



            <dialog id="auth-modal" className="modal" >
                <div className="modal-box max-w-2xl min-h-96" ref={modalRef}>
                    <Tabs defaultValue="Email and socials">
                        <TabsList>
                            <div className="flex flex-row">
                                <div className="flex flex-1 items-start">
                                    <div className="flex flex-col">
                                        <article className="prose">
                                            <h2>Connect</h2>
                                        </article>
                                        <div className="flex flex-col my-4">
                                            <TabsTrigger value="socials">
                                                <button className="btn btn-active btn-neutral min-w-44 w-full justify-start">
                                                    <SocialsIcon className="mr-2" />
                                                    Email and Socials
                                                </button>
                                            </TabsTrigger>
                                            <TabsTrigger value="phantom">
                                                <button className="btn btn-active btn-neutral min-w-44 w-full justify-start">
                                                    <SolanaIcon className="-ml-1" />Solana
                                                </button>
                                            </TabsTrigger>
                                            <TabsTrigger value="ethereum">
                                                <button className="btn btn-active btn-neutral min-w-44 w-full justify-start pl-2">
                                                    <img src="https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond.svg?v=031" alt="Ethereum Logo" className="h-6 w-6 -ml-0.5" />Ethereum
                                                </button>
                                            </TabsTrigger>
                                            <TabsTrigger value="binance">
                                                <button className="btn btn-active btn-neutral min-w-44 w-full justify-start pl-2">
                                                    <img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=031" alt="Ethereum Logo" className="h-6 w-6 -ml-0.5" />Binance
                                                </button>
                                            </TabsTrigger>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-1 justify-center">
                                    <div className="flex flex-col items-center">
                                        <article className="prose">
                                            <h2>Sign in</h2>
                                        </article>
                                        <TabsContent value="socials" className="items-center">
                                            <div className="flex flex-row justify-center my-4">
                                                <LoginButtonGoogle />
                                                <button className="btn btn-square btn-outline mx-2">
                                                    <IconGitHub />
                                                </button>
                                                <button className="btn btn-square btn-outline mx-2">
                                                    <IconOpenAI />
                                                </button>
                                            </div>
                                            <input type="text" placeholder="Enter email..." className="input input-bordered w-full max-w-xs" />
                                            <div className="mt-2">
                                                <button className="btn w-full">Continue</button>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="phantom" className="items-center">
                                            <WalletMenu />
                                        </TabsContent>
                                        <TabsContent value="ethereum" className="items-center">
                                            <EtherWalletMenu />
                                        </TabsContent>
                                        <TabsContent value="binance" className="items-center">
                                            <BinanceWalletMenu />
                                        </TabsContent>
                                    </div>
                                </div>
                            </div>
                        </TabsList>
                    </Tabs>
                </div>
            </dialog>
        </div>
    );
}

export default AuthModal;
