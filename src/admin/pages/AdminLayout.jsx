import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSideBarNav from '../components/AdminSideBarNav'
import AdminTopNav from '../components/AdminTopNav';

function AdminLayout() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const changeNavbarShow = () =>{
    setShow(!show);
  }

  useEffect(()=>{
     const userInfo = JSON.parse(localStorage.getItem('userInfo'))
     const userToken = localStorage.getItem('userToken');
     if(!userToken || !userInfo || userInfo?.role !== 'admin'){
      navigate('/')
     }
  })
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