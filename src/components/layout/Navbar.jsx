import React, { useEffect, useState } from 'react'
import { HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import SearchBar from '../common/SearchBar'
import CartDrawer from './CartDrawer'
import { IoMdClose } from 'react-icons/io'
import { useCartItemContext } from '../../../context/cartItemContext'

function Navbar() {
      const [open, setOpen] = useState(false);
      const [navOpen, setNavOpen] = useState(false);
      const {cartProducts} = useCartItemContext()
      const toggleDrawerOpen = () =>{
        setOpen(!open);
      }

  return (
    <>
    <nav className='container mx-auto flex justify-between items-center py-4 px-6 '>
        {/* left logo */}
        <div>
            <Link to={'/'} className='text-2xl font-medium'>
                BokBaNi
            </Link>
        </div>
        {/* Center - navigation links */}
        <div className="hidden md:flex space-x-6 ">
            <Link to={'/products/list?gender=Male'} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                Men
            </Link>

            <Link to={'/products/list?gender=Female'} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                Women
            </Link>

            <Link to={'/products/list'} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                Explore!
            </Link>

        </div>
        
        <div className="flex items-center space-x-4">
            {/* <Link to="/profile" className='hover:text-black '>
                <HiOutlineUser className='h-6 w-6 text-gray-700'/>
            </Link> */}
            
            
            <Link to={'/profile/change_password'} className='p-2 rounded-full hover:bg-gray-200'>
                <HiOutlineUser className='h-6 w-6 text-gray-700 '/>
            </Link>

            <button onClick={toggleDrawerOpen} className='relative hover:text-black'>
                <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'/>
                <span className='px-2 absolute top-0 bg-[#ea2e0e] text-white text-xs rounded-full'>{cartProducts?.length}</span>
            </button>
            {/* Search */}
            <div className="overflow-hidden">
                <SearchBar/>
            </div>

            <button className='hover:text-black md:hidden' onClick={()=>setNavOpen(!navOpen)}>
                <HiBars3BottomRight className='h-6 w-6 text-gray-700'/>
            </button>
            
        </div>
    </nav>

    {/* Drawer */}
    <CartDrawer open={open} toggleDrawerOpen={toggleDrawerOpen}/>

    <div className={`h-full w-3/4 sm:w-1/2 md:w-[30rem] bg-white shadow-md fixed top-0 left-0 
        transform  transition-transform duration-300 z-50 ${navOpen ?'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex justify-end p-5'>
            <button onClick={()=>setNavOpen(false)} className='hover:bg-gray-200 rounded-full p-1 '>
                <IoMdClose className='w-6 h-6 '/>
            </button>
            
        </div>
        <div className='p-4'>
            <h2 className='text-xl font-semibold mb-4'>Menu</h2>
            <nav className='flex flex-col space-y-4'>
                    <Link to={`/products/list?gender=Male`} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Men
                    </Link>

                   <Link to={'/products/list?gender=Female'} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Women
                    </Link>

                    <Link to={'/products/list'} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Top Wear
                    </Link>

                    <Link to={'/products/list'} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Bottom Wear
                    </Link>

                    <Link to={'/products/list'} className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Explore!
                    </Link>

            </nav>
        </div>
    </div>
    </>
  )
}

export default Navbar