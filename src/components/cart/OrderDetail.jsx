import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function OrderDetail() {
      const [orderInfo, setOrderInfo] = useState({})
       const {id} = useParams();
       const navigate = useNavigate()
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
    <div className='my-6 w-full px-6 lg:px-0 lg:max-w-6xl mx-auto'>
        <h1>Order Details</h1>

        <div className="rounded-lg p-5 mt-5 shadow border border-gray-200">
            <div className="flex justify-between">
                <div>
                    <h1 className="font-medium">Order ID: {orderInfo?._id}</h1>
                    <p>{new Date(orderInfo?.createdAt).toLocaleDateString()}</p>
                </div>
                <div className='space-y-1'>
                    <p className="py-1 text-center px-3 bg-yellow-300 text-sm rounded-full">{orderInfo?.status}</p>
                </div>
            </div>

              <div className="grid grid-cols-2 my-10">
                <div>
                    <h2 className='font-medium'>Payment Info</h2>
                    <p className='text-sm mt-2 text-gray-500 '>Payment Method: <span className='uppercase'>{orderInfo?.paymentMethod}</span> pay</p>
                </div>
                <div>
                    <h2 className='font-medium'>Shipping Info</h2>
                    <p className='text-sm mt-2 text-gray-500 '>{orderInfo?.shippingAddress?.address}</p>
                    <p className='text-sm text-gray-500 '>{orderInfo?.shippingAddress?.city}, {orderInfo?.shippingAddress?.country}</p>
                </div>
            </div>

            <h2 className='font-medium'>Products</h2>
            <div className=" mb-5 overflow-scroll md:overflow-hidden  w-full rounded-lg shadow-xl mt-3">
                        <table className='w-full'>
                        <tr className='bg-gray-400 ' >
                            <th className='text-start text-sm p-3'>Image</th>
                            <th className='text-start text-sm p-3'>Name</th>
                            <th className='text-start text-sm p-3'>Unit Price</th>
                            <th className='text-start text-sm p-3'>Quantity</th>
                            <th className='text-start text-sm p-3'>Sub Total</th>
                        </tr>
                        {
                            orderInfo?.orderItems?.map((item,index)=>(
                                    <tr>
                                        <td className='text-start text-xs p-3'>
                                            <img src={item?.image} className='w-15 h-15 rounded-md' alt="" onClick={()=>navigate(`/products/${item?.productId}`)}/>
                                        </td>
                                        <td className='text-start text-xs p-3'>{item?.name}</td>
                                        <td className='text-start text-xs p-3'>$ {item?.price}</td>
                                        <td className='text-start text-xs p-3'>{item?.quantity}</td>
                                        <td className='text-start text-xs p-3'>
                                           $ {(item?.price*item?.quantity)*(1-(item?.discountPrice/100))}
                                            <span className='ms-3 bg-red-500 text-white p-1 rounded-lg'>{item?.discountPrice}%off</span>
                                            </td>
                                        
                                    </tr>

                            ))
                        }
                    </table>
            </div>

            {/* back to orders link */}
            <Link to={'/profile'} className=' text-blue-500 underline '>Back to Orders</Link>


        </div>
    </div>
  )
}

export default OrderDetail