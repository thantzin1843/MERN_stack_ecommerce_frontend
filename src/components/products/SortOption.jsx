import React from 'react'
import { useSearchParams } from 'react-router-dom'

function SortOption() {
    const [searchParams, setSearchParams] = useSearchParams()
    const handleSortChange = (e) =>{
        const sortBy = e.target.value;
        searchParams.set('sortBy',sortBy);
        setSearchParams(searchParams)
    }
  return (
                <div className="flex justify-end w-full pe-5">
                    <select onChange={handleSortChange} value={searchParams.get('sortBy') || ''} name="sort" id="" className='p-2 rounded-md border border-gray-400'>
                        <option value="">Default</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                        <option value="popularity">Popularity</option>
                    </select>
                </div>
  )
}

export default SortOption