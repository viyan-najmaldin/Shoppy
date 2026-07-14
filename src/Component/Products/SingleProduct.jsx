import React from 'react'
import { FaStar, FaRegStar, FaRegHeart } from "react-icons/fa";
import { FaCartShopping,  FaTruck, FaRotateLeft,FaLock, FaAngleRight } from "react-icons/fa6";
import MoreExplore from './MoreExplore';
import SelectProduct from './SelectProduct';
import { useParams, Link } from "react-router-dom";
import { useState } from 'react';


const SingleProduct = ({Data, setData, orders, setOrders}) => {
     const { id  } = useParams();
    const data = Data.find(
    (item) => item.id === Number(id)
  );

  return (
    
    <div className='bg-blue-50 pb-10 p-5'>
      <div className='text-sm font-semibold flex items-center gap-2'>
        <Link to='/'> <span className='text-slate-500'>Home</span> </Link> 
        <FaAngleRight  className='text-slate-500'/>
         <Link to={`/products/${data.category}`} className='text-slate-500'><span> {data.category}</span></Link>
          <FaAngleRight  className='text-slate-500'/>
         <span> Product Detail</span>
         
         </div> 
   
        <div className='bg-white sm:my-5 my-2  rounded-2xl border border-slate-200 sm:p-10 p-4 grid sm:grid-cols-2  gap-10  '>
    
           <section id='productImage' className=''>
                <img src={data.image} alt="img" loading="lazy" 
                className="border border-slate-200 object-cover w-full h-110 mb-4 rounded-2xl"/>
         
               <MoreExplore Data={Data} />

               {/* {console.log(id)} */}
           </section>
            
        <section id='PruductDetails'>
            <div>
                 <h1 className='sm:text-3xl text-xl font-bold'>{data.name}</h1>  
                <div className='flex my-2 gap-2'>
                    <div className="flex text-2xl text-amber-400">
                                         {[...Array(5)].map((_, index) =>
                                                          index < data.rating ? (
                                                            <FaStar key={index} />
                                                          ) : (
                                                            <FaRegStar key={index} />
                                                          )
                                                        )}
                                        </div>
                                <span className='text-slate-500'>{data.rating} (108 reviews)</span>
                </div>
                    <div className='flex gap-3 my-4 items-center'>
                        <h1 className='sm:text-3xl text-xl font-bold'>${data.price}</h1>  
                       {data.oldPrice && <h1 className='sm:text-xl text-slate-400 line-through font-bold'>${data.oldPrice}</h1> }
                      {data.off ? <span className="px-2 h-fit bg-red-500/20 text-red-500 rounded-lg">{data.off}% OFF</span> : '' }
                     {/* {console.log(data.off)} */}
                    </div>
            </div>

            <SelectProduct data={data} setData={setData} orders={orders} setOrders={setOrders}/>    
               
            <ul className='mt-5'>
              <li><FaTruck className="text-cyan-800 inline mr-2" />
               Free shipping on orders over $50</li>
              <li><FaRotateLeft className="text-cyan-800 inline mr-2" />
                30-day easy returns</li>
              <li> <FaLock className="text-cyan-800 inline mr-2" /> 2-year warranty included</li>
            </ul>
        </section>
        </div>

         
         
    </div>
  )
}

export default SingleProduct
