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

const Info = () => {
    const { address } = useAccount()
    return (
        <div>
            <div className="">
                <article className="prose">
                    <h3>User information and button to save to filecoin</h3>

                </article>

                <div>{address}</div>
            </div>
            
            
        </div>
    )
}

export default Info;