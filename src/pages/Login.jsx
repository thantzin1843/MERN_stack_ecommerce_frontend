import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin =async(e) =>{
        e.preventDefault();
        if(!email || !password){
            toast.error("All fields must be filled!")
            return
        }
        try {
                const response = await fetch('http://localhost:9000/api/user/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,password})
                })
                const data = await response.json();
                if(data.status==400){
                    toast.error("Wrong Email or Password!")
                    return
                }
                localStorage.setItem("userInfo",JSON.stringify(data?.user))
                localStorage.setItem("userToken",data?.token)
                navigate('/')
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='flex '>
        <div className="w-full flex md:w-1/2 flex-col justify-center items-center p-8 md:p-12">
            <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
                <div className="flex justify-center mb-6">
                    <h2 className="text-3xl font-medium">
                        BokBaNi
                    </h2>
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">
                    Hey there! 👋
                </h2>

                <p className="text-center mb-6">
                    Enter your username and password to login
                </p>

                <div className="mb-4">
                    <label htmlFor="" className="block text-sm font-semibold mb-2">Email</label>
                    <input type="email" name="" value={email} className='w-full p-2 border rounded ' placeholder='Enter your email address.' onChange={(e)=>setEmail(e.target.value)}  />
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="block text-sm font-semibold mb-2">Password</label>
                    <input type="password" name="" value={password} className='w-full p-2 border rounded ' placeholder='Enter your password.' onChange={(e)=>setPassword(e.target.value)}  />
                </div>

                <button type="submit" className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition '>
                    Login
                </button>

                <p className="mt-6 text-center text-sm">
                    Don't have an account? &nbsp;
                    <Link to="/register" className="text-blue-500">Register</Link>
                </p>

            </form>
        </div>

        <div className="hidden md:block w-1/2  ">
            <div className="h-full flex flex-col justify-center items-center">
                <img src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className='h-[750px] w-full object-cover' alt="" />
            </div>
        </div>
    </div>
  )
}

export default Login