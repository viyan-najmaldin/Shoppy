import React from 'react'
import {
  FaRegUser,
  FaRegHeart,
  FaCartShopping,FaBars
} from "react-icons/fa6";
import { Link } from 'react-router-dom';

const UserAction = ({ isMenuOpen, setIsMenuOpen, orders }) => {
  return (
    <div className='text-white flex justify-end gap-5 mr-5'>
      <Link className='hover:text-cyan-400' to='/account'>
           <FaRegUser className="text-xl sm:mx-auto" /> 
           <span className='text-xs sm:block hidden'>Account</span>
      </Link>

      <Link className='hover:text-cyan-400' to='/favorites'>
           <FaRegHeart className="text-xl sm:mx-auto" />
           <span className='text-xs sm:block hidden'>Favorites</span>
      </Link>

      <Link className='hover:text-cyan-400 relative' to='/cart'>
          <FaCartShopping className="text-xl sm:mx-auto" />
        {orders.length > 0 && (
        <p className='absolute -top-2 -right-2 bg-red-500 px-1 w-fit text-xs rounded-full text-white'>
          {orders.reduce((total, item) => total + item.quantity, 0)}
        </p>
      )}
           <span className='sm:block hidden text-xs'>Cart</span>
      </Link>
      
         <button className='block sm:hidden' onClick={()=>{setIsMenuOpen(!isMenuOpen)}}>
             <FaBars className="text-lg" />
        </button> 
      
    </div>
  )
}

export default UserAction
