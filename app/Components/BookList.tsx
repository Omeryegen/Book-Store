"use client"
import {useQuery} from '@tanstack/react-query'
import { getBooks } from '../lib/Queries'
import Product from './Product'
import { Book } from '../lib/types'
function BookList() {
    const query = useQuery({ queryKey: ['books'], queryFn: getBooks })
  return (
    <>
        {query.data && query.data.map((book: Book) => {
            return <Product key={book.id} book={book}/>
        })}
    </>
  )
}

export default BookList