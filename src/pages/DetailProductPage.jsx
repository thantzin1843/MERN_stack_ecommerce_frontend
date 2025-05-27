import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetail from '../components/products/ProductDetail';

function DetailProductPage() {
  const {id} = useParams();
  const [bestSeller,setBestSeller] = useState({})
   const [similarProducts, setSimilarProducts] = useState([])
  console.log(id)
  const fetchProductDetails = async() =>{
        try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
        const data = await response.json();
        console.log(data);
        setBestSeller(data.product)
        setSimilarProducts(data.similarProducts);
        } catch (error) {
        console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchProductDetails()
    },[id])
  return (
    <div>
          <ProductDetail bestSeller={bestSeller} similarProducts={similarProducts}/>
    </div>
  )
}

export default DetailProductPage