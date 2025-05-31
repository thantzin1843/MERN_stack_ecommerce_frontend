import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useDispatch } from 'react-redux';
import { getBestSellerProduct } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { useCartItemContext } from '../../../context/cartItemContext';

function ProductDetail({bestSeller,similarProducts}) {
    const {fetchCartItems} = useCartItemContext();
    const navigate = useNavigate()
    const [stockLimit, setStockLimit] = useState()
    const [mainImage, setMainImage] = useState('');
    const [quantity ,setQuantity] = useState(1)
    const [isButtonDisabled, setIsButtonDisable] = useState(false);

    const [sizes, setSizes] = useState([])
    const [selectedSize, setSelectedSize] = useState("")

    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState("");

    const [others, setOthers] = useState({})

    const handleSizeChange = (size) =>{
        setSelectedSize(size);
        getColors(size);
    }

    const handleColorChange = (color) =>{
        setSelectedColor(color);
        let otherData = {} ; // price ,dprice, stock
        bestSeller?.variants?.map((v)=>{
            if(v.size == selectedSize && v.color == color){
                otherData.price = v.price;
                otherData.discountPrice = v.discountPrice;
                otherData.stock = v.stock;
            }
        })
        console.log(otherData);
        setQuantity(1)
        setOthers(otherData);
    }

    const getColors = (size) =>{
        let colors = []
        bestSeller?.variants?.map((v)=>{
            if(v.size == size){
                colors.push(v.color)
            }
        })
        console.log(colors)
        setColors(colors);
    }



    const handleQuantity = (op) =>{
        if(op == 'minus' && quantity>1) {
                setQuantity(prev=>prev-1)
        }else if(op == 'plus'){
            if(bestSeller?.hasVariants){
               if(quantity < others?.stock){
                    setStockLimit(others?.stock)
                    setQuantity(prev=>prev+1)
                } 
            }else{
                if(quantity < bestSeller?.countInStock){
                    setStockLimit(bestSeller?.countInStock)
                    setQuantity(prev=>prev+1)
                }
            }
                
        }
    }

    useEffect(()=>{
        if(bestSeller?.images?.length > 0 ) {
            setMainImage(bestSeller?.images[0]);
        }

        if(bestSeller?.hasVariants){
            let sizes = []
            bestSeller?.variants?.map((v)=>{
                if(sizes.includes(v.size)) return;
                sizes.push(v.size)
            })
            console.log(sizes)
            setSizes(sizes);
        }

    },[bestSeller])

    const handleAddToCart = async() =>{
      
        if(localStorage.getItem('userToken')){
            if(bestSeller?.hasVariants){
                    if(!selectedColor || !selectedSize) {
                        toast.error("Please select a size and color before adding to cart",{
                            duration:1000,
                        });
                        return
                    }
            }
            const price = bestSeller.hasVariants ?others.price : bestSeller.price
            const totalPrice = bestSeller.hasVariants ?(others.price * quantity)*(1-(others.discountPrice/100)) : (bestSeller.price*quantity) * (1-(bestSeller.discountPrice/100))
            const discountPrice = bestSeller.hasVariants ?others.discountPrice : bestSeller.discountPrice
            const payload = {
                productId:bestSeller._id,
                userId:JSON.parse(localStorage.getItem('userInfo'))._id,
                size:selectedSize,
                color:selectedColor,
                quantity,
                image:bestSeller?.images[0],
                name:bestSeller.name,
                price,
                totalPrice,
                hasVariants:bestSeller.hasVariants,
                discountPrice,
                stockLimit
            }
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':`Bearer ${localStorage.getItem('userToken')}`
                    },
                    body:JSON.stringify(payload)
                })

                const data = await res.json();
                console.log(data);

               setIsButtonDisable(true)

                setTimeout(()=>{
                    toast.success("Product added to cart.",{
                        duration:1000,
                    });
                    setIsButtonDisable(false)
                },500); 

                fetchCartItems()
            } catch (error) {
                
            }
        }else{
            navigate('/login')
        }
        

    }


  return (
    <div className="p-6">
        <div className="max-w-6xl mx-auto rounded-lg p-8">
            <div className="flex flex-col md:flex-row">
                {/* left thumbnail */}
                <div className="hidden md:flex flex-col space-y-4 mr-6 ">
                    {
                       bestSeller?.images?.map((image,index)=>(
                        <img onClick={()=>setMainImage(image)} key={index} src={image} alt={image} className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${mainImage == image ?'border-2 border-black' : ''}`} />
                       )) 
                    }
                </div>

                {/* Main image */}
                <div className="md:w-1/2">
                    <div className="mb-4">
                        <img src={mainImage} alt="" 
                        className='w-full h-auto object-cover rounded-lg'/>
                    </div>
                </div>

                {/* Mobile thumbnail */}
                <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4 hideIndi">
                    {
                       bestSeller?.images?.map((image,index)=>(
                        <img onClick={()=>setMainImage(image)} key={index} src={image} alt={image} className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${mainImage == image ?'border-2 border-black' : ''}`} />
                       )) 
                    }
                </div>

                {/* Right Side*/}
                <div className="md:w-1/2 md:ml-10 ">
                    <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                        {bestSeller?.name}
                    </h1>

                    

      

                    {
                        bestSeller?.hasVariants ? (
<div>
                    <div className="flex gap-5">
                        <p className='text-lg font-medium mb-2 '>
                       $ {others.price ? others.price :"Select size and color first!"}
                    </p>
                    {
                        others?.discountPrice && (
                            <p className='text-md h-6 ps-6 pe-3 text-white mb-1 bg-orange-500' style={{clipPath: "polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 61%)"}}>
                            {others?.discountPrice && `${others.discountPrice} %Off`}
                        </p>
                        )
                    }
                    </div>
                  <div className="mb-4">
                            <p className='text-gray-700'>
                                Size:
                            </p>
                            <div className="flex gap-2 mt-2">
                                {sizes?.map((size)=>(
                                    <button onClick={()=>handleSizeChange(size)} key={size} className={`px-4 py-2 rounded border ${size==selectedSize ? 'bg-black text-white' :''}`}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {
                            colors?.length>0 && (
                            <div className="mb-4">
                            <p className=' text-gray-700 '>
                                Color:
                            </p>
                            <div className="flex gap-2 mt-2">
                                {colors?.map((color,index)=>(
                                    <button
                                    onClick={()=>handleColorChange(color)}
                                    style={{
                                        backgroundColor:color.toLocaleLowerCase(),
                                        filter:"brightness(0.8)"
                                    }} key={color} className={`w-8 h-8 shadow rounded-full ${color==selectedColor ? "border-2 border-black" :''}`}>{}</button>
                                ))}
                            </div>
                        </div>
                        )
                    }

                     <div className="mb-3">
                        <p className="text-gray-700">
                            Quantity:
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                            <button onClick={()=>handleQuantity('minus')} className="px-2 py-1 bg-gray-200 rounded text-lg">
                                -
                            </button>
                            <input type="number" name=""  value={quantity} className='bg-gray-100 w-20 text-center py-1' id="" />
                            <button onClick={()=>handleQuantity('plus')} className="px-2 py-1 bg-gray-200 rounded text-lg">
                                +
                            </button>
                        </div>
                    </div>
                    {
                        others.stock && (
                            <p className="text-red-500 text-sm mb-6">
                                Available Stock: {others.stock}
                            </p>
                        )
                    }
</div>
                        ):(
                            <>
                    <div className="flex gap-5">
                        <p className='text-lg text-gray-600 mb-2 '>
                       $ {bestSeller?.price}
                    </p>
                     {
                        bestSeller?.discountPrice && (
                            <p className='text-md h-6 ps-6 pe-3 text-white mb-1 bg-orange-500' style={{clipPath: "polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 61%)"}}>
                            {bestSeller?.discountPrice && `${bestSeller.discountPrice} %Off`}
                            </p>
                        )
                        }
                    </div>
                    <div className="mb-6">
                        <p className="text-gray-700">
                            Quantity:
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                            <button onClick={()=>handleQuantity('minus')} className="px-2 py-1 bg-gray-200 rounded text-lg">
                                -
                            </button>
                            <input type="number" name=""  value={quantity} className='bg-gray-100 w-20 text-center py-1' id="" />
                            <button onClick={()=>handleQuantity('plus')} className="px-2 py-1 bg-gray-200 rounded text-lg">
                                +
                            </button>
                        </div>
                    </div>
                    {
                        bestSeller.countInStock && (
                            <p className="text-red-500 text-sm mb-6">
                                Available Stock: {bestSeller.countInStock}
                            </p>
                        )
                    }
                            </>
                        )
                    }

                    <div className="text-gray-500 mb-4">
                        {bestSeller.description}
                    </div>

                    <button disabled={isButtonDisabled} onClick={handleAddToCart} className={`w-full p-3 rounded text-white bg-black mb-4 
                        ${isButtonDisabled ? "cursor-not-allowed opacity-50" :'hover:bg-gray-900'}`}>
                        {
                            isButtonDisabled ? "Adding to cart ..." : "Add to Cart"
                        }
                    </button>

                </div>
            </div>

            {/* you may also like */}
            {
                similarProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl text-center font-medium mb-4">
                            You May Also Like
                        </h2>
                        <ProductGrid products={similarProducts}/>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default ProductDetail