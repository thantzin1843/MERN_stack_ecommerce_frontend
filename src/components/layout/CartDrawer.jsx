import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import CartContents from '../cart/CartContents';
import { useNavigate } from 'react-router-dom';
import { useCartItemContext } from '../../../context/cartItemContext';

function CartDrawer({open, toggleDrawerOpen}) {
  const navigate = useNavigate();
  const {cartProducts} = useCartItemContext()
  
  const goToCheckout =()=>{
    toggleDrawerOpen();
    navigate('/checkout')
  }

  return (
    <div className={`fixed top-0 right-0 w-4/5 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg 
    transform transition-transform duration-300 z-50 flex flex-col ${open? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-end p-4">
        <button onClick={toggleDrawerOpen} className='hover:bg-gray-200 rounded-full p-1'>
          <IoMdClose className='h-6 w-6 text-gray-600'/>
        </button>
      </div>
      {/* cart contents with scrollable area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className='text-xl font-semibold mb-4 '>Your Cart</h2>
        {/* Cart content component */}
        <CartContents/>
      </div>

      {/* Checkout button with fix position */}
      {
        cartProducts?.length>0 && (
          <div className="p-4 bg-white sticky bottom-0">
            <button onClick={goToCheckout} className='bg-gray-950 text-white w-full p-3 rounded-lg font-semibold hover:bg-gray-900'>Checkout</button>
            <p className='text-sm tracking-tighter mt-2 text-center'>Shipping, taxes and discount codes calculated at the checkout.</p>
          </div>
        )
      }
    </div>
  )
}

export default CartDrawer