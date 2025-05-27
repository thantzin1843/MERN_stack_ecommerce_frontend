import React, { useEffect, useState } from 'react'
import ProductGrid from '../components/products/ProductGrid'
import { FaFilter } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import FilterSideBar from '../components/products/FilterSideBar'
import SortOption from '../components/products/SortOption'
import { useLocation } from 'react-router-dom'
const colors = ['red','blue','black','orange','yellow','green','gray']
import FilterWeb from '../components/products/FilterWeb'
import { useSearchContext } from '../../context/searchContext'
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function Collection() {
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState([]);
    const query = useQuery()
    const {searchText,setSearchText} = useSearchContext()
    const category = query.get("category") || "";
    const gender = query.get("gender") || "";
    const color = query.get("color") || "";
    const maxPrice = query.get("maxPrice") || 10000000;
    const sizes = query.get("size") || []

    const handleOpen = (boolValue) =>{
        setOpen(boolValue)
    }

    const fetchProducts = async() =>{
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products?search=${searchText}&category=${category}&gender=${gender}&maxPrice=${maxPrice}&color=${color}&sizes=${sizes}`);
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
        <div className="flex flex-col lg:flex-row w-full">
            {/* for medium to small screen */}
            <div className="flex lg:hidden justify-end items-center gap-3  py-5 pe-5">
               <button onClick={()=>setOpen(!open)} className='border px-5 py-2 rounded-lg bg-black text-white'>
                <FaFilter className='inline'/> <span>Filter</span>
               </button>
            </div>

            <FilterSideBar open={open} handleOpen={handleOpen} fetchProducts={fetchProducts}/>
               
            <FilterWeb fetchProducts={fetchProducts}/>


            <div className="w-full md:w-4/5">
                <h1 className="text-xl uppercase p-5">all collection</h1>

                <SortOption/>

                {/* product list */}
                <ProductGrid products={products}/>


            </div>
        </div>
    </div>

  )
}

export default Collection