import React from 'react'
import { FaStar, FaRegStar } from "react-icons/fa";


const SingleProduct = () => {
  return (
    <div className='bg-blue-50 pb-10 p-5'>
        <a href="http://" className='pb-2 sm:pb-4 text-sm'>Home - Product - Procuct Detail</a> 
   
        
        <div className='flex sm:flex-row flex-col bg-white my-5 rounded-2xl gap-10 border border-slate-200 p-10 '>
           
           <div className='sm:w-[50%]'>
                <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" alt="img" loading="lazy" 
                className=" object-cover w-full h-130 mb-4 rounded-2xl"/>
         
         <span className='text-sm p-1'>More Products</span>
         <div className='grid grid-cols-4 gap-2 mt-1 justify-center'>
          <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" alt="img" loading="lazy" 
                className=" object-cover w-full h-full rounded-2xl hover:scale-105 transition-transform duration-500"/>
          <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" alt="img" loading="lazy" 
                className=" object-cover w-full h-full rounded-2xl hover:scale-105 transition-transform duration-500"/>
          <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" alt="img" loading="lazy" 
                className=" object-cover w-full h-full rounded-2xl hover:scale-105 transition-transform duration-500"/>
          <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" alt="img" loading="lazy" 
                className=" object-cover w-full h-full rounded-2xl hover:scale-105 transition-transform duration-500"/>

         </div>
          
           </div>
            
        <div className='sm:w-[50%]'>
            <div>
                 <h1 className='text-3xl font-bold'>Title Jacket ,item</h1>  
                <div className='flex my-2 gap-2'>
                    <div className="flex text-2xl text-amber-400">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar />
                                        </div>
                                <span>4.1 (128)</span>
                </div>
                    <div className='flex gap-3 my-4 items-center'>
                        <h1 className='text-3xl font-bold'>$129.5</h1>  
                        <h1 className='text-xl text-slate-400 line-through font-bold'>$129.5</h1>
                        <span className="px-2 h-fit bg-red-500/20 text-red-500 rounded-lg">20% OFF</span>
                    </div>
            </div>

            <div className='my-10 py-5 border-slate-400 border-t w-full'>
                     <h1 className='text-xl font-semibold'>Select Color</h1>  
                       <div className='flex gap-2 my-4'>
                          <div className='p-3 bg-red-500 w-fit rounded-2xl'></div>
                          <div className='p-3 bg-white border border-slate-300 w-fit rounded-2xl'></div>
                          <div className='p-3 bg-black w-fit rounded-2xl'></div>
                          <div className='p-3 bg-blue-500 w-fit rounded-2xl'></div>
                          <div className='p-3 bg-yellow-500 w-fit rounded-2xl'></div>
                       </div>

                     <h1 className='text-xl mt-10 py-4 font-semibold'>Quantity</h1>
                    <div className='flex gap-2 items-center'>
                         <div className='flex justify-between items-center gap-5 border border-slate-400 rounded-lg sm:w-50 '>
                         <button className='text-xl font-mono hover:bg-slate-200 p-2 sm:p-4'>-</button>
                         <span>1</span>
                         <button className='text-xl font-mono hover:bg-slate-200 p-2 sm:p-4'>+</button>
                    </div>  
                    <p className='text-slate-500 text-sm'>Only 15 left in stock</p>
                    </div>
                    

            </div>
         
        </div>
          

        </div>
   
    </div>
  )
}

export default SingleProduct
