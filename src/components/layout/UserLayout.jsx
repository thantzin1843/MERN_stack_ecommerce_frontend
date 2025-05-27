import React from 'react'
import Header from '../common/Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <>
        {/* header */}
        <Header/>
        {/* main content */}
        <main>
          <Outlet/>
        </main>
        {/* footer */}
        <Footer/>
    </>
  )
}

export default UserLayout