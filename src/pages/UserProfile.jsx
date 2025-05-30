import React, { useEffect, useState } from 'react'
import { BiCamera, BiEdit } from 'react-icons/bi'
import { toast } from 'sonner'
import ProfileImageChange from '../admin/components/ProfileImageChange'
import ChangePassword from '../admin/components/ChangePassword'

function UserProfile() {
    const [nameEdit, setNameEdit] = useState(false)
    const [user, setUser] = useState({})
    const [name, setName] = useState("")
    const fetchUser = async() =>{
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },
            })
            const data = await res.json();
            console.log(data);
            setUser(data);
            setName(data?.name)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

    const handleNameChange = async(e) =>{
        e.preventDefault();
        if(name==""){
            toast.error("Name cannot be empty!")
            return
        }
         try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/update_profile`,{
                method:'put',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },
                body:JSON.stringify({
                    name:name
                })
            })
            const data = await res.json();
            console.log(data);
            setUser(data);
            setName(data?.name)
            setNameEdit(false)
        } catch (error) {
            
        }
    }
  return (
    <div className='p-5'>
        <div className="flex flex-wrap gap-5 items-center">
            
            <ProfileImageChange profileImg={user?.profile}/>
            <div className='space-y-2'>
                {
                    nameEdit ? (
                        <form onSubmit={handleNameChange}>
                            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="" className='py-1 px-3 rounded-md border outline-none border-gray-400 text-3xl' id="" />
                            <button type="submit" className='text-3xl py-1 px-3 rounded-md ms-3 text-white bg-orange-400 '>
                                Save
                            </button>
                        </form>
                    ):(
                    <div className="flex items-center gap-5">
                        <h3 className='text-3xl'>{user?.name}</h3><BiEdit className='w-8 h-8' onClick={()=>setNameEdit(!nameEdit)}/>
                    </div>
                    )
                }
                
                    <h2 className='text-xl'>{user?.email}</h2>
                <span className='bg-black text-white p-1 px-5 rounded-md'>{user?.role}</span>
            </div>
        </div>

        {/* Change password */}
        <ChangePassword/>
    </div>
  )
}

export default UserProfile