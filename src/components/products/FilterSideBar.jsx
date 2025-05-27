import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSearchContext } from '../../../context/searchContext';
const colors = ['red','blue','black','orange','yellow','Green','gray']
function FilterSideBar({open, handleOpen, fetchProducts}) {
    const {searchText, setSearchText} = useSearchContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        category:'',
        gender:"",
        color:'',
        size:[],
        minPrice:0,
        maxPrice:10000,
        search:""
    })

    const [priceRange, setPriceRange] = useState([0,10000])

    useEffect(()=>{
        const params = Object.fromEntries([...searchParams])
        console.log(searchText)
        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(',') : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 10000,
            search:searchText
        })

        setPriceRange([0,params.maxPrice || 10000])
        fetchProducts()
    },[searchParams])

    // filter changes
    const handleFilterChange= (e) =>{
        const {name, value, checked , type} = e.target;
        console.log({name,value,checked,type});

        let newFilters = {...filters};
        if(type == 'checkbox'){
            if(checked){
                newFilters[name] = [...(newFilters[name] || []),value]
            }else{
                newFilters[name] = newFilters[name].filter((item)=>item !== value)
            }
        }else{
            newFilters[name] = value
        }
        setFilters(newFilters)
        console.log(newFilters)
        updateURLParams(newFilters)
    }

    const updateURLParams = (newFilters) =>{
        const params = new URLSearchParams();
        // {category:'topwear' , size:['xs','s']}
        Object.keys(newFilters).forEach((key)=>{
            if(Array.isArray(newFilters[key]) && newFilters[key].length > 0){
                params.append(key, newFilters[key].join(',')) // 'xs', 's'
            }else if(newFilters[key]){
                params.append(key,newFilters[key])
            }
        })
        setSearchParams(params)
        navigate(`?${params.toString()}`) // ?category=BottomWear
    }

    const handlePriceChange = (e) =>{
        const newPrice = e.target.value;
        setPriceRange([0,newPrice])
        const newFilters = {...filters, minPrice:0, maxPrice:newPrice}
        setFilters(newFilters)
        updateURLParams(newFilters)
    }

  return (
      <div className={`w-1/2 shadow-lg z-50 bg-white fixed top-0 left-0 min-h-screen p-5 transform transition-transform duration-300 
                    ${open? 'translate-x-0' : '-translate-x-full'}`}>
                 <div className="flex justify-between">
                    <h1 className='font-medium mb-5 text-xl'>Filter</h1>
                    <IoMdClose onClick={()=>handleOpen(false)} className='h-6 w-6 text-gray-600 cursor-pointer hover:scale-110'/>
                 </div>
                <div className='mb-5'>
                    <h3 className='text-lg font-medium mb-2'>Category</h3>
                    <div className=''><input type="radio" name="category" id="" className='w-4 h-4 '  value='top-wear' onChange={handleFilterChange}/>&nbsp; Top Wear</div>
                    <div className=''><input type="radio" name="category" id="" className='w-4 h-4'  value='bottom-wear' onChange={handleFilterChange}/>&nbsp; Bottom Wear</div>
                </div>

                <div className='mb-5'>
                    <h3 className='text-lg font-medium mb-2'>Gender</h3>
                    <div className=''><input type="radio" name="gender" id="" className='w-4 h-4 '  value='Male' onChange={handleFilterChange}/>&nbsp; Men</div>
                    <div className=''><input type="radio" name="gender" id="" className='w-4 h-4'  value='Female' onChange={handleFilterChange}/>&nbsp; Women</div>
                    <div className=''><input type="radio" name="gender" id="" className='w-4 h-4'  value='Unisex' onChange={handleFilterChange}/>&nbsp; Unisex</div>
                </div>

                <div className='mb-5'>
                    <h3 className='text-lg font-medium mb-2'>Color</h3>
                    <div className="flex flex-wrap gap-2 ">
                        {
                            colors.map((c,index)=>(
                                <button key={index} className={`w-7 h-7 rounded-full ${filters.color == c ? 'border-2 border-gray-500' : ''}`} type='button' style={{backgroundColor:c}} name='color' value={c} onClick={handleFilterChange}></button>
                            ))
                        }
                    </div>
                </div>

                <div className='mb-5'>
                    <h3 className='text-lg font-medium mb-2 '>Size</h3>
                    <div className=''><input type="checkbox" name="size" value="xs" id="" onChange={handleFilterChange} checked={filters.size.includes('xs')} className='w-4 h-4'/>&nbsp;XS</div>
                    <div className=''><input type="checkbox" name="size" value="s" id="" onChange={handleFilterChange}  className='w-4 h-4' checked={filters.size.includes('s') }/>&nbsp;S</div>
                    <div className=''><input type="checkbox" name="size" value="m" id=""  onChange={handleFilterChange} className='w-4 h-4' checked={filters.size.includes('m') }/>&nbsp;M</div>
                    <div className=''><input type="checkbox" name="size" value="l" id=""  onChange={handleFilterChange} className='w-4 h-4' checked={filters.size.includes('l') }/>&nbsp;L</div>
                    <div className=''><input type="checkbox" name="size" value="xl" id="" onChange={handleFilterChange}  className='w-4 h-4' checked={filters.size.includes('xl') }/>&nbsp;XL</div>
                    <div className=''><input type="checkbox" name="size" value="xxl" id="" onChange={handleFilterChange}  className='w-4 h-4' checked={filters.size.includes('xxl') }/>&nbsp;XXL</div>
         
                </div>

                <div className='mb-5'>
                    <h3 className='text-lg font-medium mb-2 '>Price</h3>
                    
                    <input value={priceRange[1]} onChange={handlePriceChange} type="range" name="priceRange" id="" className='w-full' min={0} max={10000}/>
                    <div className="flex justify-between text-gray-600 mt-2">
                        <span>$0</span>
                        <span>$10000</span>
                    </div>
                </div>
            </div>
  )
}

export default FilterSideBar