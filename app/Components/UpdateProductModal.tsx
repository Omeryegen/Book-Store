"use client"
import { useState } from "react"
import { Dispatch, SetStateAction } from "react"
import { ChangeEvent } from "react"
import { useSession } from "next-auth/react"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
declare global {
  interface FileList {
      forEach(callback: (f: File) => void) : void;
  }
}
const categories = ['General', 'History', 'Kids', 'Science', 'Literature', 'Health', 'Religion','Magazine','Newspaper']
interface Values{
  titel?: string,
  author?: string,
  publisher?: string,
  condition?: number,
  price?: string,
  seller: string,
  sellerId: string,
  category: string
}

function UpdateProductModal({setUpdateModal, book} : {setUpdateModal: Dispatch<SetStateAction<boolean>>, book: Values}) {
  const [loading, setLoading] = useState(false)
  const {data: session} = useSession()
  const initialValues = {
    titel: "",
    author: "",
    publisher: "",
    condition: 1,
    price: "",
    seller: session?.user?.name as string,
    sellerId: session?.user.id as string,
    category: ""
  }
  const query = useQueryClient()
  const [values, setValues] = useState<Values>(book ? book : initialValues)
  const changeValues = (e: ChangeEvent<HTMLInputElement>)=>{
    setValues({...values, [e.target.name]: e.target.value})
  } 
  const updateData = async ()=>{
    setLoading(true)
    const res = await axios.put('http://localhost:3000/api/books', values)
    console.log(res)
    setLoading(false)
    setValues(initialValues)
    setUpdateModal(false)
     query.invalidateQueries({queryKey: ['myBooks']})
  }


  return (
    <div className='absolute flex justify-center top-0 left-0 w-full h-full bg-zinc-600 opacity-90'>
        <div className='w-1/4 h-fit p-8 mt-24 bg-zinc-800 flex flex-col justify-center items-center'>
          <h1 className="text-white font-bold mb-4">Add New Book</h1>
            <div className='w-full px-4'>
                <input onChange={changeValues} value={values.titel} name='titel' placeholder='Title' className='w-full px-4 py-2 mb-4'/>
                <input onChange={changeValues} value={values.author} name='author' placeholder='Author' className='w-full px-4 py-2 mb-4'/>
                <input onChange={changeValues} value={values.publisher}  name='publisher' placeholder='Publisher' className='w-full px-4 py-2 mb-4'/>
                <div className="w-full flex flex-row justify-between">
                  <select value={values.category}  onChange={changeValues as any} name="category" className=" mb-4 w-2/6" >
                    {
                      categories.map(category => {
                        return <option key={category} value={category}>{category}</option>
                      })
                    }
                  </select>
                 
                  <input onChange={changeValues} value={values.price} name='price' placeholder='Price' className='w-3/6 px-4 py-2 mb-4'/>
                </div>
                <select value={values.condition}  onChange={changeValues as any} name="condition" className=" mb-4 w-2/6" >
                    <option value={1}>Very Bad</option>
                    <option value={2}>Bad</option>
                    <option value={3}>Normal</option>
                    <option value={4}>Good</option>
                    <option value={5}>Very Good</option>
                  </select>
                <button disabled={loading} onClick={updateData} className="px-4 py-2 font-bold text-white w-full bg-orange-400 mb-4 " >Update</button>
                <button disabled={loading}  className="px-4 py-2 font-bold text-white w-full bg-orange-400" onClick={()=> setUpdateModal(false)}>Cancel</button>
            </div>
           
        </div>
    </div>
  )
}

export default UpdateProductModal


