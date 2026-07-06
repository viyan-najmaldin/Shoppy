import React from 'react'
import Carts from '../Home/Carts'
import Filter from './Filter'

const Products = () => {
  return (
    <div className='sm:flex gap-5 bg-blue-50 p-5'>
       <Filter/>
        <div>
                <div className='sm:mt-9 flex justify-between flex-col sm:flex-row sm:items-center p-4 bg-white text-slate-600 border border-slate-200 rounded-2xl'>
                    <div className='m-2'>
                        Showing 
                        <span className='text-black font-semibold'> 6 </span> 
                        products
                      </div>
                 
                    <div>
                      <label className='hidden lg:inline mr-2'>Sort:</label>
                         <select id="sortSelect" className="flex-1 sm:flex-initial p-2 border w-full lg:w-auto border-slate-300 rounded-lg text-sm focus:outline-none focus:border-none focus:ring-2 focus:ring-cyan-700/30">
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="newest">Newest</option>
                         </select>
                    </div>
                 </div>


                 


                    <div className='mt-5 grid grid-cols-2 lg:grid-cols-4 gap-5'>
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
