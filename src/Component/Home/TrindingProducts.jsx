import React from 'react'
import Carts from './Carts'


const TrindingProducts = () => {
  return (
    <div className='m-5 my-15'>
         
        <h1 className='text-2xl font-bold'>Trending Products</h1>
       
        <div className='flex justify-between'> 
        <p>Most loved by our customers</p>
        <span className='font-bold text-cyan-900'>View All →</span>
        </div>
     
     <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
 <Carts />
     <Carts />
     <Carts />
     <Carts />
     </div>
    


     
     

    </div>
  )
}

export default TrindingProducts
