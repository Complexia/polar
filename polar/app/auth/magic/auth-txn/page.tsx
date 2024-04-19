// oauth redirects here

import AuthMagicComponent from "@/components/auth-component"


const AuthTxn = (context) => {
    console.log("params", context.searchParams)
    // params need to be message to sign and nonce
    // get message and nonce from params
    
    let redirect_url = context.searchParams["redirect_url"]
    // contact address
    // contract abi
    // contract method
    
    console.log("redirect_url", redirect_url)

    
    // sign message and nonce
    
    return (
       <div>
        this is banana !
       </div>
    )
}

export default AuthTxn;