import React, { useEffect, useState } from 'react'
import MyOrderPage from '../components/products/MyOrderPage'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    // const [orders, setOrders] = useState([])
    
    const [userInfo, setUserInfo] = useState({})
    useEffect(()=>{
        setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
    },[])

    const checkLogin = async() =>{
        if(!localStorage.getItem('userToken')){
            navigate('/login')
        }
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo)

        try {
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
        checkLogin()
    },[])

    const handleLogOut = () =>{
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userToken");
        window.location.href = '/login'
    }
  return (
    <div className='min-h-screen flex flex-col '>
        <div className="flex-grow container mx-auto p-6 md:p-6 ">
            <div className="flex flex-col lg:flex-row md:space-x-6 space-y-6 md:space-y-6">
                <div className="w-full lg:w-1/4 bg-white p-3 md:p-8 rounded-lg shadow-lg space-y-2">
                    <Link to={'/profile/change_password'} className='text-3xl font-semibold'>{user?.name}</Link>
                    <p className='mb-5'>{user?.email}</p>
                     <Link to={'/profile/my-orders'} className='bg-black text-white w-full inline-block text-center px-3 py-2 rounded-md text-sm'>
                               My Orders
                     </Link>

                    {
                        userInfo?.role == 'admin' && (
                            <Link to={'/admin/dashboard'} className='bg-black text-white w-full inline-block text-center px-3 py-2 rounded-md text-sm'>
                               Go To Admin Dashboard
                            </Link>
                        )
                    }
                    <button onClick={handleLogOut} className='bg-red-500 mt-5 hover:bg-red-400 cursor-pointer text-white py-2 w-full rounded-lg '>
                        Logout
                    </button>

                </div>

                {/* Orders page */}
               {/* <MyOrderPage orders={orders}/> */}
               <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Profile