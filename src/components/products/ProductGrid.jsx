import React from 'react'
import { Link } from 'react-router-dom'

function ProductGrid({products}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
{
  products?.map((product, index) => {
      const sortedVariants = product?.variants?.slice().sort((a, b) => a.price - b.price);
      return (
        <Link key={index} to={`/products/${product?._id}`} className='block'>
          <div className="bg-white p-4 rounded-lg">
            <div className="w-full h-76 mb-4">
              <img src={product.images[0]} alt="" className='w-full h-full object-cover rounded-lg' />
            </div>
            <h3 className='text-sm mb-2 font-bold'>
              {product.name}
            </h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              ${' '}
              {product?.hasVariants
                ? sortedVariants?.[0]?.price ?? 'N/A'
                : product.price}
            </p>
          </div>
        </Link>
      );
    })
  }

    </div>
  )
}

export default ProductGrid