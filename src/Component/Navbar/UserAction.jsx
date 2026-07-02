import React from 'react'
import {
  FaRegUser,
  FaRegHeart,
  FaCartShopping,FaBars
} from "react-icons/fa6";

const UserAction = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className='text-white flex justify-end gap-5 '>
      <button>
           <FaRegUser className="text-lg" />
      </button>

      <button>
           <FaRegHeart className="text-lg" />
      </button>

      <button>
          <FaCartShopping className="text-lg" />
      </button>
      
         <button className='block sm:hidden' onClick={()=>{setIsMenuOpen(!isMenuOpen)}}>
             <FaBars className="text-lg" />
        </button> 
      
    </div>
  )
}

export default UserAction
