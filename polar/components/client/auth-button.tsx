"use client";

import Link from "next/link";

const AuthButton = () => {
    // get origin url to redirect to
    let redirect_url = process.env.NEXT_PUBLIC_ORIGIN_URL;
    let auth_url = process.env.NEXT_PUBLIC_AUTH_URL;
    // generate message
    let message = Math.random().toString(36).substring(7);
    let nonce = Math.random().toString(36).substring(7);
    return (
        <div>
            <Link href={{
                pathname: auth_url,
                query: {
                    redirect_url,
                    message,
                    nonce,
                },
            }}>
                <button className="btn">Login with Polar</button>
            </Link>
        </div>
    )

}

export default AuthButton;