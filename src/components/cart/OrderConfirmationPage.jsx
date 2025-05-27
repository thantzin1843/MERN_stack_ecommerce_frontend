import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const checkout = {
    _id:"12345",
    createdAt: new Date(),
    checkoutItems:[
        {
            productId:'1',
            name:'Jacket',
            color:'black',
            size:'M',
            price:150,
            quantity: 3,
            image:'/jeans.jpg',    
        },
        {
            productId:'2',
            name:'T-shirt',
            color:'red',
            size:'L',
            price:100,
            quantity: 1,
            image:'/jeans.jpg',    
        },
    ],
    shippingAddress:{
        address:"123 Fashion Street",
        city:"New York",
        country: "USA",
    }
}

function getDatePlus10Days() {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 10);

  // Optional: format the date as YYYY-MM-DD
  const formatted = futureDate.toISOString().split('T')[0];
  return formatted;
}
function OrderConfirmationPage() {
    const [orderInfo, setOrderInfo] = useState({})
    const {id} = useParams();
    console.log(id)

    const getOrderInformation = async(req, res) =>{
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`,{
                method:'get',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },

            })
            const data = await res.json();
            console.log(data);
            setOrderInfo(data);
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getOrderInformation()
    },[])

  return (
    <div className='mt-6 p-6 w-full lg:w-1/2 mx-auto'>
        <h1 className='text-center text-orange-500 font-bold text-3xl mb-3'>Thank You For Your Order!</h1>

        <div className="border border-gray-300 p-5 rounded-md">
            <div className="flex flex-wrap justify-between">
                <div className="">
                    <h2 className='font-medium'> Order ID: {orderInfo?._id}</h2>
                    <p className="text-gray-500 text-sm">Order Date: {new Date(orderInfo?.createdAt).toLocaleDateString()}</p>
                </div>
                <div className='text-green-500'>
                    Estimated Delivery: {getDatePlus10Days()}
                </div>
            </div>

            <div className="my-10 space-y-3">

                {
                            orderInfo?.orderItems?.map((product,index)=>(
                                <div key={index} className='flex items-start justify-between py-4 border-b '>
                                    <div className="flex items-center">
                                        <img src={product.image} alt={product.name} className='w-20 h-20 object-cover mr-4 rounded'/>
                                    
                                        <div>
                                            <h3>{product.name}</h3>
                                            <p className='text-sm text-gray-500'>
                                                {
                                                    product?.size && <span>size: {product.size} </span>
                                                }
                                                
                                                {
                                                    product?.color && <span>| color: {product.color} </span>
                                                }</p>
                                            <div className="flex items-center mt-2 space-x-3">
                                                <span>Quantity : {product.quantity}</span>
                                               
                                            </div>
                                           
                                        </div>
                                    </div>
                
                                    <div>
                                        <p className=''>Unit Price - ${product.price}</p>
                                        <p className=''>Subtotal - $ {product.price * (1-product.discountPrice/100) * product.quantity}</p>
                                        <p className='text-red-500'>{product.discountPrice}% off</p>
                                      
                                    </div>
                                </div>
                            ))  
                        }
            </div>

            <div className="grid grid-cols-2">
                <div>
                    <h2 className='font-medium'>Payment</h2>
                    <p className='text-sm mt-2 text-gray-500 uppercase'>{orderInfo?.paymentMethod} pay</p>
                </div>
                <div>
                    <h2 className='font-medium'>Delivery</h2>
                    <p className='text-sm mt-2 text-gray-500 UpperCase'>{orderInfo?.shippingAddress?.address}</p>
                    <p className='text-sm text-gray-500 '>{orderInfo?.shippingAddress?.city}, {orderInfo?.shippingAddress?.country}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderConfirmationPage