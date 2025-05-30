import React, { useState } from 'react'

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})
    const handlePasswordChange = async(e)=>{
        e.preventDefault()
        const errors = {}
        if(!oldPassword || !newPassword || !confirmPassword){
            errors.empty = "All fields must be filled!";
        }
        if(newPassword && newPassword.length < 6){
            errors.plength = "Password length must be greater than or equal to 6."
        }
        if(newPassword !== confirmPassword){
            errors.match = "Confirm Password need to match with new password!";
        }
        setErrors(errors)
        if(Object.keys(errors).length > 0){
            return ;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/change_password`,{
                method:'put',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },
                body:JSON.stringify({newPassword,oldPassword})
            })
            const data = await res.json();
            console.log(data)
        } catch (error) {
            
        }
    }
  return (
    <div className='py-5 mt-10 border-t border-t-gray-200'>
        <h3 className='text-xl font-medium'>Change Password</h3>
        <form onSubmit={handlePasswordChange} className='w-full md:w-1/2'>
                <span className='text-red-500 text-sm'>{errors?.empty}</span>
                <div className="my-4">
                    <label htmlFor="" className="block text-sm">Old Password</label>
                    <input type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} name=""  className='w-full p-2 border rounded ' placeholder='Enter your password address.'   />
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="block text-sm">New Password</label>
                    <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} name=""  className='w-full p-2 border rounded ' placeholder='Enter your password.'   />
                    <span className='text-red-500 text-sm'>{errors?.plength}</span>
                </div>

                 <div className="mb-4">
                    <label htmlFor="" className="block text-sm">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} name=""  className='w-full p-2 border rounded ' placeholder='Enter your password.'   />
                    <span className='text-red-500 text-sm'>{errors?.match}</span>
                </div>

                <button type="submit" className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition '>
                    Change Password
                </button>
        </form>
    </div>
  )
}

export default ChangePassword