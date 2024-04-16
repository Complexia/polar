import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import AuthModal from "@/components/solana/auth-modal-one";
import Magic from "@/components/magic/magic";
import Info from "@/components/magic/info";

export default async function Index() {


  return (
    // <div className="flex-1  flex flex-col gap-20 items-center w-screen h-screen justify-center">
    <div className="flex flex-row p-8">
      <div className="flex flex-1 items-start ">
        <Magic />

      </div>
      <div className="flex flex-1 items-center ">
        <Info />

      </div>


    </div>






  );
}
