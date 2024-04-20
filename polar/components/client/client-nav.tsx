"use client"

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ClientNav = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  function formatAddress(address) {
    if (address.length > 6) {
        return `${address.substring(0, 3)}...${address.substring(address.length - 3)}`;
    }
    return address; // Return the original address if it's too short to format
}
const formattedAddress = formatAddress(user.address);
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


  return (
    <div className="flex-none">
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item">8</span>
            </div>
        </div>
        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>
                </div>
            </div>
        </div>
    </div>

    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
                <a className="justify-between">
                    Client
                    <span className="badge">{user.data.name}</span>
                </a>
            </li>
            <li><a>Address<span className="badge">{formattedAddress}</span></a></li>
            {/* <li><a>Contract:
                {response}</a></li> */}
            {/* <li><a>Logout</a></li> */}
        </ul>
    </div>
</div>
  );
}
export default ClientNav ;
