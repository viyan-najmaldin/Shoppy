import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";

const Search = ({search, setSearch}) => {
  return (
    <div className='relative w-full sm:w-2/4 sm:order-0 order-1 mt-5 sm:mt-2'>
      <input 
      className='bg-white w-full shadow-lg rounded-full p-2 sm:p-3 px-4  pl-10 sm:pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition' 
      type="text" 
      name="search"  
       value={search}
       onChange={(e) => setSearch(e.target.value)}
       id="searchInput" 
       placeholder="Search for products, brands and more..." />
      <FaMagnifyingGlass className="absolute left-4 top-3 sm:top-4.5 text-slate-400" />
    </div>
  )
}

export default Search
