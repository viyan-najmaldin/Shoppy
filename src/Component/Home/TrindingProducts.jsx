import React from 'react'
import Carts from './Carts'


const TrindingProducts = () => {
  return (
    <div className='py-20 mx-10'>
         
        <h1 className='text-2xl font-bold'>Trending Products</h1>
       
        <div className='flex justify-between'> 
        <p>Most loved by our customers</p>
        <span className='font-bold text-cyan-900'>View All →</span>
        </div>
     
     <div className='mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
     <Carts />
     <Carts />
     <Carts />
     <Carts />
     <Carts />
     <Carts />
     <Carts />
     <Carts />
     </div>
    


     
     

    </div>
  )
}

export default TrindingProducts
