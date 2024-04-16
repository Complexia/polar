"use client";

import AuthModal from "../solana/auth-modal-one";
import { useAccount, useEnsName } from 'wagmi'

function Profile() {
    const { address } = useAccount()
    const { data, error, status } = useEnsName({ address })
    console.log(data)
    if (status === 'pending') return <div>Loading ENS name</div>
    if (status === 'error')
      return <div>Error fetching ENS name: {error.message}</div>
    return <div>ENS name: {data}</div>
  }


const handleGenerateJwt = async () => {
    // Generate a JWT secret for auth purposes
    console.log('Generate a JWT secret for auth purposes')

    // Save to filecoin, mint an NFT that contains the id/name/address
    // of the project to the user's wallet
    const node_crypto = require('crypto');
    let jwt_secret = node_crypto.randomBytes(32).toString('base64');
    console.log(jwt_secret)
}
const Info = () => {
    const { address } = useAccount()
    return (
        <div>
            <div className="flex flex-col">
                <article className="prose">
                    <h3>User information and button to save to filecoin</h3>

                </article>

                <div>{address}</div>

                <button className="btn" onClick={() => handleGenerateJwt()}>Generate a JWT secret for auth purposes</button>
            </div>
            
            
        </div>
    )
}

export default Info;