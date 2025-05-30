import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { FiDelete } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

function ProductListTable({products,fetchProducts}) {
    const handleDeleteProduct = async(id) =>{
        const confirm = window.confirm("Are you sure you want to delete this product?")
        if(confirm){
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,{
                    method:'delete',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':`Bearer ${localStorage.getItem('userToken')}`
                    }
                })
                const data = await res.json();
                fetchProducts()
                console.log(data)
            } catch (error) {
                console.log(error.message)
            }

        }
    }
  return (
    <div className=' rounded-lg overflow-x-scroll lg:overflow-hidden  border border-gray-300'>
        <table className='w-full text-gray-600'>
            <tr className='bg-gray-300'>
                <td className='text-start p-2'>Image</td>
                <td className='text-start p-2'>Name</td>
                <td className='text-start p-2'>Collection</td>
                <td className='text-start p-2'>Category</td>
                <td className='text-start p-2'>Status</td>
                <td className='text-start p-2'>Actions</td>
            </tr>

            {
                products?.map((product,index)=>(
                <tr key={index} className='border-b border-b-gray-300'>
                    <td className='text-start p-2'>
                        <img src={product.images[0] && product.images[0]} className='w-12 h-12 rounded-md' alt="" />
                    </td>
                    <td className='text-start p-2 text-xs md:text-sm'>{product?.name}</td>
                    <td className='text-start p-2 text-xs md:text-sm'>{product?.collection}</td>
                    <td className='text-start p-2 text-xs md:text-sm'>{product?.category}</td>
                    <td className='text-start p-2 text-xs md:text-sm'>
                        <select name="" id="" >
                            <option value="true" selected={product?.isPublished == true}>Published</option>
                            <option value="false" selected={product?.isPublished == false}>Private</option>
                        </select>
                    </td>
                    <td className='text-start p-2 '>
                        <Link to={`/admin/products/editPage/${product?._id}`}><BiEdit className='w-6 h-6 inline me-3'/></Link>
                        <MdDelete className='w-6 h-6 inline ' onClick={()=>handleDeleteProduct(product?._id)}/>
                    </td>
                </tr>
                ))
            }

           

            
        </table>
    </div>
  )
}

export default ProductListTable