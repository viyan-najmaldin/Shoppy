import React from 'react'
import { Link } from 'react-router-dom'

const MenuLinks = () => {
  return (
    <div>
       <div className="flex flex-wrap bg-white sm:bg-transparent text-black sm:text-white flex-col p-3 sm:p-0 sm:flex-row gap-5 mt-2">
      <Link to='/products' className='hover:text-blue-300' href="http://">All Categories</Link>
      <Link to='/products' className='hover:text-blue-300' href="http://">Electronics</Link>
      <Link to='/products' className='hover:text-blue-300' href="http://">Fashion</Link>
      <Link to='/products' className='hover:text-blue-300' href="http://">Home & Living</Link>
      <Link to='/products' className='hover:text-blue-300' href="http://">Sports</Link>
      <Link to='/' className='hover:text-blue-300' href="http://">About</Link>
      <Link to='/contact' className='hover:text-blue-300' href="http://">Contact</Link>
      </div>
    </div>
  )
}

export default MenuLinks
