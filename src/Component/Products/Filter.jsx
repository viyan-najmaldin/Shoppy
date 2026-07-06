import React from 'react'
import { useState } from 'react'

const Filter = () => {
    const [priceValue, setPriceValue] = useState(500)
  return (
     <div className='p-5 py-10 bg-white min-w-60 rounded-2xl mb-5'>

            <div className='flex justify-between mb-5'>
                  <h1 className='font-bold text-lg'>Filters</h1>
                  <button className='text-cyan-700 hover:text-cyan-500'>Reset</button>
            </div>

            <div className='pb-5 border-b border-slate-200'>
                <h1 className='font-semibold'>Price Range</h1>
                <input className='w-full' type="range" name="price" id="price" list='prices' value={priceValue} onChange={(e)=>setPriceValue(e.target.value)} />

                <div className="flex items-center justify-between text-sm text-slate-600 ">
                      <span>$0</span>
                      <span id="priceValue" className="font-medium text-dark">{priceValue}$</span>
                      <span>$500</span> 
                </div> 
            </div>

            <div className='py-5 border-b border-slate-200'>
                <h1 className='font-semibold'>Categories</h1>

              
            </div>

        
     </div>
  )
}

export default Filter
