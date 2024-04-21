"use client"

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "@/components/client/auth-button";
import ClientNav from "@/components/client/client-nav";

const ClientNavAuth = (decoded) => {

    console.log("debug 5", decoded.decode);
    if (!decoded.decode || Object.keys(decoded.decode).length === 0) {
        return (
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <AuthButton />
                </div>
            </div>)
            ;
    } else {
        console.log("set user to localStorage", decoded.decode.data);
        const user = decoded.decode.data;
        const string_user = JSON.stringify(user);
        localStorage.setItem("user", string_user);

        return (
            <ClientNav />
        );
    }
    // const [user, setUser] = useState(null);
    // const [modal, setModal] = useState(null);

    // useEffect(() => {
    //   if (!response || Object.keys(response).length === 0) {
    //     setUser(false);
    //   } else {
    //     setUser(true);
    //   }
    // }, []);

    // const buyNow = () => {
    //   if (user === true) {
    //     console.log("have user and transact -> activate contract_method")
    //   } else {
    //     console.log("no user and open modal");

    //   }
    // };

    // return (
    //     <div >
    //         {user ? (
    //             <ClientNav />
    //         ) :
    //             (<div className="flex-none">
    //                 <div className="dropdown dropdown-end">
    //                     <AuthButton />
    //                 </div>
    //             </div>
    //             )
    //         }
    //     </div>
    // );
}
export default ClientNavAuth;
