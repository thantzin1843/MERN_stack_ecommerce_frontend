import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'

function AdminSideBarNav({show}) {
  const location = useLocation()
  const path = location.pathname;

  const makeActive = (p) =>{
    if(path === p){
      return "bg-gray-200"
    }
    return ""
  }

     const handleLogOut = () =>{
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userToken");
        window.location.href = '/login'
    }

  return (
    <>
      <div className='hidden md:flex md:w-1/4 lg:w-1/5 h-screen flex-col p-10 justify-between border-r border-r-gray-300 sticky top-0 z-50'>
        <div className='space-y-15'>
          <div className="font-bold text-3xl text-orange-400">
          BokBaNi
          </div>
          <nav className='flex flex-col space-y-5'>
            <Link to={'/admin/dashboard'} className={`rounded-md p-2 hover:bg-gray-100 ${makeActive('/admin/dashboard')}`}>Dashboard</Link>
            <Link to={'/admin/product/list'} className={`rounded-md p-2 hover:bg-gray-100 ${makeActive('/admin/product/list')}`}>Products</Link>
            <Link to={'/admin/order/list'} className={`rounded-md p-2 hover:bg-gray-100 ${makeActive('/admin/order/list')}`}>Orders</Link>
            <Link to={'/admin/user/list'} className={`rounded-md p-2 hover:bg-gray-100 ${makeActive('/admin/user/list')}`}>Customers</Link>
            <Link to={'/admin/profile'} className={`rounded-md p-2 hover:bg-gray-100 ${makeActive('/admin/profile')}`}>Profile</Link>
            
          </nav>
        </div>

        <button onClick={()=>handleLogOut()} className='bg-black text-white p-2 rounded-md hover:bg-[#000000ee] cursor-pointer '>
          <BiLogOut className='inline h-6 w-6'/>  Logout 
          </button>
      </div>

       <div className={`w-1/2 z-50 min-h-screen flex flex-col p-10 justify-between fixed border-r border-r-gray-300 bg-white
         transform transititon-transform duration-500 top-0 left-0 ${show ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='space-y-15'>
          <div className="font-bold text-3xl text-orange-400">
          BokBaNi
          </div>
          <nav className='flex flex-col space-y-5'>
            <Link to={'/'} className={`rounded-md p-2 hover:bg-gray-100 ${makeActive('/admin/dashboard')}`}>Dashboard</Link>
            <Link to={'/admin/product/list'} className={`rounded-md p-2 hover:bg-gray-100 ${makeActive('/admin/product/list')}`}>Products</Link>
            <Link to={'/admin/order/list'} className={`rounded-md p-2 hover:bg-gray-100 ${makeActive('/admin/order/list')}`}>Orders</Link>
            <Link to={'/admin/user/list'} className={`rounded-md p-2 hover:bg-gray-100 ${makeActive('/admin/user/list')}`}>Customers</Link>
            <Link to={'/admin/profile'} className={`rounded-md p-2 hover:bg-gray-100 ${makeActive('/admin/profile')}`}>Profile</Link>
            
          </nav>
        </div>

        <button onClick={()=>handleLogOut()} className='bg-black text-white p-2 rounded-md hover:bg-[#000000ee] cursor-pointer '>
          <BiLogOut className='inline h-6 w-6'/>  Logout 
        </button>
      </div>
    </>
  )
}

export default AdminSideBarNav