import React from 'react'
import womenImg from '../../assets/womens-collection.webp'
import menImg from '../../assets/mens-collection.webp'
import { Link } from 'react-router-dom'

function GenderCollection() {
  return (
    <section>
        <div className="container p-12 mx-auto">
            <div className="flex flex-col gap-3  md:flex-row">
                <div className="relative md:w-1/2 h-[400px] md:h-[600px] lg:h-[630px] ">
                
                <img src={womenImg} className='w-full h-full object-cover' alt="" />
                <div className="absolute space-y-3 bg-white bottom-5 left-5 py-3 px-5 md:px-10">
                    <div className='text-2xl md:text-3xl font-semibold'>Women's Collection </div>
                    <Link to={'/products/list?gender=Female'}  className='bg-black text-white p-2 rounded-lg'>Shop Now</Link>
                </div>
                </div>
                
                <div className="relative md:w-1/2 h-[400px] md:h-[600px] lg:h-[630px] ">
                
                <img src={menImg} className='w-full h-full object-cover' alt="" />
                <div className="absolute space-y-3 bg-white bottom-5 left-5 py-3 px-5 md:px-10">
                    <div className='text-2xl md:text-3xl font-semibold'>Men's Collection </div>
                    <Link  to={'/products/list?gender=Male'} className='bg-black text-white p-2 rounded-lg'>Shop Now</Link>
                </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GenderCollection