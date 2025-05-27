import React, { useEffect, useState } from 'react'
import Hero from '../components/layout/Hero'
import GenderCollection from '../components/products/GenderCollection'
import NewArrival from '../components/products/NewArrival'
import ProductDetail from '../components/products/ProductDetail'
import BestSeller from '../components/products/BestSeller'


function Home() {
  
  return (
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArrival/>

        {/* Best Seller Section */}
        <h2 className='text-3xl text-center font-bold mb-4'>
          Best Seller
        </h2>
        <BestSeller/>

    </div>
  )
}

export default Home