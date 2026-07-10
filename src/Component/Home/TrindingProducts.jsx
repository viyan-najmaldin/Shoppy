import React from 'react'
import Carts from './Carts'
import { Link } from 'react-router-dom'

const TrindingProducts = ({Data}) => {
  return (
    <div className='py-20 mx-5'>
        <h1 className='text-2xl font-bold'>Trending Products</h1>
       
        <div className='flex justify-between'> 
        <p>Most loved by our customers</p>
        <Link to="/products/all" className='font-bold text-cyan-900'>View All →</Link>
        </div>
     
     <div className='mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6'>
    
    {Data.map(data=> <Carts data={data} />)}
  
     </div>
    


     
     

    </div>
  )
}

export default TrindingProducts
