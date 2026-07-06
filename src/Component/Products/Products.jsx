import React from 'react'
import Carts from '../Home/Carts'
import Filter from './Filter'

const Products = () => {
  return (
    <div className='sm:flex gap-5 bg-blue-50 p-10  '>
       <Filter/>
        <div>
                <div className='p-10 bg-white rounded-2xl'>showing 12 Product</div>
                    <div className='mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
                        <Carts/>
                        <Carts/>
                        <Carts/>
                        <Carts/>
                        <Carts/>
                        <Carts/>   
                    </div>
        </div>
    </div>
  )
}

export default Products
