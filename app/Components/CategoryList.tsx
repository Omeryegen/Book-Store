"use client"

import Product from './Product'
import { Book } from '../lib/types'

function CategoryList({books}: {books: Book[]}) {
   
  return (
    <>
        {books && books.map((book: Book) => {
            return <Product key={book.id} book={book}/>
        })}
    </>
  )
}

export default CategoryList