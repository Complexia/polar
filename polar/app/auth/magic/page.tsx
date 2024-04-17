// oauth redirects here

const AuthMagic = (context) => {
    console.log("params", context.searchParams)
    // params need to be message to sign and nonce
    // let message = context.searchParams.get("message")
    // let nonce = context.searchParams.get("nonce")
    // console.log("message", message)
    // console.log("nonce", nonce)
    return (
        <div>
            <h1>Magic</h1>
            <p>magic</p>
        </div>
    )
}

export default AuthMagic;