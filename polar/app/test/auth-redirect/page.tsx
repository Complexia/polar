// oauth redirects here

import AuthMagicComponent from "@/components/auth-component"
import TestAuthClient from "@/components/test/test-auth-client";
import { jwtDecode } from "jwt-decode";



const AuthMagic = (context) => {
    console.log("params", context.searchParams)
    // params need to be message to sign and nonce
    // get message and nonce from params
    let token = context.searchParams["jwt_token"]

    
    
    
    
    // sign message and nonce
    
    return (
       <TestAuthClient token={token}/>
    )
}

export default AuthMagic;