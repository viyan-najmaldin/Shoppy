import React from 'react'
import {  FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const SelectProduct = () => {
  return (
      <div className='my-6 py-4 border-slate-300 border-t w-full'>
                           <h1 className='sm:text-xl font-semibold'>Select Color</h1>  
                             <div className='flex gap-2 my-'>
                                <button className='p-3 border border-slate-300 bg-red-500 w-fit rounded-3xl'></button>
                                <button className='p-3 border border-slate-300 bg-white w-fit rounded-3xl'></button>
                                <button className='p-3 border border-slate-300 bg-black w-fit rounded-3xl'></button>
                                <button className='p-3 border border-slate-300 bg-blue-500 w-fit rounded-3xl'></button>
                                <button className='p-3 border border-slate-300 bg-yellow-500 w-fit rounded-3xl'></button>
                             </div>
      
                           <h1 className='sm:text-xl mt-4 py-2 font-semibold'>Quantity</h1>
                          <div className='flex gap-2 items-center'>
                               <div className='flex justify-between items-center gap-5 border border-slate-400 rounded-lg sm:w-40 '>
                               <button className='text-xl font-mono hover:bg-slate-200 px-4 p-1'>-</button>
                               <span>1</span>
                               <button className='text-xl font-mono hover:bg-slate-200 px-4 p-1'>+</button>
                          </div>  
                          <p className='text-slate-500 text-sm'>Only 15 left in stock</p>
                          </div>

                    <div className='flex gap-4 py-10 border-b border-slate-300 '>
                        <button className='bg-cyan-800 flex rounded-lg gap-2 text-white p-4 px-10 w-full justify-center items-center hover:bg-gradient-to-r from-cyan-700 to-cyan-500 transition font-semibold'> 
                            <FaCartShopping className="text-lg" />Add to Cartt
                        </button>
                        <button className='p-4 border rounded-lg border-slate-300 text-lg text-slate-500 hover:bg-red-500/20 hover:text-red-400'> <FaRegHeart /> </button>
                    </div>
    </div>
  )
}

export default SelectProduct
