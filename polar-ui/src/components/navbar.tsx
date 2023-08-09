"use client"
import { useEffect, useState } from "react";

import Link from "next/link";




const Navbar = (props: any) => { //props include user logged in or out

  const [isOpen, setIsOpen] = useState(false);

  
  return (
    
    
      <div className=" absolute flex flex-col w-screen pl-24 bg-secondaryBackgroundDark ">
        
        <div className="w-full">
        
          <div className="navbar rounded-md bg-gray text-secondaryAccent ">
            <div className="flex-none">
              

            </div>
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost normal-case text-xl">Polar</Link>
              


            </div>

            <div className="flex-none">
              <div className="dropdown dropdown-end">


              </div>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">


                </label>
                
              </div>
            </div>
          </div>
        </div >
      </div>
    
  )
}

export default Navbar;