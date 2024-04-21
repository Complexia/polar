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
        <div className="mockup-browser border bg-base-300">
            <div className="mockup-browser-toolbar">
                <div className="input">https://polar-auth.io</div>
            </div>
            <div className="bg-base-200">
                <AuthMagicComponent message={message} nonce={nonce} redirect_url={redirect_url} />
            </div>
        </div>
    )
}

export default AuthMagic;