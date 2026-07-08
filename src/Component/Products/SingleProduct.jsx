import React from 'react'
import { FaStar, FaRegStar, FaRegHeart } from "react-icons/fa";
import { FaCartShopping,  FaTruck, FaRotateLeft,FaLock } from "react-icons/fa6";
import MoreExplore from './MoreExplore';
import SelectProduct from './SelectProduct';



const SingleProduct = () => {
  return (
    <div className='bg-blue-50 pb-10 p-5'>
      <a href="http://" className='pb-2 sm:pb-4 text-sm'>Home - Product - Procuct Detail</a> 
   
   <div className='bg-white sm:my-5 my-2  rounded-2xl border border-slate-200 sm:p-10 p-4'>
        <div className='grid sm:grid-cols-2  gap-10  '>
    
           <section id='productImage' className=''>
                <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" alt="img" loading="lazy" 
                className="border border-slate-200 object-cover w-full h-110 mb-4 rounded-2xl"/>
         
               <MoreExplore />
           </section>
            
        <section id='PruductDetails' className=''>
            <div>
                 <h1 className='sm:text-3xl text-xl font-bold'>Title Jacket ,item</h1>  
                <div className='flex my-2 gap-2'>
                    <div className="flex text-2xl text-amber-400">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar />
                                        </div>
                                <span className='text-slate-500'>4.1 (108 reviews)</span>
                </div>
                    <div className='flex gap-3 my-4 items-center'>
                        <h1 className='sm:text-3xl text-xl font-bold'>$129.5</h1>  
                        <h1 className='sm:text-xl text-slate-400 line-through font-bold'>$129.5</h1>
                        <span className="px-2 h-fit bg-red-500/20 text-red-500 rounded-lg">20% OFF</span>
                    </div>
            </div>

            <SelectProduct />    
               
            <ul className='mt-5'>
              <li><FaTruck className="text-cyan-800 inline mr-2" />
               Free shipping on orders over $50</li>
              <li><FaRotateLeft className="text-cyan-800 inline mr-2" />
                30-day easy returns</li>
              <li> <FaLock className="text-cyan-800 inline mr-2" /> 2-year warranty included</li>
            </ul>
        </section>
        </div>

          <div>
            <h1 className='text-xl font-semibold mt-6 pb-2'>Description</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
     </div>
    </div>
  )
}

export default SingleProduct
