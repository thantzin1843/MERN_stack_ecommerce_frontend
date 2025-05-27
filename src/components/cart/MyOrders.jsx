import React from 'react'

function MyOrders() {
  return (
    <div className='w-full lg:max-w-6xl my-6 p-6 mx-auto'>
      <h2 className='font-bold'>Products</h2>
            <div className=" mb-5 overflow-scroll md:overflow-hidden  w-full rounded-lg shadow-xl mt-3">
                        <table className='w-full'>
                        <tr className='bg-gray-400 ' >
                            <th className='text-start text-sm p-3'>Image</th>
                            <th className='text-start text-sm p-3'>Order Id</th>
                            <th className='text-start text-sm p-3'>Created At</th>
                            <th className='text-start text-sm p-3'>Shipping Address</th>
                            <th className='text-start text-sm p-3'>Items</th>
                             <th className='text-start text-sm p-3'>Price</th>
                              <th className='text-start text-sm p-3'>Status</th>
                        </tr>
                        <tr onClick={()=>navigate('/order/123')}>
                            <td className='text-start text-xs p-3'>
                                <img src="/jeans.jpg" className='w-15 h-15 rounded-md' alt="" />
                            </td>
                            <td className='text-start text-xs p-3'>#123odeoe</td>
                            <td className='text-start text-xs p-3'>{new Date().toLocaleDateString()}</td>
                            <td className='text-start text-xs p-3'>New York, USA</td>
                            <td className='text-start text-xs p-3'>1</td>
                            <td className='text-start text-xs p-3'>$ 100</td>
                            <td className='text-start text-xs p-3'>
                              <span className="bg-green-300 py-1 px-3 rounded-full text-center">Paid</span>
                            </td>
                        </tr>
                    </table>
            </div>

    </div>
  )
}

export default MyOrders