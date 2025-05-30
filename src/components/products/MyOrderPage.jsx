import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MyOrderPage() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
     const getColor = (status) =>{
            console.log(status)
            if(status == "Pending"){
                return "bg-yellow-500 text-white"
            }else if(status == "Processing"){
                return "bg-blue-500 text-white"
            }else if(status == "Delivered"){
                return "bg-green-500 text-white"
            }else{
                return "bg-red-500 text-white"
            }
    }

    const fetchMyOrders = async() =>{
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders?user=${userInfo._id}`,{
                method:'get',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },
            })
            const data = await res.json();
            console.log(data)
            setOrders(data)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        fetchMyOrders()
    },[])
  return (
                <div className="w-full lg:w-3/4 bg-white">
                    <h1 className='text-xl font-semibold'>My Orders</h1>
                    <div className="overflow-scroll md:overflow-hidden  w-full rounded-lg shadow-xl mt-3">
                        <table className='w-full'>
                        <tr className='bg-gray-400 ' >
                            <th className='text-start sm:text-sm p-3 '>IMAGE</th>
                            <th className='text-start sm:text-sm p-3'>ORDER ID</th>
                            <th className='text-start sm:text-sm p-3'>CREATED AT</th>
                            <th className='text-start sm:text-sm p-3'>SHIPPING ADDRESS</th>
                            <th className='text-start sm:text-sm p-3'>TOTAL PRICE</th>
                            <th className='text-start sm:text-sm p-3'>STATUS</th>
                        </tr>
                        {
                            orders.length > 0 ? (
                                orders.map((order, index)=>(
                                    <tr key={index} onClick={()=>navigate(`/order/${order._id}`)}>
                                        <td className='text-start text-xs p-3'>
                                            <img src={order?.orderItems[0].image} className='w-15 h-15 rounded-md' alt="" />
                                        </td>
                                        <td className='text-start text-xs p-3'>{order._id}</td>
                                        <td className='text-start text-xs p-3'>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className='text-start text-xs p-3'>{order?.shippingAddress?.city}, {order?.shippingAddress?.country}</td>
                                        <td className='text-start text-xs p-3'>$ {order?.totalPrice}</td>
                                        <td className='text-start text-xs p-3'>
                                            <span className={`py-1 px-3  rounded-full ${getColor(order?.status)}`}>{order?.status}</span>
                                            {/* <span className='bg-yellow-300 py-1 px-3  rounded-full '>Pending</span>
                                            <span className='bg-red-300 py-1 px-3  rounded-full '>Rejected</span> */}
                                        </td>
                                    </tr>
                                ))
                            ):(
                                <div className='text-center text-md py-3'>No order yet.</div>
                            )
                        }
                        
                    </table>
                    </div>
                </div>
  )
}

export default MyOrderPage