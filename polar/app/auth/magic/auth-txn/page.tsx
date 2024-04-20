// oauth redirects here

import TxnTexas from "@/components/TxnTexas"
import AuthMagicComponent from "@/components/auth-component"
import Link from "next/link"


const AuthTxn = (context) => {
    console.log("params", context.searchParams)
    // params need to be message to sign and nonce
    // get message and nonce from params
    let redirect_url = context.searchParams["client_redirect_url"]
    let contract_address = context.searchParams["address"]
    let contract_abi = context.searchParams["abi"]
    let contract_method = context.searchParams["contract_method"]

    // contact address
    // contract abi
    // contract method
    console.log("redirect_url", redirect_url)
    console.log("contract_address", contract_address)
    console.log("contract_abi", contract_abi)
    console.log("contract_method", contract_method)

    // sign message and nonce

    return (
        <div className="mockup-browser border bg-base-300">
            <div className="mockup-browser-toolbar">
                <div className="input">https://polar-auth.io</div>
            </div>
            <div className="bg-base-200">
                <TxnTexas redirect_url={redirect_url} contract={contract_address} contract_abi={contract_abi} contract_method={contract_method} />
            </div>
        </div>
    )
}

export default AuthTxn;