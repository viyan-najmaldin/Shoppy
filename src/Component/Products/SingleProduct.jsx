import React from 'react'
import { FaStar, FaRegStar } from "react-icons/fa";
import {  FaTruck, FaRotateLeft,FaLock, FaAngleRight } from "react-icons/fa6";
import MoreExplore from './MoreExplore';
import SelectProduct from './SelectProduct';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
// import shopping from "../../assets/Shopping bag-amico.png";



const SingleProduct = ({Data, setData, orders, setOrders}) => {
     const { id  } = useParams();
     const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);
    const data = Data.find(
    (item) => item.id === Number(id) 
  );

  
    useEffect(() => {
      const handleScroll = () => {
        setShowButton(window.scrollY > 300);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);


  return (
    
    <div className='bg-blue-50 pb-10 p-5'>
       {showButton && <div className='bg-slate-300 -mx-5 p-1  px-5 sm:pt-32 top-0 mb-10 fixed w-full'>  <button
            onClick={() => navigate(-1)}
            className="text-cyan-700 hover:text-cyan-900 "
          >
            ← Back to previous
          </button>
        </div> }

      <div className='text-sm  font-semibold flex items-center gap-2'>
        <Link to='/'> <span className='text-slate-500'>Home</span> </Link> 
        <FaAngleRight  className='text-slate-500'/>
         <Link to={`/products/${data.category}`} className='text-slate-500'><span> {data.category}</span></Link>
          <FaAngleRight  className='text-slate-500'/>
         <span> Product Detail</span>
         
         </div> 
   
   
        <div className='bg-white sm:my-5 my-2  rounded-2xl border border-slate-200 sm:p-10 p-4 grid sm:grid-cols-2  gap-10  '>
    
            
           <section id='productImage'>        
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

            <SelectProduct 
                          Data={Data}
                          data={data} 
                          setData={setData}
                          orders={orders} 
                          setOrders={setOrders}/>    
               
            <div className='flex'>
               <ul className='mt-5'>
              <li><FaTruck className="text-cyan-800 inline mr-2" />
               Free shipping on orders over $50</li>
              <li><FaRotateLeft className="text-cyan-800 inline mr-2" />
                30-day easy returns</li>
              <li> <FaLock className="text-cyan-800 inline mr-2" /> 2-year warranty included</li>
            </ul>
            
            {/* <img src={shopping} alt="img shopping" className='w-50'/> */}

            </div>
           
        </section>

        </div>

         
         
    </div>
  )
}

export default SingleProduct
