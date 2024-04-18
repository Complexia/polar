// oauth redirects here

import AuthMagicComponent from "@/components/auth-component"


const AuthMagic = (context) => {
    console.log("params", context.searchParams)
    // params need to be message to sign and nonce
    // get message and nonce from params
    let message = context.searchParams["message"]
    let nonce = context.searchParams["nonce"]
    let redirect_url = context.searchParams["redirect_url"]
    console.log("message", message)
    console.log("nonce", nonce)
    console.log("redirect_url", redirect_url)
    
    // sign message and nonce
    
    return (
       <AuthMagicComponent message={message} nonce={nonce} redirect_url={redirect_url}/> 
    )
}

export default AuthMagic;