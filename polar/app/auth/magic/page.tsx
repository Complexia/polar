// oauth redirects here

import AuthMagicComponent from "@/components/auth-component"


const AuthMagic = (context) => {
    console.log("params", context.searchParams)
    // params need to be message to sign and nonce
    // get message and nonce from params
    let message = context.searchParams["message"]
    let nonce = context.searchParams["nonce"]
    console.log("message", message)
    console.log("nonce", nonce)
    
    // sign message and nonce
    
    return (
       <AuthMagicComponent message={message} nonce={nonce} /> 
    )
}

export default AuthMagic;