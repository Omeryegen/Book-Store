"use client"
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { faBook, faUser } from "@fortawesome/free-solid-svg-icons";
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar() {
    const {data: session} = useSession()
    const query = useQueryClient()
  return (
    <div className='w-screen bg-rose-950 flex flex-row justify-around flex flex-row items-center z-10'>
      <Link  className="flex flex-row text-white hover:text-orange-400" href={'/'}>
        <FontAwesomeIcon size="xl"  className="mr-2" icon={faBook}/>
        <p >BookStore</p>
      </Link>
      
        {
            session?.user ? 
            <div className="relative text-white hover:text-orange-600  cursor-pointer ">
              <FontAwesomeIcon size="xl" className="peer py-4 px-2"  icon={faUser}/>
              <div className="absolute left-0 bottom-100% hidden peer-hover:flex hover:flex
              w-[200px]
              flex-col bg-white drop-shadow-lg">
                  <Link className="px-5 py-3 hover:bg-gray-200" href="#">My Account</Link>
                  <Link className="px-5 py-3 hover:bg-gray-200" href="/listings">My Listings</Link>
                  <button onClick={()=> {
                    signOut()
                    }} className="px-5 py-3 text-left hover:bg-gray-200" >Sign Out</button>
              </div>
            </div>
            
            : 
              <div className="relative text-white hover:text-orange-600  cursor-pointer ">
                <FontAwesomeIcon size="xl" className="peer py-4 px-2"  icon={faUser}/>
                <div className="absolute left-0 bottom-100% hidden peer-hover:flex hover:flex
                w-[200px]
                flex-col bg-white drop-shadow-lg">
                    <a className="px-5 py-3 hover:bg-gray-200" href="/auth/signup">Sign Up</a>
                    <a className="px-5 py-3 hover:bg-gray-200" href="/auth/signin">Login</a>
                </div>
              </div>
            
        }
    </div>
  )
}
