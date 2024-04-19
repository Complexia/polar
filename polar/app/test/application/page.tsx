import DeployButton from "@/components/DeployButton";

import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import AuthButton from "@/components/client/auth-button";
import Link from "next/link";



export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  // call user context which should be filled in auth-redirect
  // const user = useUserContext();

  // if user is not null, then render the web3js page to click a buttoon to gen a random number
  // make a new button somewhere takes a param which is the name
  // name can be generate random number
  // this button redirects you to polar with params that iclude contract name and address,
  // contract abi
  // contract method to call
  // once on polar, you can call the contract method using web3js
  // return result back to client

  let redirec_url = "http://localhost:3000/auth/magic/auth-txn";
  let name = Math.random().toString(36).substring(2, 15);
  let address = "";
  let contract_abi = "";



  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          <AuthButton />
        </div>
      </nav>
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <div>
          <Link href={{
            pathname: redirec_url,
            query: {
              name,
              address,
              contract_abi,
            },
          }}>
            <button className="btn">Activate Random Contract</button>
          </Link>
        </div>
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Now </h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}


        </main>
        <main className="flex-1 flex flex-col gap-6">
<<<<<<< HEAD
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}

=======
          
          
>>>>>>> 4481ba4a000d5b805a95593e54926d239b282f7e

        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
