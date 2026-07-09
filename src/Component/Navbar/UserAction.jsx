import React from 'react'
import {
  FaRegUser,
  FaRegHeart,
  FaCartShopping,FaBars
} from "react-icons/fa6";
import { Link } from 'react-router-dom';

const UserAction = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className='text-white flex justify-end gap-5 mr-5'>
      <Link to='/account'>
           <FaRegUser className="text-xl" />
      </Link>

      <Link to='/favorites'>
           <FaRegHeart className="text-xl" />
      </Link>

      <Link to='/cart'>
          <FaCartShopping className="text-xl" />
      </Link>
      
         <button className='block sm:hidden' onClick={()=>{setIsMenuOpen(!isMenuOpen)}}>
             <FaBars className="text-lg" />
        </button> 
      
    </div>
  )
}

export default UserAction
