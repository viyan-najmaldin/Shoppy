import React from 'react'
import PageLogo from './Navbar/PageLogo'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-[#003049] px-5 py-10 w-full flex lg:gap-20 flex-nowrap gap-5 flex-col text-white lg:flex-row'>

        <div className='lg:w-2/4'>
            <PageLogo />
            <p>Your one-stop destination for premium products. Quality, value, and exceptional service guaranteed.</p>
            <div className="flex gap-3 my-5">
                        <button className="w-10 h-10 bg-cyan-700  hover:bg-cyan-500 rounded-lg flex items-center justify-center transition">
                            <FaFacebookF />
                        </button>

                        <button className="w-10 h-10 bg-cyan-700  hover:bg-cyan-500 rounded-lg flex items-center justify-center transition">
                            <FaTwitter />
                        </button>

                        <button className="w-10 h-10 bg-cyan-700  hover:bg-cyan-500 rounded-lg flex items-center justify-center transition">
                            <FaInstagram />
                        </button>

                        <button className="w-10 h-10 bg-cyan-700  hover:bg-cyan-500 rounded-lg flex items-center justify-center transition">
                            <FaYoutube />
                        </button>
                </div>
        </div>

    
    <div className='sm:gap-20 gap-10 grid sm:grid-cols-2 lg:grid-cols-3 '>
            <div>
            <h1 className='font-bold text-lg mb-2'>Shop</h1>
            <ul>
                 <li className='text-slate-400 hover:text-white'>All Products</li>
                 <li className='text-slate-400 hover:text-white'>Electronics</li>
                 <li className='text-slate-400 hover:text-white'>Fashion</li>
                 <li className='text-slate-400 hover:text-white'>Home & Living</li>
            </ul>
        </div>

          <div>
            <h1 className='font-bold text-lg mb-2'>Company</h1>
            <ul>
                 <li className='text-slate-400 hover:text-white'>About Us</li>
                 <li className='text-slate-400 hover:text-white'>Contact</li>
                 <li className='text-slate-400 hover:text-white'>Careers</li>
                 <li className='text-slate-400 hover:text-white'>Blog</li>
            </ul>
        </div>

        <div>
            <h1 className='font-bold text-lg mb-2'>Support</h1>
            <ul>
                 <li className='text-slate-400 hover:text-white'>Help Center</li>
                 <li className='text-slate-400 hover:text-white'>Returns</li>
                 <li className='text-slate-400 hover:text-white'>Shopping Info</li>
                <li className='text-slate-400 hover:text-white'>Track Order</li>
            </ul>
        </div>    
        
    </div>
      

      

    </div>

  )
}

export default Footer
