import React from 'react'
import heroImg from '../../assets/rabbit-hero.webp'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <section className='relative'>
        <img src={heroImg} className='w-full h-[400px] md:h-[600px] lg:h-[630px] object-cover' alt="" />
        <div className="absolute bg-[#00000033] top-0  text-white w-full h-[400px] md:h-[600px] lg:h-[630px] flex flex-col items-center justify-center">
            <h1 className='text-center uppercase text-4xl md:text-9xl font-bold p-6 tracking-tighter mb-4'>vacation
                <br /> Ready
            </h1>
            <div className="text-sm tracking-tighter md:text-lg mb-6">
                Explore our vacation ready outfits with fast worldwide shipping.
            </div>
            <Link to='/products/list' className='bg-white hover:scale-110 transition-all duration-300 text-black px-6 py-2 rounded-sm text-lg '>Shop Now</Link>
        </div>
    </section>
  )
}

export default Hero