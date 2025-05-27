import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartItemContext } from '../../../context/cartItemContext';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { toast } from 'sonner';
import ImageKitUpload from '../../admin/components/ImageUpload';
const cart = {
    products:[
        {
            name:"Stylish jacket",
            size:"M",
            color:'Black',
            price:100,
            image:"/jeans.jpg"
        },
        {
            name:"Causual Sneaker",
            size:"42",
            color:'White',
            price:70,
            image:"/jeans.jpg"
        },
    ],
    totalPrice:170,
}
function Checkout() {
     const {cartProducts,fetchCartItems,cart} = useCartItemContext();
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("kbz");
    const [shippingAddress, setShippingAddress] = useState({
        address:"",
        city:"",
        postalCode:"",
        country:"",
    })

    const [images, setImages] = useState([])
    const pushImages = (image) =>{
        setImages((prev)=>[...prev,image])
    }

    const handleCheckout = async(e) =>{
        e.preventDefault();
        const payload = {
            email:userInfo.email,
            firstName, lastName,
            phone,
            shippingAddress,
            orderItems:cartProducts,
            user:userInfo._id,
            paymentMethod,
            totalPrice:cart.totalPrice,
            images
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },
                body:JSON.stringify(payload)
            })
            const data = await res.json();
            console.log(data)
            toast.success("Your Order is successfully created.")
            window.location.href = `/order-confirmation-page/${data._id}`
            // navigate()
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        fetchCartItems()
    },[])
  return (
    <div className="px-6 tricking-tighter grid grid-col-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* left  */}
        <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl uppercase mb-6">Checkout</h2>
            <form onSubmit={handleCheckout}>
                <h3 className="text-lg mb-4">
                    Contact Details
                </h3>
                <div className="mb-4">
                    <label htmlFor="" className="block text-gray-700">Email</label>
                    <input type="email" value={userInfo.email} disabled name="" id="" className='w-full border p-2 rounded '/>
                </div>
                <h3 className="text-lg mb-4">Delivery</h3>
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="">First Name</label>
                        <input type="text"  required onChange={(e)=>setFirstName(e.target.value)} value={firstName} placeholder=''  name="" id="" className='w-full border p-2 rounded '/>
                    </div>

                    <div>
                        <label htmlFor="">Last Name</label>
                        <input type="text" required  onChange={(e)=>setLastName(e.target.value)} value={lastName} placeholder=''  name="" id="" className='w-full border p-2 rounded '/>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="block ">Address</label>
                    <input type="text" value={shippingAddress.address} required  onChange={(e)=>setShippingAddress({...shippingAddress, address:e.target.value})} name="" id="" className='w-full border p-2 rounded '/>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="">City</label>
                        <input type="text"  required onChange={(e)=>setShippingAddress({...shippingAddress, city:e.target.value})} value={shippingAddress.city} placeholder=''  name="" id="" className='w-full border p-2 rounded '/>
                    </div>

                    <div>
                        <label htmlFor="">Postal Code</label>
                        <input type="text" required  onChange={(e)=>setShippingAddress({...shippingAddress, postalCode : e.target.value})} value={shippingAddress.postalCode} placeholder=''  name="" id="" className='w-full border p-2 rounded '/>
                    </div>
                </div>

                 <div className="mb-4">
                    <label htmlFor="" className="block ">Country</label>
                    <input type="text" value={shippingAddress.country} required  onChange={(e)=>setShippingAddress({...shippingAddress, country:e.target.value})} name="" id="" className='w-full border p-2 rounded '/>
                </div>

                 <div className="mb-4">
                    <label htmlFor="" className="block ">Phone</label>
                    <input type="text" value={phone} required  onChange={(e)=>setPhone(e.target.value)} name="" id="" className='w-full border p-2 rounded '/>
                </div>

                <div className='w-[200px] h-[200px]'>
                    <img src={paymentMethod == "kbz" ? "/kbzqr.png" : "/ayaqr.png"} className='w-full h-full' alt="" />
                </div>


                <div className="flex gap-5 my-5">
                    <div onClick={()=>setPaymentMethod("kbz")} className={`w-[80px] h-[80px] cursor-pointer overflow-hidden rounded-lg ${paymentMethod=='kbz' && 'border-5 border-orange-500'}`}>
                        <img src="/kbzpay.png" className='w-full h-full' alt="" />
                    </div>

                    <div onClick={()=>setPaymentMethod("aya")} className={`w-[80px] h-[80px] cursor-pointer overflow-hidden rounded-lg ${paymentMethod=='aya' && 'border-5 border-orange-500'}`}>
                        <img src="/unnamed.png" className='w-full h-full' alt="" />
                    </div>
                </div>

                <div className="flex flex-wrap mb-5 gap-3">
                    {
                        images.map((img,index)=>(
                            <img key={index} src={img} className='w-[200px] h-[200px] rounded-md ' alt="" />
                        ))
                    }
                </div>
                 <span>Upload payment image here:</span>   
                <ImageKitUpload pushImages={pushImages}/>

                <button type="submit" className='bg-black p-3 rounded-lg text-center text-white w-full cursor-pointer hover:bg-[#000000ee]'>
                    Order Now
                </button>
            </form>
        </div>

        {/* right */}
        <div className="bg-blue-50 rounded-lg p-6 my-6">
            <h1 className="font-medium py-3 ">
                Order Summary
            </h1>

             <div>
                    {
                        cartProducts.map((product,index)=>(
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
                                        
                                        <div className='text-sm'>quantity : {product.quantity}</div>
                                    </div>
                                </div>
            
                                <div>
                                    <p className=' '>Unit Price - ${product.price}</p>
                                    <p className=' '>Subtotal - $ {product.price * (1-product.discountPrice/100) * product.quantity}</p>
                                    <p className='text-red-500 '>{product.discountPrice}% off</p>
                                   
                                </div>
                            </div>
                        ))  
                    }
            
                    <div className="flex justify-between">
                        <div className='text-xl font-bold p-3'>Total</div>
                        <div className='text-xl font-bold p-3'>$ {cart.totalPrice}</div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Checkout