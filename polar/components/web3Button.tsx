"use client"

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AuthButton from "@/components/client/auth-button";

export default function TxnButton() {

  const [user, setUser] = useState(null);
  const modalRef = useRef(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);

  }, []);


  let redirect_url = "http://localhost:3000/auth/magic/auth-txn";
  let client_redirect_url = "http://localhost:3000/test/application";
  let name = Math.random().toString(36).substring(2, 15);

  let address = "0xA36432F7B12f160F685717c4Ab12EB883a682810";
  const contract_abi = [
    {
      outputs: [
        {
          internalType: "uint256",
          name: "randomNo",
          type: "uint256",
        },
      ],
      name: "generateRandomNumber",
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const;

  const abi = JSON.stringify(contract_abi);
  const contract_method = "generateRandomNumber";

  // const openModal = () => {
  //   setModal(true);
  //   console.log("opening modal");
  // };

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };


  return (
    <div>
      {user ? (
        <Link href={{
          pathname: redirect_url,
          query: {
            name,
            address,
            abi,
            contract_method,
            client_redirect_url
          },
        }}>
          <button className="btn btn-primary">Buy Now</button>
        </Link>
      ) : (
        <div>
          <button className="btn btn-primary" onClick={openModal}>Buy Now</button>
          <div>{/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog ref={modalRef} className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                </form>
                <h3 className="font-bold text-lg">Authentication Required!</h3>
                <p className="py-4">Please Connect Your Wallet</p>
                <AuthButton/>
              </div>
            </dialog>
          </div>
        </div>
      )}

    </div>
  );
}
