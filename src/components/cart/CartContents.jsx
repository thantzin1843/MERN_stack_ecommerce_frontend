import React, { useEffect, useState } from 'react'
import { RiDeleteBin2Line, RiDeleteBin3Line } from 'react-icons/ri'
import { useCartItemContext } from '../../../context/cartItemContext'

function CartContents() {
    const {cartProducts,fetchCartItems,cart} = useCartItemContext();
     
    const deleteCartItem = async(pid, size, color) =>{
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            const payload = {
                productId:pid,
                size,color,
                userId:userInfo?._id
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },
                body:JSON.stringify(payload)
            })
            const data = await response.json();
            console.log(data)
            fetchCartItems()
        } catch (error) {
            console.log(error.message)
        }
    }

       const updateItemQuantity = async(pid, size, color,quantity,action) =>{
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            const payload = {
                productId:pid,
                size,color,
                userId:userInfo?._id,
                quantity,
                action
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },
                body:JSON.stringify(payload)
            })
            const data = await response.json();
            console.log(data)
            fetchCartItems()
        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(()=>{
        fetchCartItems()
    },[])
  return (
    <div>
        {
            cartProducts?.map((product,index)=>(
                <div key={index} className='flex items-start justify-between py-4 border-b '>
                    <div className="flex ">
                        <img src={product.image} alt={product.name} className='w-15 h-15 sm:w-20 sm:h-20 object-cover mr-4 rounded'/>
                    
                        <div>
                            <h3>{product.name}</h3>
                            <p className='text-xs sm:text-sm text-gray-500'>
                                {
                                    product?.size && <span>size: {product.size} </span>
                                }
                                
                                {
                                    product?.color && <span>| color: {product.color} </span>
                                }</p>
                            <div className="flex items-center mt-2 space-x-3">
                                <button onClick={()=>updateItemQuantity(product.productId,product?.size,product?.color,product?.quantity,'minus')} className='border rounded px-2 py-1 text-xl font-medium '>-</button>
                                <span>{product.quantity}</span>
                                <button disabled={product.quantity >= product.stockLimit} onClick={()=>updateItemQuantity(product.productId,product?.size,product?.color,product?.quantity,'plus')} className='border rounded px-2 py-1 text-xl font-medium '>+</button>
                            </div>
                            <p className='text-xs mt-3 text-red-500'>Available Stock: {product.stockLimit}</p>
                        </div>
                    </div>

                    <div>
                        <p className='text-xs sm:text-[16px]'>Unit Price - ${product.price}</p>
                        <p className='text-xs sm:text-[16px]'>Subtotal - $ {product.price * (1-product.discountPrice/100) * product.quantity}</p>
                        <p className='text-red-500 text-xs sm:text-[16px]'>{product.discountPrice}% off</p>
                        <button onClick={()=>deleteCartItem(product.productId,product?.size,product?.color)}>
                            <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-600'/>
                        </button>
                    </div>
                </div>
            ))  
        }

        {
            cartProducts.length > 0 ?(
        <div className="flex justify-between">
            <div className='text-xl font-bold p-3'>Total</div>
            <div className='text-xl font-bold p-3'>$ {cart.totalPrice}</div>
        </div>
            ):(
            <div className='text-gray-400 text-xl text-center'>
                No product in the cart.
            </div>
            )
        }
    </div>
  )
}

export default CartContents