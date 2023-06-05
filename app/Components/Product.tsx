"use client"
import { faArrowCircleRight, faCartShopping, faDeleteLeft, faHeart, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Book } from '../lib/types'
import {  usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import UpdateProductModal from './UpdateProductModal'
import { useState } from 'react'
function Product({book}: {book: Book} ) {
    const [updateModal, setUpdateModal] = useState(false)
    const path = usePathname()
    const router = useRouter()
    const {data: session} = useSession()
    const queryClient = useQueryClient()
    const query = useQuery({queryKey: ['account'], queryFn: async function getAccount() {
        const response = await axios.post(`http://localhost:3000/api/account`, {email :session?.user.email}) 
        return response.data
    }})
    const mutation = useMutation({
        mutationFn: async (body: Object) => { 
            return (await axios.put('http://localhost:3000/api/account', body)).data
        },
        onSuccess: ()=> queryClient.invalidateQueries({queryKey: ['account']})
      })
      const deleteMutation = useMutation({
        mutationFn: async () => { 
            
            return (await axios.put('http://localhost:3000/api/books', {id:book.id, delete: true} as any)).data
        },
        onSuccess: ()=> queryClient.invalidateQueries({queryKey: ['myBooks']})
      })
    const account = !session ? null : query.data
    
    if(book){
        return (
            <>
                <div className='grid grid-cols-6 mb-4'>
                <div className='col-span-4 flex flex-row'>
                    <img src={book.images.length ? book.images[0]: undefined} className='w-24 h-21'/>
                    <div className='flex flex-col ml-8'>
                        <h2>{book.titel}</h2>
                        <h4>{book.author}</h4>
                        <p>Seller: {book.seller}</p>
                        <p>Publisher: {book.publisher}</p>
                        <p>Condition: {book.condition}</p>
                    </div>
                </div>
                <div className='col-span-1 flex flex-col justify-center items-center'>
                <p>{book.price}$</p>
                </div>
                <div className='col-span-1 flex flex-col justify-around'>
                    {
                        path.includes('listings') ? 
                        <>
                            <FontAwesomeIcon onClick={()=> setUpdateModal(true)} className='cursor-pointer'  icon={faPenToSquare}/>
                            <FontAwesomeIcon onClick={()=> session ?  deleteMutation.mutate() : null}  className='cursor-pointer' icon={faTrashCan}/>
                        </>
                        : 
                        <>
                            <FontAwesomeIcon onClick={()=> session ?  mutation.mutate({
                                id: book.id,
                                email : session?.user.email,
                                to: 'basket',
                                command : (account && account.basket.includes(book.id)) ? 'delete' : 'add'
                            }): router.push('/auth/signin')}  className='cursor-pointer' color={(account && account.basket.includes(book.id)) ? 'red' : 'gray'} size='xl'  icon={faCartShopping}/>
                            <FontAwesomeIcon onClick={()=> session ?  mutation.mutate({
                                id: book.id,
                                email : session?.user.email,
                                to: 'favourites',
                                command : (account && account.favourites.includes(book.id)) ? 'delete' : 'add'
                            }) : router.push('/auth/signin')} className='cursor-pointer' color={(account && account.favourites.includes(book.id)) ? 'red' : 'gray'} size='xl' icon={faHeart}/>
                        </>                    
                    }
                    
                </div>
                </div>
                <hr className='border-2 mb-4'/>
                {updateModal && <UpdateProductModal setUpdateModal={setUpdateModal} book={book as any}/>}
            </>
      )
    }else{
        return <p> No content</p>
    }
 
}

export default Product