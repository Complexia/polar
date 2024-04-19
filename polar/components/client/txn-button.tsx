"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const TxnButton = () => {
    // get origin url to redirect to
    let redirect_url = process.env.NEXT_PUBLIC_ORIGIN_URL;
    let auth_url = process.env.NEXT_PUBLIC_AUTH_URL;
    // generate message
    // let message = Math.random().toString(36).substring(7);
    // let nonce = Math.random().toString(36).substring(7);
    
    const [message, setMessage] = useState(null);
    const [nonce, setNonce] = useState(null);


    // This ensures the code runs only on the client-side
    useEffect(() => {
        // This ensures the code runs only on the client-side
        if (typeof window !== "undefined") {
            let polarData = localStorage.getItem('polar');
            // Check if 'polar' data already exists in localStorage
            if (!polarData) {
                // Generate message and nonce if 'polar' doesn't exist
                const newMessage = Math.random().toString(36).substring(7);
                const newNonce = Math.random().toString(36).substring(7);
                const polar = {
                    message: message,
                    nonce: nonce
                };
                setMessage(newMessage);
                setNonce(newNonce);
                // Logging and saving to localStorage
                console.log("saving nonce and message in 'polar':", polar);
                const authDataString = JSON.stringify(polar);
                localStorage.setItem('polar', authDataString);
            } else {
                const existingPolar = JSON.parse(polarData);
                setMessage(existingPolar.message);
                setNonce(existingPolar.nonce);
                console.log("'polar' already exists in localStorage.");
            }
        }
    }, []);



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


export default TxnButton;