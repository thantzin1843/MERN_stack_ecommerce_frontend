import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function NewArrival() {
    const [arrivals, setArrivals] = useState([]);


    const fetchNewArrivals = async() =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
            console.log(response.data)
            setArrivals(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchNewArrivals()
        
    },[])
    // for scroll indicator
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft , setScrollLeft] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = (direction) =>{
        const scrollAmount = direction==='left' ? -500 : 500;
        scrollRef.current.scrollBy({left:scrollAmount, behavior:"smooth"})
    }

    const updateScrollbuttons = () =>{
        const container = scrollRef.current;
        if(container){
            const leftScroll = container.scrollLeft;
            const rightScroll = container.scrollWidth - (container.scrollLeft+container.clientWidth) > 0;
            // console.log((container.scrollWidth - (container.scrollLeft+container.clientWidth)) > 0)
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScroll)
        }
        // console.log({
        //     scrollLeft:container.scrollLeft,
        //     clientWidth: container.clientWidth,
        //     containerScrollWidth : container.scrollWidth,
        //     offsetLeft: scrollRef.current.offsetLeft
        // })
    }

    const handleMouseDown = (e) =>{
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    }
    const handleMouseMove = (e) =>{
        if(!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    }
     const handleMouseUpOrLeave = () =>{
        setIsDragging(false);

    }
    useEffect(()=>{
        const container = scrollRef.current;
        if(container){
            container.addEventListener('scroll',updateScrollbuttons);
            updateScrollbuttons()
        }
    },[])


  return (
    <section className='px-4 md:px-0 my-5'>
        <div className="container  mx-auto text-center mb-15 relative">
            <h2 className="text-3xl font-bold">Explore New Arrivals</h2>
            <p className="text-sm tracking-tighter md:text-lg text-gray-600 mb-8 px-12">
                Discover the latest styles straight off the runaway, freshy added to keep your wardrobe on the cutting edge of fashions.
            </p>

            {/* scroll button */}
            <div className='absolute right-5 bottom-[-45px] flex space-x-2'>
                <button disabled={!canScrollLeft} onClick={()=>scroll("left")} className={`p-2 rounded border bg-white text-black ${canScrollLeft ? "bg-white text-black": "bg-gray-200 text-gray-400"}`}>
                    <FiChevronLeft className='text-2xl'/>
                </button>

                <button disabled={!canScrollRight} onClick={()=>scroll("right")} className={`p-2 rounded border bg-white text-black ${canScrollRight ? "bg-white text-black": "bg-gray-200 text-gray-400"}`}>
                    <FiChevronRight className='text-2xl'/>
                </button>

            </div>
        </div>

        {/* Scrollable contents */}
        <div 
        onMouseDown={handleMouseDown} 
        onMouseMove={handleMouseMove} 
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
         ref={scrollRef} className={`hideIndi container px-5 md:px-12 mx-auto overflow-x-scroll flex space-x-3 relative ${isDragging ? " cursor-grabbing": "cursor-grab"}`}>
            {
                arrivals?.map((product,index)=>(
                     <Link key={index} className='min-w-[100%] sm:min-w-[35%] lg:min-w-[20%] relative'  to={`/products/${product._id}`}>
                        <div >
                        <img draggable={false} className='select-none w-full h-[300px] object-cover rounded-lg' src={product.images[0]} alt="" />
                        <div  className=' absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg
                        '>
                            <Link to={`/products/${product._id}`} className='block'><h4 className='font-medium'>{product.name}</h4></Link>
                            <p className='mt-1 '>$ {product.hasVariants ? product?.variants[0]?.price : product?.price}</p>
                        </div>
                     </div>   
                     </Link>
                ))
            }
        </div>
        
    </section>
  )
}

export default NewArrival