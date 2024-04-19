"use client"

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function TxnButton() {

  const [user, setUser] = useState(null);
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
          <button className="btn">Activate Random Button</button>
        </Link>
      ) : (
        <h1>authenticate with polar first</h1>
      )}

    </div>
  );
}
