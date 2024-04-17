"use client"

import AuthModal from "../solana/auth-modal-one";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Magic = () => {
    return (
        <div>
            <div className="mb-4">
                <article className="prose">
                    <h3>Authenticate using your web3 wallet</h3>

                </article>
            </div>

            
            

            <div className="my-2">
                <ConnectButton />
            </div>
        </div>
    )
}

export default Magic;