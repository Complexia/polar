"use client";

import AuthModal from "../solana/auth-modal-one";
import { useAccount, useEnsName } from 'wagmi'
import { useUserContext } from "../user-context";

function Profile() {
    const { address } = useAccount()
    const { data, error, status } = useEnsName({ address })
    console.log(data)
    if (status === 'pending') return <div>Loading ENS name</div>
    if (status === 'error')
      return <div>Error fetching ENS name: {error.message}</div>
    return <div>ENS name: {data}</div>
  }


// const handleGenerateJwt = async () => {
//     // Generate a JWT secret for auth purposes
//     console.log('Generate a JWT secret for auth purposes')

//     // Save to filecoin, mint an NFT that contains the id/name/address
//     // of the project to the user's wallet
//     const node_crypto = require('crypto');
//     let jwt_secret = node_crypto.randomBytes(32).toString('base64');
//     console.log(jwt_secret)
// }


// fetch ProfileContract NFT from wallet and see info
const Info = () => {

    // hardcoded user info that should be got from NFT
    // save this info to context
    const userInfo: any = useUserContext();
    console.log(userInfo)

    const { address } = useAccount()
    return (
        <div>
            <div className="flex flex-col">
                <article className="prose">
                    <h3>Your info</h3>

                </article>

                <div>{address}</div>

                <button className="btn">Save info</button>
            </div>
            
            
        </div>
    )
}

export default Info;