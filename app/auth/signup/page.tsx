"use client"
import { ChangeEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

function Component() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        name: ""
    });
    const {data: session} = useSession()
    const changeValues = (e: ChangeEvent<HTMLInputElement>)=>{
        setValues({...values, [e.target.name]: e.target.value})
    }
    if(!session){
      return (
        <div className="w-full h-full flex justify-center flex-col justify-center items-center ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xs">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Username
            </label>
            <input onChange={changeValues} value={values.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Username"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input onChange={changeValues} value={values.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="text" placeholder="Email"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input onChange={changeValues} value={values.password} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************"/>
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={()=> {signIn('credentials', {method: "signUp", email: values.email, password: values.password, name: values.name})}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs w-2/6">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
      )
    }else {
      return redirect('/')
    }
  
}

export default Component