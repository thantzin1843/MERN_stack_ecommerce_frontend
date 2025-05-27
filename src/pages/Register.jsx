import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfrimPassword] = useState('')
    const dispatch = useDispatch();

    const handleRegister = async(e) =>{
        e.preventDefault();
        dispatch(registerUser({name,email,password}));

        
        // console.log(name, email, password , confirm_password)
        // const response = await fetch("http://localhost:9000/api/user/register",{
        //     method: 'POST',
        //     headers:{
        //         'Content-Type' : 'application/json'
        //     },
        //     body:JSON.stringify({name, email, password})
        // })
        // const data = await response.json();
        // console.log(data)
    }

  return (
    <div className='flex '>
        <div className="w-full flex md:w-1/2 flex-col justify-center items-center p-8 md:p-12">
            <form onSubmit={handleRegister} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
                <div className="flex justify-center mb-6">
                    <h2 className="text-3xl font-medium">
                        BokBaNi
                    </h2>
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">
                    Hey there! 👋
                </h2>

                {/* <p className="text-center mb-6">
                    Enter your username and password to login
                </p> */}
                <div className="mb-4">
                    <label htmlFor="" className="block text-sm font-semibold mb-2">Name</label>
                    <input type="text" name="" value={name} className='w-full p-2 border rounded ' placeholder='Enter your name.' onChange={(e)=>setName(e.target.value)} id="" />
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="block text-sm font-semibold mb-2">Email</label>
                    <input type="email" name="" value={email} className='w-full p-2 border rounded ' placeholder='Enter your email address.' onChange={(e)=>setEmail(e.target.value)} id="" />
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="block text-sm font-semibold mb-2">Password</label>
                    <input type="password" name="" value={password} className='w-full p-2 border rounded ' placeholder='Enter your password.' onChange={(e)=>setPassword(e.target.value)} id="" />
                </div>

                 <div className="mb-4">
                    <label htmlFor="" className="block text-sm font-semibold mb-2">Confirm Password</label>
                    <input type="password" name="" value={confirm_password} className='w-full p-2 border rounded ' placeholder='Enter your password.' onChange={(e)=>setConfrimPassword(e.target.value)} id="" />
                </div>

                <button type="submit" className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition '>
                    Register
                </button>

                <p className="mt-6 text-center text-sm">
                    Do you already have an account? &nbsp;
                    <Link to="/login" className="text-blue-500">Login</Link>
                </p>

            </form>
        </div>

        <div className="hidden md:block w-1/2  ">
            <div className="h-full flex flex-col justify-center items-center">
                <img src="https://images.pexels.com/photos/6214454/pexels-photo-6214454.jpeg?auto=compress&cs=tinysrgb&w=600" className='h-[750px] w-full object-cover' alt="" />
            </div>
        </div>
    </div>
  )
}

export default Register