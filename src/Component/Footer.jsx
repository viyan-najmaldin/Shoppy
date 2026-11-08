import React from 'react'
import PageLogo from './Navbar/PageLogo'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useCategories } from '../api/productApi';
const Footer = () => {
  const { categories } = useCategories();
  const footerCategories = categories.filter((category) => !category.isCollection).slice(0, 4);
 const goToFacebook = () => {
    window.location.href = "https://www.facebook.com";
  };
  const goToX = () => {
    window.location.href = "https://www.x.com";
  };
 const goToInstagram = () => {
    window.location.href = "https://www.instagram.com";
  };
   const goToYoutube = () => {
    window.location.href = "https://www.youtube.com";
  };


  return (
    <footer className='bg-tigris-800 sm:pt-10 p-5'>

            <div className=' w-full flex lg:gap-20 flex-nowrap gap-5 flex-col text-white lg:flex-row'>
                    <div className='lg:w-2/4'>
                        <div className="mb-4"><PageLogo /></div>
                        <p>Your one-stop destination for premium products. Quality, value, and exceptional service guaranteed.</p>
                        <div className="flex gap-3 my-5">
                                    <button className="w-10 h-10 bg-tigris-700  hover:bg-tigris-500 rounded-lg flex items-center justify-center transition"
                                     onClick={()=>goToFacebook()}
                                    > <FaFacebookF /> </button>

                                    <button className="w-10 h-10 bg-tigris-700  hover:bg-tigris-500 rounded-lg flex items-center justify-center transition"
                                     onClick={()=>goToX()} >
                                          <FaTwitter />  </button>

                                    <button className="w-10 h-10 bg-tigris-700  hover:bg-tigris-500 rounded-lg flex items-center justify-center transition"
                                     onClick={()=>goToInstagram()} >
                                        <FaInstagram /> </button>

                                    <button className="w-10 h-10 bg-tigris-700  hover:bg-tigris-500 rounded-lg flex items-center justify-center transition"
                                     onClick={()=>goToYoutube()}>
                                        <FaYoutube /> </button>
                            </div>
                    </div>

                
                <div className='gap-6 sm:gap-10 lg:gap-20 grid grid-cols-2 sm:grid-cols-3'>
                        <div>
                        <h1 className='font-bold text-lg mb-2'>Shop</h1>
                        <ul>
                            <li><Link to='/products/All' className='text-slate-400 hover:text-white'>All Products</Link></li>
                            {footerCategories.map((category) => (
                              <li key={category.id}><Link to={`/products/${category.id}`} className='text-slate-400 hover:text-white' dir="auto">{category.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h1 className='font-bold text-lg mb-2'>Company</h1>
                        <ul>
                            <Link to='/'><li className='text-slate-400 hover:text-white'>About Us</li></Link>
                            <Link to='/contact'><li className='text-slate-400 hover:text-white'>Contact</li></Link>
                            <Link to='/'><li className='text-slate-400 hover:text-white'>Careers</li></Link>
                            <Link to='/'><li className='text-slate-400 hover:text-white'>Blog</li></Link>
                        </ul>
                    </div>

                    <div>
                        <h1 className='font-bold text-lg mb-2'>Support</h1>
                        <ul>
                            <Link to='/'><li className='text-slate-400 hover:text-white'>Help Center</li></Link>
                            <Link to='/'><li className='text-slate-400 hover:text-white'>Returns</li></Link>
                            <Link to='/'><li className='text-slate-400 hover:text-white'>Shopping Info</li></Link>
                            <Link to='/'><li className='text-slate-400 hover:text-white'>Track Order</li></Link>
                        </ul>
                    </div>    
                    
                </div>
                
            </div>
 


        <div className='text-center text-slate-500 p-2 mt-5 text-sm border-t border-slate-700'>
            <p>© 2026 Shoppy. All rights reserved.</p>
        </div>
      

    </footer>

  )
}

export default Footer
