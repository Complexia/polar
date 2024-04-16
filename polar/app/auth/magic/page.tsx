// oauth redirects here

const AuthMagic = (context) => {
    console.log("params", context.searchParams)
    return (
        <div>
            <h1>Magic</h1>
            <p>magic</p>
        </div>
    )
}

export default AuthMagic;