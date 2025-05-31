import React, { useEffect, useState } from 'react'
import CategoryCreateForm from '../../components/CategoryCreateForm'
import { PiXCircleBold } from 'react-icons/pi'
import { FaCircleXmark } from 'react-icons/fa6'
import CollectionForm from '../../components/CollectionForm'
import { toast } from 'sonner'
import ImageKitUpload from '../../components/ImageUpload'
import { Link, useNavigate } from 'react-router-dom'

function CreateProduct() {
    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);
    const navigate = useNavigate()
    const fetchCategoriesAndCollections = async() =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category`,{
                method:'get'
            })
            const categories = await response.json()
            console.log(categories)
            setCategories(categories)

            const response1 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collection`,{
                method:'get'
            })
            const collections = await response1.json()
            console.log(collections)
            setCollections(collections)
        } catch (error) {
            console.log(error.message)

        }
    }
    useEffect(()=>{
        fetchCategoriesAndCollections()
    },[])

    const [hasVariants, setHasVariants] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [collection, setCollection] = useState("");
    const [gender, setGender] = useState("male");
    const [description, setDescription] = useState("")
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [sku, setSku] = useState("");
    const [images, setImages] = useState([])
    const pushImages = (image) =>{
        setImages((prev)=>[...prev,image])
    }

    const [price,setPrice] = useState();
    const [discountPrice,setDiscountPrice] = useState();
    const [countInStock,setCountInStock] = useState();
    // variants section
    const [variant, setVariant] = useState({
        size:"",
        color:"",
        price:0,
        discountPrice:0,
        stock:1
    })
    const [variants, setVariants] = useState([])
    const handleVariantChange = (e) =>{
        const {type, value, name} = e.target;
        // console.log(type, value, name)
        if(name=="discountPrice" && Number(value) >= variant.price){
            toast.error("Discount price(%) must be lower than product price.");
            return
        }
        setVariant(prev => ({
        ...prev,
        [name]: value
        }));
    }
    const addVariants = () =>{
        setVariants((prev)=>(
            [...prev,{...variant}]
        ))
        setVariant({
             size:"",
            color:"",
            price:0,
            discountPrice:0,
            stock:0
        })
    }
    const removeVariant = (size,color) =>{
        console.log(size,color,variants)
        setVariants(variants.filter((v)=>(
            !(v.size === size && v.color === color)
        )))
    }
    // tags section
    const [tag, setTag ]= useState("")
    const [tags, setTags] = useState([])
    const addTags = () =>{
        if(tag=="") {
            toast.error("Tag field is empty!")
            return
        }
        setTags(prev=>[...prev,tag])
        setTag("")
    }
    const removeTags = (tag) =>{
        const leftTags = tags.filter((t)=>t !== tag);
        setTags(leftTags);
    }


     const handleCheckboxChange = (event) => {
        console.log(event.target.checked)
        setHasVariants(event.target.checked);
    };

    const handleCreateProduct = async(e) =>{
        e.preventDefault()
        const payload = {
            name, category, brand, collection, gender, description, 
            dimensions:{length, width, height}, weight, sku, tags,
            variants,price, discountPrice,countInStock,hasVariants,
            isPublished:true,images
        }
        console.log(payload)
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/create`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },
                body:JSON.stringify(payload)
            })
            const CreatedProduct = await res.json()
            console.log(CreatedProduct);
            toast.success("Product created successfully!")
            navigate('/admin/product/list');
        } catch (error) {
            
        }


        removeStateValue()
    }

    const changeDiscountPrice = (dp) =>{
                            console.log(price> dp)
                            if(Number(dp) < price){
                                setDiscountPrice(dp)
                                return
                            }
                            toast.error("Discount price(%) must be lower than product price.")
                            return
                        
    }

    // remove state value
    const removeStateValue =()=>{
        setName("");
        setCategory("");
        setBrand("");
        setCollection("");
        setGender();
        setDescription("");
        setLength(0);
        setWidth(0);
        setHeight(0);
        setWeight(0);
        setSku("");
        setPrice(0);
        setDiscountPrice(0);
        setCountInStock(0);
        setImages([])
    }

  return (
    <div className='w-full lg:w-1/2 mx-auto'>
        <h3 className='text-xl font-semibold my-5 text-orange-400 text-center'>Create Product Here!</h3>
        <form onSubmit={handleCreateProduct}>
            <div className='my-5'>
                <label htmlFor="" className='text-gray-500 text-sm'>Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="" placeholder='Product Name' className="border border-gray-400 p-2 rounded-md w-full" required/>
            </div>
            <div className='my-5'>
                <label htmlFor="" className='text-gray-500 text-sm'>Category</label>
                <div className="flex gap-2">
                    <select name="" id="" value={category} onChange={(e)=>setCategory(e.target.value)} className="border border-gray-400 p-2 rounded-md w-full">
                        {
                            categories.map((c)=>(
                                <option value={c?.name} selected={category==c?.name}>{c?.name}</option>
                            ))
                        }
                    </select>
                    <CategoryCreateForm fetchCategoriesAndCollections={fetchCategoriesAndCollections} />
                </div>
            </div>

            <div className='my-5'>
                <label htmlFor="" className='text-gray-500 text-sm'>Collection</label>
                <div className="flex gap-2">
                    <select name="" value={collection} id="" onChange={(e)=>setCollection(e.target.value)} className="border border-gray-400 p-2 rounded-md w-full">
                       {
                            collections.map((c)=>(
                                <option value={c?.name} selected={collection==c?.name}>{c?.name}</option>
                            ))
                        }
                    </select>
                    <CollectionForm fetchCategoriesAndCollections={fetchCategoriesAndCollections} />
                </div>
            </div>

            <div className="my-5 flex items-center">
                <input type="checkbox" onChange={handleCheckboxChange} checked={hasVariants}  id="" className='border rounded-md'/> &nbsp; Product has variants?
            </div>

           {
            hasVariants ? (
                    <div className='bg-gray-200 p-5 rounded-lg'>
                    {
                        variants?.map((variant,index)=>(
                            <div key={index} className='my-2'>
                                Size:<span className='bg-black text-white px-2 rounded-lg'>{variant.size}</span> | Color:<span className='bg-black text-white px-2 rounded-lg'>{variant.color}</span> | Stock:<span className='bg-black text-white px-2 rounded-lg'>{variant.stock}</span>
                                <button className='text-red-500 ms-3 underline rounded-lg' onClick={()=>removeVariant(variant.size,variant.color)}>delete</button>
                            </div>
                        ))
                    }
                   
                    
                    <div className="grid grid-cols-2 gap-3 my-5">
                        <div className=''>
                            <label htmlFor="" className='text-gray-500 text-sm'>Color</label>
                            <input value={variant?.color} onChange={handleVariantChange} type="text" name="color" placeholder='Color' className="border border-gray-400 p-2 rounded-md w-full" />
                        </div>

                        <div className=''>
                            <label htmlFor="" className='text-gray-500 text-sm'>Size</label>
                          <select value={variant?.size} onChange={handleVariantChange} name="size" id="" className="border border-gray-400 p-2 rounded-md w-full">
                                <option value="s" selected={"s"==variant.size}>S</option>
                                <option value="m" selected={"s"==variant.size}>M</option>
                                <option value="l" selected={"s"==variant.size}>L</option>
                                <option value="s" selected={"s"==variant.size}>xl</option>
                                <option value="m" selected={"s"==variant.size}>xxl</option>
                            </select>
                        </div>
                    </div>

                        <div className="grid grid-cols-2 gap-3 my-5">
                        <div className=''>
                            <label htmlFor="" className='text-gray-500 text-sm'>Price</label>
                            <input min="0" value={variant?.price} onChange={handleVariantChange} type="number" name="price" placeholder='Price' className="border border-gray-400 p-2 rounded-md w-full" />
                        </div>

                        <div className=''>
                            <label htmlFor="" className='text-gray-500 text-sm'>Discount Price(%)</label>
                            <input min="0" value={variant?.discountPrice} onChange={handleVariantChange} type="number" name="discountPrice" placeholder='Discount price' className="border border-gray-400 p-2 rounded-md w-full" />
                        </div>
                    </div>


                    <div className='my-5'>
                        <label htmlFor="" className='text-gray-500 text-sm'>Count In Stock</label>
                        <input value={variant.stock} onChange={handleVariantChange} type="number" name="stock" placeholder='stock' className="border border-gray-400 p-2 rounded-md w-full" />
                    </div>
                    <button type='button' onClick={addVariants} className='bg-blue-600 p-2 rounded-md '>Add Variant</button>
                </div>  
            ):(
                <>
                     <div className="grid grid-cols-2 gap-3 my-5">
                
                    <div className=''>
                        <label htmlFor="" className='text-gray-500 text-sm'>Price</label>
                        <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" name="" placeholder='Price' className="border border-gray-400 p-2 rounded-md w-full" required/>
                    </div>

                    <div className=''>
                        <label htmlFor="" className='text-gray-500 text-sm'>Discount Price(%)</label>
                        <input value={discountPrice} onChange={(e)=>changeDiscountPrice(e.target.value)} type="number" name="" placeholder='Discount price' className="border border-gray-400 p-2 rounded-md w-full" required/>
                    </div>
                    </div>

                    <div className='my-5'>
                        <label htmlFor="" className='text-gray-500 text-sm'>Count In Stock</label>
                        <input value={countInStock} onChange={(e)=>setCountInStock(e.target.value)} type="number" name="" placeholder='stock' className="border border-gray-400 p-2 rounded-md w-full" required/>
                    </div>
                </>
            )
           }


            <div className="grid grid-cols-2 gap-3 my-5">
                
            <div className=''>
                <label htmlFor="" className='text-gray-500 text-sm'>Brand</label>
                <input type="text" value={brand} onChange={(e)=>setBrand(e.target.value)} name="" placeholder='brand name' className="border border-gray-400 p-2 rounded-md w-full" required/>
            </div>

            <div className=''>
                <label htmlFor="" className='text-gray-500 text-sm'>Gender</label>
                <select value={gender} onChange={(e)=>setGender(e.target.value)} className="border border-gray-400 p-2 rounded-md w-full">
                    <option value="Male" selected={"Male"==gender}>Male</option>
                    <option value="Female" selected={"Female"==gender}>Female</option>
                    <option value="Unisex" selected={"Unisex"==gender}>Unisex</option>
                </select>
            </div>
            </div>

            <div className='my-5'>
                <label htmlFor="" className='text-gray-500 text-sm'>Description</label>
                <textarea name="" value={description} onChange={(e)=>setDescription(e.target.value)}  className="border border-gray-400 p-2 rounded-md w-full" required>
                    
                </textarea>
            </div>

            <div className="grid grid-cols-3 gap-3 my-5">
                
            <div className=''>
                <label htmlFor="" className='text-gray-500 text-sm'>Length(cm)</label>
                <input type="number" value={length} onChange={(e)=>setLength(e.target.value)} name="" placeholder='Length' className="border border-gray-400 p-2 rounded-md w-full" required/>
            </div>

            <div className=''>
                <label htmlFor="" className='text-gray-500 text-sm'>Width</label>
                <input type="number" name="" value={width} onChange={(e)=>setWidth(e.target.value)} placeholder='Width' className="border border-gray-400 p-2 rounded-md w-full" required/>
            </div>

             <div className=''>
                <label htmlFor="" className='text-gray-500 text-sm'>Height</label>
                <input type="number" name="" value={height} placeholder='Height' onChange={(e)=>setHeight(e.target.value)} className="border border-gray-400 p-2 rounded-md w-full" required/>
            </div>
            </div>

             <div className="grid grid-cols-2 gap-3 my-5">
            <div>
                <label htmlFor="" className='text-gray-500 text-sm'>Weight(kg)</label>
                <input type="Number" name="" value={weight} onChange={(e)=>setWeight(e.target.value)} placeholder='Weight' className="border border-gray-400 p-2 rounded-md w-full" required/>
            </div>

            <div className=''>
                <label htmlFor="" className='text-gray-500 text-sm'>SKU</label>
                <input type="text" name="" placeholder='SKU' value={sku} onChange={(e)=>setSku(e.target.value)} className="border border-gray-400 p-2 rounded-md w-full" required/>
            </div>
            </div>
            

             <div className='my-5'>
                <label htmlFor="" className='text-gray-500 text-sm'>Tags</label>
                <div className='my-2 flex flex-wrap gap-5 '>
                    {
                        tags?.map((t,index)=>(
                        <div key={index} className='border-black border py-1 px-2 rounded-full inline w-auto'>
                            <span >{t} </span>
                        <FaCircleXmark className='inline' onClick={()=>removeTags(t)}/>
                    </div>
                        ))
                    }
                    
                     
                </div>
                <div className="flex gap-2">

                <input type="text" value={tag}  placeholder='tag' onChange={(e)=>setTag(e.target.value)} className="border border-gray-400 p-2 rounded-md w-full" />
                <button type="button" onClick={addTags} className='px-3 bg-blue-600 rounded-md '>+</button>
                </div>
            </div>

            <div>
                <div className="flex flex-wrap mb-5 gap-3">
                    {
                        images.map((img,index)=>(
                            <img key={index} src={img} className='w-15 h-15 rounded-md ' alt="" />
                        ))
                    }
                </div>
                <ImageKitUpload pushImages={pushImages}/>
            </div>

            <button type="submit" className='my-5 bg-orange-500 text-white font-medium text-center w-full p-2 rounded-md'>Create Product</button>

        </form>
    </div>
  )
}

export default CreateProduct