import React from 'react'
import Carts from '../Home/Carts'
import wishlist from "../../assets/Online wishes list-rafiki.png";
import { useNavigate } from "react-router-dom";


const FavProducts = ({Data,setData, orders, setOrders}) => {
  
  const myData =  Data.filter((product) => product.favorite === true) ;
  const navigate = useNavigate();

  return (
    <div className='min-h-100'>
      <div className='p-5'>
        <h1 className='text-3xl mb-2'>Favorites</h1>
      <p className='text-slate-500'>Store everything you love on one page.
       Think about it before purchasing it.</p>
      </div>
      
      <div className='px-5 mb-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5'>
                        
          {(myData.length)?
           myData.map(data=> <Carts data={data} setData={setData} orders={orders} setOrders={setOrders}
            />)
            :
            <div className='flex flex-col sm:flex-row justify-center items-center lg:col-span-5 col-span-2 sm:col-span-3 gap-5'>
              <p className='text-slate-500 '>It is empty here</p>
             <div className='flex flex-col justify-center'>  
              <img src={wishlist} alt="image wishlist" className='w-100'/>
             <button className='bg-red-500 mb-4 text-white shadow-lg rounded-full p-3 px-10 hover:bg-gradient-to-r from-cyan-600 to-red-400 hover:font-semibold transition'
                     onClick={()=>navigate("/products/All")}>
                      Shop Now  </button>
              </div>
            </div>
          }
                       
                        
                    </div>
    </div>
  )
}

export default FavProducts
