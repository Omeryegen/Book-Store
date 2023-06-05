import Sidebar from '@/app/Components/Sidebar'
import CategoryList from '@/app/Components/CategoryList';
import axios from 'axios';
async function Component({params}: {params: { slug: string };}) {
  
  const books = (await axios.get(`http://localhost:3000/api/books/category/${params.slug}`)).data
  
    return (
        <main className='w-full mt-12 px-28 flex flex-row'>
          <Sidebar/>
          <div className='w-10/12 px-24'>
            <div className='grid grid-cols-6 mb-4'>
              <div className='col-span-4 '>Product</div>
              <div className='col-span-1 flex  justify-center'>Price</div>
            </div>
            <hr className='border-2 mb-4'/>
            <CategoryList books={books}/>
          </div>
        </main>
      )
}

export default Component