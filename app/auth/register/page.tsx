"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/registry/new-york/ui/button";
import { createClient } from '@/utils/supabase/client'
import { Avatar, AvatarImage } from "@/registry/new-york/ui/avatar";
import { v4 as uuidv4 } from 'uuid'

const RegisterProject = () => {



    const handleCreateProject = async () => {
        console.log("Creating project on filecoin")

    }



    const [loading, setLoading] = useState(false);
    const [project_name, setProjectName] = useState("");
    const [scope, setScope] = useState("");
    const [description, setDescription] = useState("");
    const [redirect_url, setRedirectUrl] = useState("");




    return (
        <div className=" m-8 ">



            <div>
                <h3 className="font-bold text-2xl">Register project</h3>
            </div>



            <div className="py-4 flex flex-row gap-4">
                <div className="py-4 flex flex-col">
                    <span className="label-text pb-1">Name</span>
                    <input type="text" placeholder="Regional DEX" value={project_name} className="input input-bordered w-full max-w-xs" onChange={(e) => setProjectName(e.target.value)} />

                </div>

                <div className="py-4 flex flex-col">
                    <span className="label-text pb-1">Scope</span>
                    <input type="text" placeholder="address, txn history" value={scope} className="input input-bordered w-full max-w-xs" onChange={(e) => setScope(e.target.value)} />

                </div>
            </div>

            <div className="py-4 flex flex-col">
                <span className="label-text pb-1">Description</span>
                <textarea className="textarea textarea-bordered" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            </div>

            <div className="py-4 flex flex-col">
                <span className="label-text pb-1">Redirect URL</span>
                <input type="text" placeholder="url to be redirected to" value={redirect_url} className="input input-bordered w-full max-w-xs" onChange={(e) => setRedirectUrl(e.target.value)} />

            </div>


            <div className="flex  ">

                <div className="mt-6">
                    <button className="btn" onClick={() => handleCreateProject()}>{!loading ? (<p>Create</p>) : (<p>Loading...</p>)}</button>
                </div>


                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Cancel</button>
                    </form>
                </div>

            </div>


        </div>
    )
}

export default RegisterProject; 