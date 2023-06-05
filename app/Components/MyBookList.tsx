import {useQuery, useQueryClient} from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Product from './Product'
import { Book } from '../lib/types'
function MyBookList() {
    const {data: session} = useSession()
    const query = useQuery({queryKey: ['myBooks'], queryFn: async function getMyBooks() {
        const response = await fetch(`http://localhost:3000/api/books/${session?.user.name}`) 
        const data = response.json()
        return data
    }});
  return (
    <>
        {query.data && query.data.map((book: Book) => {
            return <Product key={book.id} book={book}/>
        })}
    </>
  )
}

export default MyBookList