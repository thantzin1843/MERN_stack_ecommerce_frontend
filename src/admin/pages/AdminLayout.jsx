import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBarNav from '../components/AdminSideBarNav'
import AdminTopNav from '../components/AdminTopNav';

function AdminLayout() {
  const [show, setShow] = useState(false)
  const changeNavbarShow = () =>{
    setShow(!show);
  }
  return (
    <div className='flex flex-row'>
        <AdminSideBarNav show={show}/>
        
        <div className='w-full px-5'>
          <AdminTopNav changeNavbarShow={changeNavbarShow}/>
          <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout