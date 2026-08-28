import React from 'react'
import Carts from './Carts'
import { Link } from 'react-router-dom'

const TrindingProducts = ({Data , setData, orders, setOrders}) => {
  return (
    <div className='py-20 mx-5'>
       <div className='flex justify-between'> 
        <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
         Most loved by our customers
        </p>
        <h1 className='text-2xl font-bold'>Trending Products</h1>
       </div>
       
        {/* <p>Most loved by our customers</p> */}
        <Link to="/products/All" className='font-semibold sm:text-sm text-sx hover:text-cyan-600 mt-6 mr-4 text-cyan-900'>View All →</Link>
        </div>
     
     <div className='mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6'>
    
    {Data.map(data=> <Carts data={data} setData={setData} orders={orders} setOrders={setOrders}/>)}
  
     </div>
    


     
     

    </div>
  )
}

export default TrindingProducts
