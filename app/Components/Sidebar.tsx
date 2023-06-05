import React from 'react'
const categories = [ "History","Kids", "Science", "Literature","Health", "Religion", "Magazine", "Newspaper"]
function Sidebar() {
  return (
    <div className=' w-48'>
        <ul className='px-4 py-4 bg-stone-100 border-2'>
        <li  className='text-sm mb-2' ><a href={`/`}>General</a></li>
        {
            categories.map(genre => <li  className='text-sm mb-2' ><a href={`/books/${genre}`}>{genre}</a></li>)
        }
        </ul>
    </div>
  )
}

export default Sidebar