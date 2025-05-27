import React, { useEffect, useState } from 'react'
import ProductDetail from './ProductDetail'
import { useDispatch } from 'react-redux'
import { getBestSellerProduct } from './../../redux/slices/productSlice'

function BestSeller() {
    const [bestSeller, setBestSeller] = useState({})
    const [similarProducts, setSimilarProducts] = useState([])
    const dispatch = useDispatch()
    const fetchBestSellerProduct = async() =>{
        try {
        const response = await dispatch(getBestSellerProduct()).unwrap()
        console.log(response);
        setBestSeller(response.product)
        setSimilarProducts(response.similarProducts);
        } catch (error) {
        console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchBestSellerProduct()
    },[])
  return (
    <div>
        <ProductDetail bestSeller={bestSeller} similarProducts={similarProducts}/>
    </div>
  )
}

export default BestSeller