import React, { useEffect, useState } from 'react'

function UserListPage() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async() =>{
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`,{
                method:'get',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                }
            })
            const data = await res.json();
            console.log(data)
            setUsers(data);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        fetchUsers()
    },[])

    const changeUserRole = async(role,id) =>{
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/change-role`,{
                method:'put',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },
                body:JSON.stringify({role,userId:id})
            })
            const data = await res.json();
            console.log(data)
            
        } catch (error) {
            
        }
    }
  return (
        <div className=' rounded-lg overflow-x-scroll lg:overflow-hidden  border border-gray-300 mt-10'>
        <table className='w-full text-gray-600'>
            <tr className='bg-gray-300'>
                <td className='text-start p-2'>Profile</td>
                <td className='text-start p-2'>Name</td>
                <td className='text-start p-2'>Email</td>
                <td className='text-start p-2'>Role</td>
            </tr>

            {
                users?.map((user,index)=>(
                <tr key={index} className='border-b border-b-gray-300'>
                    <td className='text-start p-2'>
                        <img src={user?.profile} className='w-12 h-12 rounded-md' alt="" />
                    </td>
                    <td className='text-start p-2 text-xs md:text-sm'>{user?.name}</td>
                    <td className='text-start p-2 text-xs md:text-sm'>{user?.email}</td>
                    <td className='text-start p-2 text-xs md:text-sm'>
                        <select name="" id="" onChange={(e)=>changeUserRole(e.target.value,user?._id)}>
                            <option value="admin" selected={user?.role == "admin"}>Admin</option>
                            <option value="customer" selected={user?.role == "customer"}>Customer</option>
                        </select>
                    </td>
                  
                </tr>
                ))
            }

           

            
        </table>
    </div>
  )
}

export default UserListPage