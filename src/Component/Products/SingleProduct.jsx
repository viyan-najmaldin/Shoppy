import React from 'react'
import { FaStar, FaRegStar, FaRegHeart } from "react-icons/fa";
import { FaCartShopping,  FaTruck, FaRotateLeft,FaLock } from "react-icons/fa6";
import MoreExplore from './MoreExplore';
import SelectProduct from './SelectProduct';
import { useParams } from "react-router-dom";
import { useState } from 'react';

const SingleProduct = ({Data}) => {
     const { id  } = useParams();
    const data = Data.find(
    (item) => item.id === Number(id)
  );

  return (
    
    <div className='bg-blue-50 pb-10 p-5'>
      <a href="http://" className='pb-2 sm:pb-4 text-sm'>Home - Product - Procuct Detail</a> 
   
   <div className='bg-white sm:my-5 my-2  rounded-2xl border border-slate-200 sm:p-10 p-4'>
        <div className='grid sm:grid-cols-2  gap-10  '>
    
           <section id='productImage' className=''>
                <img src={data.image} alt="img" loading="lazy" 
                className="border border-slate-200 object-cover w-full h-110 mb-4 rounded-2xl"/>
         
               <MoreExplore />

               {console.log(id)}
           </section>
            
        <section id='PruductDetails' className=''>
            <div>
                 <h1 className='sm:text-3xl text-xl font-bold'>{data.name}</h1>  
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
                        <h1 className='sm:text-3xl text-xl font-bold'>${data.price}</h1>  
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
              <p>{data.description}</p>
          </div>
     </div>
    </div>
  )
}

export default SingleProduct
