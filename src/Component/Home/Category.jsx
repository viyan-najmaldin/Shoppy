import React from 'react'
import { IoMdHeadset,IoIosFitness } from "react-icons/io";
import { FaShirt } from "react-icons/fa6";
import { RiSofaFill } from "react-icons/ri";
import { GiLipstick } from "react-icons/gi";
import { MdViewModule } from "react-icons/md";
import { Link } from 'react-router-dom';




const Category = () => {
  return (
    <div className='bg-white mt-15 p-5 py-10 pb-20'>
     <div className='my-5'>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
          Explore our curated collections
        </p>
        <h1 className='text-2xl font-bold'>Shop by Category</h1>
     </div>
      

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        <Link to='/products/Electronics' className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-500 to-cyan-800 rounded-3xl  hover:-rotate-5 transition shadow'>
           <div className='bg-gradient-to-t from-red-300/70 to-cyan-800/1 p-1 py-6 mb-2  rounded-full'>
            <IoMdHeadset className='size-15  mx-auto' />
           </div>
            <h1 className="font-bold">Electronics</h1>
            <span className='opacity-70'>240+ items</span>
        </Link>
        
        <Link to='/products/Fashion' className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-500 to-cyan-800 rounded-3xl  hover:-rotate-5 transition shadow'>
           <div className='bg-gradient-to-t from-blue-300/70 to-cyan-800/1 p-1 py-6 mb-2  rounded-full'>
            <FaShirt className='size-15 mx-auto'/>
           </div>
            
            <h1 className="font-bold">Fashion</h1>
            <span className='opacity-70'>1.2k+ items</span>
            </Link>

        <Link to='/products/Home' className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-500 to-cyan-800 rounded-3xl  hover:rotate-5 transition shadow'>
           <div className='bg-gradient-to-t from-orange-300/70 to-cyan-800/1 p-1 py-6 mb-2  rounded-full'>
            <RiSofaFill className='size-15 mx-auto'/> </div>
            <h1 className="font-bold">Home</h1>
            <span className='opacity-70'>540+ items</span>
        </Link>

        <Link to='/products/Sports' className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-500 to-cyan-800 rounded-3xl  hover:-rotate-5 transition shadow'>
          <div className='bg-gradient-to-t from-purple-300/70 to-cyan-800/1 p-1 py-6 mb-2  rounded-full'>
          <IoIosFitness className='size-15 mx-auto'/> </div>
            <h1 className="font-bold">Sports</h1>
            <span className='opacity-70'>320+ items</span>
            </Link>

        <Link to='/products/Beauty' className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-500 to-cyan-800 rounded-3xl  hover:rotate-5 transition shadow'>
           <div className='bg-gradient-to-t from-green-300/70 to-cyan-800/1 p-1 py-6 mb-2  rounded-full'>
            <GiLipstick className='size-15 mx-auto'/> </div>
            <h1 className="font-bold">Beauty</h1>
            <span className='opacity-70'>480+ items</span>
            </Link>

        <Link to='/products/All' className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-500 to-cyan-800 rounded-3xl  hover:-rotate-5 transition shadow'>
           <div className='bg-gradient-to-t from-red-300/70 to-cyan-800/1 p-1 py-6 mb-2  rounded-full'>
            <MdViewModule className='size-15 mx-auto'/></div>
            <h1 className="font-bold">View All</h1>
            <span className='opacity-70'>3k+ items</span>
            </Link>
       
      </div>
      
    </div>
  )
}

export default Category
