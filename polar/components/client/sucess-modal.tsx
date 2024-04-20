"use client"

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const SucessModal = (response) => {
    const [modal, setModal] = useState(null);

    useEffect(() => {
        setModal(true)
    }, []);

    // const openModal = () => {
    //     setModal(true);
    // };

    const closeModal = () => {
        console.log("this is model:", modal);
        setModal(false);

    };

    if (!modal) {
        return null; // Don't render anything if modal is not active
    }

    return (
        <div role="alert" className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
                <h3 className="font-bold">Contract Response!</h3>
                <div className="text-xs">{response.response}</div>
            </div>
            <div>
                <button className="btn btn-sm" onClick={closeModal}>Close</button>
                {/* <button className="btn btn-sm btn-primary">Accept</button> */}
            </div>
        </div>
    );
}
export default SucessModal;
