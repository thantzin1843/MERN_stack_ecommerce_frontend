import React from 'react'
import TopBar from '../layout/TopBar'
import Navbar from '../layout/Navbar'

function Header() {
  return (
    <div className='border-b border-gray-200 '>
        {/* topbar */}
        <TopBar/>
        {/* navbar */}
        <Navbar/>
        {/* cart drawer */}
        
    </div>
  )
}

export default Header