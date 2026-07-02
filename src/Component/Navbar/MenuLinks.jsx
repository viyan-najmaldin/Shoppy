import React from 'react'

const MenuLinks = () => {
  return (
    <div>
       <div className="flex flex-wrap bg-white sm:bg-transparent text-black sm:text-white flex-col p-3 sm:p-0 sm:flex-row gap-5 mt-5">
      <a className='hover:text-blue-300' href="http://">All Categories</a>
      <a className='hover:text-blue-300' href="http://">Electronics</a>
      <a className='hover:text-blue-300' href="http://">Fashion</a>
      <a className='hover:text-blue-300' href="http://">Home & Living</a>
      <a className='hover:text-blue-300' href="http://">Sports</a>
      <a className='hover:text-blue-300' href="http://">About</a>
      <a className='hover:text-blue-300' href="http://">Contact</a>
      </div>
    </div>
  )
}

export default MenuLinks
