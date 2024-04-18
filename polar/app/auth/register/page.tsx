// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/registry/new-york/ui/button";
// import { createClient } from '@/utils/supabase/client'
// import { Avatar, AvatarImage } from "@/registry/new-york/ui/avatar";
// import { v4 as uuidv4 } from 'uuid'
// import { set } from "react-hook-form";


// const RegisterProject = () => {



//     const handleCreateProject = async () => {
//         const node_crypto = require('crypto');
//         //save to filecoin, mint an nft that contains the id/name/address 
//         // of the project to the user's wallet
//         // jwt secret generated and stored on filecoin, encrypted
//         // jwt secret is per user
//         console.log("Creating project on filecoin")
//         let project_id = uuidv4();
//         let jwt_secret = node_crypto.randomBytes(32).toString('base64');
        
//         setProjectId(project_id);
//         let project = {
//             project_id,
//             project_name,
//             scope,
//             description,
//             redirect_url
//         }
//         console.log(project)

//         //const hash = crypto.getRandomValues(new Uint8Array(42)).toString();
//         let hash = crypto.getRandomValues(new Uint8Array(42))
//             .reduce((acc, i) => acc + ('0' + i.toString(16)).slice(-2), '');

//         setSecret(hash);
//         setFinished(true);
//     }


//     const [finished, setFinished] = useState(false);
//     const [secret, setSecret] = useState("");
//     const [project_id, setProjectId] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [project_name, setProjectName] = useState("");
//     const [scope, setScope] = useState("");
//     const [description, setDescription] = useState("");
//     const [redirect_url, setRedirectUrl] = useState("");




//     return (
//         <div className=" m-8 ">



//             <div>
//                 <h3 className="font-bold text-2xl">Register project</h3>
//             </div>



//             <div className="py-4 flex flex-row gap-4">
//                 <div className="py-4 flex flex-col">
//                     <span className="label-text pb-1">Name</span>
//                     <input type="text" placeholder="Regional DEX" value={project_name} className="input input-bordered w-full max-w-xs" onChange={(e) => setProjectName(e.target.value)} />

//                 </div>

//                 <div className="py-4 flex flex-col">
//                     <span className="label-text pb-1">Scope</span>
//                     <input type="text" placeholder="address, txn history" value={scope} className="input input-bordered w-full max-w-xs" onChange={(e) => setScope(e.target.value)} />

//                 </div>
//             </div>

//             <div className="py-4 flex flex-col">
//                 <span className="label-text pb-1">Description</span>
//                 <textarea className="textarea textarea-bordered" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

//             </div>

//             <div className="py-4 flex flex-col">
//                 <span className="label-text pb-1">Redirect URL</span>
//                 <input type="text" placeholder="url to be redirected to" value={redirect_url} className="input input-bordered w-full max-w-xs" onChange={(e) => setRedirectUrl(e.target.value)} />

//             </div>

//             {finished && (
//                 <div className="py-4 flex flex-col">
//                     <span className="label-text pb-1">Copy the project Id secret.</span>
//                     <span>Project Id: <code>{finished ? project_id : ""}</code></span>
//                     <span>Project Secret: <code>{finished ? secret : ""}</code></span>

//                 </div>

//             )}



//             <div className="flex  ">

//                 <div className="mt-6">
//                     <button className="btn" onClick={() => handleCreateProject()}>{!loading ? (<p>Create</p>) : (<p>Loading...</p>)}</button>
//                 </div>



//                 <div className="mt-6">
//                     <form method="dialog">
//                         {/* if there is a button in form, it will close the modal */}
//                         <button className="btn">Cancel</button>
//                     </form>
//                 </div>

//             </div>


//         </div>
//     )
// }

// export default RegisterProject; 