
"use client"
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import AddModal from '../Components/AddModal'
import { useState } from 'react'
import BookList from '../Components/MyBookList'
import MyBookList from '../Components/MyBookList'

function Component() { 
    const [addModal, setAddModal] = useState(false)
    const {data: session} = useSession()
    if(!session){
        redirect('/')
    }else{
        return (
            <main className=' w-full px-28 flex flex-row'>
                <div className='w-10/12 px-24 mt-12'>
                    <div className='grid grid-cols-6 mb-4'>
                    <div className='col-span-4 '>Product</div>
                    <div className='col-span-1 flex  justify-center'>Price</div>
                    </div>
                    <hr className='border-2 mb-4'/>
                    <MyBookList/>
                </div>
                <div className='mt-24 flex justify-center items-center w-44 h-24 bg-gray-200'>
                    <button className='text-white font-bold bg-orange-400 p-2 rounded' onClick={()=> setAddModal(true)}>Add New</button>
                </div>
                {
                    addModal && <AddModal setAddModal={setAddModal}/>
                }

            </main>
          )
    }
  
}

export default Component