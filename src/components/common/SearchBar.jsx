import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useSearchContext } from '../../../context/searchContext';
import {useLocation, useNavigate} from 'react-router-dom'
function SearchBar() {
    const location = useLocation()
    const navigate = useNavigate()
    const {searchText,setSearchText} = useSearchContext()
    const [isOpen, setIsOpen] = useState(false);
    const handleSearchToggle = () =>{
        setIsOpen(!isOpen);
    }

    const handleSearch = (e) =>{
        e.preventDefault();
        setSearchText(searchText)
        
        
        navigate(`/products/list?search=${searchText}`)
        
        setIsOpen(false)
    }

  
  return (
    <div className={`flex items-center justify-center w-full transition-all 
    duration-300 ${isOpen? "absolute top-0 left-0 w-full bg-white h-24 z-50 " : "w-auto"}`}>
        {isOpen ? (
            <form onSubmit={handleSearch} className='relative flex w-full items-center justify-center'>
                <div className="relative w-1/2 ">
                <input type="text" name="" placeholder='Search' onChange={(e)=>setSearchText(e.target.value)} value={searchText} className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full ' id="" />
                <button  className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 '>
                    <HiMagnifyingGlass className='w-6 h-6 '/>
                </button>
                </div>
                {/* close button */}
                <button onClick={()=>setIsOpen(false)} className='absolute right-4 '>
                    <HiMiniXMark className='w-6 h-6 '/>
                </button>
            </form>
        ): (
            <button onClick={handleSearchToggle}>
                <HiMagnifyingGlass className='h-6 w-6 '/>
            </button>
        )}
    </div>
  )
}

export default SearchBar