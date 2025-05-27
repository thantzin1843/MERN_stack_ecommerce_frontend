import React, { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import ProductListTable from '../components/ProductListTable'
import { Link } from 'react-router-dom'
import { PiPlusCircle } from 'react-icons/pi'

function ProductListPage() {
  const [products , setProducts] = useState();
  const [searchText,setSearchText] = useState('');
  const fetchProducts = async() =>{
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products?search=${searchText}`);
      const data = await res.json();
      console.log(data)
      setProducts(data);
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchProducts()
  },[searchText])
  return (
    <div>
        <div className="flex justify-between py-5">
            <div>
              <Link to={`/admin/product/createForm`} className='p-2 bg-orange-400 rounded-md text-white flex items-center gap-2'><PiPlusCircle className='inline w-6 h-6'/> Create Product</Link>
            </div>

            <div className='flex items-center gap-2'>
                <input onChange={(e)=>setSearchText(e.target.value)} type="text" name="" id="" className="px-2 py-1 border-1 rounded-md border-gray-300" placeholder='Search'/>
                <button className='bg-orange-400 text-white rounded-md py-2 px-3' onClick={fetchProducts}>
                    <FaMagnifyingGlass className=''/>
                </button>
            </div>
        </div>

        <ProductListTable products={products}/>
       
    </div>
  )
}

export default ProductListPage