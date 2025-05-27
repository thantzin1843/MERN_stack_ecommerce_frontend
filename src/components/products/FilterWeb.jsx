
import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSearchContext } from '../../../context/searchContext'
const colors = ['red','blue','black','orange','yellow','Green','gray']

function FilterWeb({fetchProducts}) {
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
            <div className="hidden lg:flex flex-col md:w-[250px] p-5 ps-10">
                <h1 className='font-medium mb-5 text-xl'>Filter</h1>
                <div className='mb-5'>
                    <h3 className='text-lg font-medium mb-2'>Category</h3>
                    <div className=''><input type="radio"  onChange={handleFilterChange} name="category" id="" className='w-4 h-4 '  value='top-wear'/>&nbsp; Top Wear</div>
                    <div className=''><input type="radio"  onChange={handleFilterChange} name="category" id="" className='w-4 h-4'  value='bottom-wear'/>&nbsp; Bottom Wear</div>
                </div>

                <div className='mb-5'>
                    <h3 className='text-lg font-medium mb-2'>Gender</h3>
                    <div className=''><input type="radio" onChange={handleFilterChange} name="gender" id="" className='w-4 h-4 '  value='Male'/>&nbsp; Men</div>
                    <div className=''><input type="radio" onChange={handleFilterChange} name="gender" id="" className='w-4 h-4'  value='Female'/>&nbsp; Women</div>
                    <div className=''><input type="radio" name="gender" id="" className='w-4 h-4'  value='Unisex' onChange={handleFilterChange}/>&nbsp; Unisex</div>
                </div>

                <div className='mb-5'>
                    <h3 className='text-lg font-medium mb-2'>Color</h3>
                    <div className="flex flex-wrap gap-2 w-2/3">
                        {
                            colors.map((c,index)=>(
                                <button key={index} className={`w-7 h-7 rounded-full ${filters.color == c ? 'border-2 border-gray-500' : ''}`} type='button' style={{backgroundColor:c}} name='color' value={c} onClick={handleFilterChange}></button>
                            ))
                        }
                    </div>
                </div>

                <div className='mb-5'>
                    <h3 className='text-lg font-medium mb-2'>Size</h3>
                    <div className=''><input type="checkbox" onChange={handleFilterChange} name="size" value="xs" checked={filters.size.includes('xs')} id="" className='w-4 h-4'/>&nbsp;XS</div>
                    <div className=''><input type="checkbox" onChange={handleFilterChange} name="size" value="s" checked={filters.size.includes('s') } id="" className='w-4 h-4'/>&nbsp;S</div>
                    <div className=''><input type="checkbox" onChange={handleFilterChange} name="size" value="m" checked={filters.size.includes('m') } id="" className='w-4 h-4'/>&nbsp;M</div>
                    <div className=''><input type="checkbox" onChange={handleFilterChange} name="size" value="l" checked={filters.size.includes('l') } id="" className='w-4 h-4'/>&nbsp;L</div>
                    <div className=''><input type="checkbox" onChange={handleFilterChange} name="size" value="xl" checked={filters.size.includes('xl') } id="" className='w-4 h-4'/>&nbsp;XL</div>
                    <div className=''><input type="checkbox" onChange={handleFilterChange} name="size" value="xxl" checked={filters.size.includes('xxl') } id="" className='w-4 h-4'/>&nbsp;XXL</div>
                </div>

                <div className='mb-5'>
                    <h3 className='text-lg font-medium mb-2 '>Price</h3>
                    
                    <input type="range" name="priceRange" value={priceRange[1]} onChange={handlePriceChange} id="" min={0} max={100000} className='w-full appearance-none rounded-full h-2 bg-gray-200'/>
                        
                    <div className="flex justify-between text-gray-600 mt-2">
                        <span>$0</span>
                         <span>$100000</span>
                    </div>
                </div>

            </div>
  )
}

export default FilterWeb