import React from 'react'
import { Link,useNavigate } from 'react-router-dom'


const MoreExplore = ({Data}) => {
      const navigate = useNavigate();
      const randomProducts = [...Data]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  return (
    <div className='border-slate-300 border-b pb-5'>
           <Link to='/products/All'><span className='text-sm p-1 text-cyan-700 hover:underline'>Explore more</span></Link>
              
               <div className='grid grid-cols-4 gap-2 mt-1  sm:h-30 h-20 justify-center'>
                {randomProducts.map((product) => (  
               <Link to={`/products/${product.category}/${product.id}`}>
               <img src={product.image} alt={product.name} loading="lazy" 
                      className=" object-cover w-full  sm:h-30 h-20 border border-slate-200 rounded-lg hover:scale-105 transition-transform duration-500"/>
              </Link>))}  </div>
              
    </div>
  )
}

export default MoreExplore
