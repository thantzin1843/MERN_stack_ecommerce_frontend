import React from 'react'
import { BiCalendar } from 'react-icons/bi'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { HiBars3BottomRight } from 'react-icons/hi2'
function AdminTopNav({changeNavbarShow}) {
  return (
    <div className='h-[60px] w-full flex items-center justify-between py-10 border-b border-b-gray-300 sticky top-0 z-20 bg-white'>
      <div className="flex gap-1 flex-col">
        
        <div className="font-medium text-xl">Admin Dashboard</div>
        <div><BiCalendar className='inline w-6 h-6'/> {new Date().toLocaleDateString()}</div>
      </div>
      <div className="flex gap-3 items-center">
        <img src="/jeans.jpg" className='w-10 h-10 rounded-full' alt="" />
        <div className='hidden md:block space-y-1'>
          <div className='font-medium '>Thant Zin Win</div>
          <span className='text-xs bg-black text-white px-2 py-1 rounded-md'>Admin</span>
        </div>
        <button className="block md:hidden p-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer" onClick={changeNavbarShow}>
           <HiBars3BottomRight className='h-6 w-6 text-gray-700'/>
        </button>
      </div>
    </div>
  )
}

export default AdminTopNav