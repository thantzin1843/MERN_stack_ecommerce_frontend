import React, { useEffect, useState } from 'react'

function Dashboard() {
  const [data, setData] = useState({})

  const fetchDashboradData = async() =>{
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/dashboard`,{
                method:'get',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },
            })
            const data = await res.json();
            console.log(data)
            setData(data)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchDashboradData()
  },[])
  return (
    <div className='mt-10'>
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-4">
        <div className='bg-orange-100 p-3 rounded-md shadow-sm'>
          <div>Products</div>
          <h1 className='text-3xl font-bold mt-3'>{data.productCount}</h1>
        </div>
          <div className='bg-blue-100 p-3 rounded-md shadow-sm'>
          <div>Orders</div>
          <h1 className='text-3xl font-bold mt-3'>{data.orderCount}</h1>
        </div>
          <div className='bg-purple-100 p-3 rounded-md shadow-sm'>
          <div>Users</div>
          <h1 className='text-3xl font-bold mt-3'>{data.userCount}</h1>
        </div>
         <div className='bg-yellow-100 p-3 rounded-md shadow-sm'>
          <div>Total Revenue</div>
          <h1 className='text-3xl font-bold mt-3'>$ {data.total}</h1>
        </div>
      </div>
    </div>
  )
}

export default Dashboard