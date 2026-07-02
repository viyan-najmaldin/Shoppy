import React from 'react'
import { FaBagShopping } from "react-icons/fa6";

const PageLogo = () => {
  return (
    <div className='flex items-center  gap-2 text-2xl font-extrabold'>
         <div className='w-9 h-9 bg-gradient-to-br from-red-700 to-red-400 rounded-lg flex items-center justify-center text-white'>
             <FaBagShopping className="text-lg" />
         </div>
   
         <h1 className=' bg-gradient-to-r from-red-300 to-blue-200 bg-clip-text font-playwrite text-transparent py-5'> Shoppy</h1>
       </div>
  )
}

export default PageLogo
