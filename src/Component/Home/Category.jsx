import React from 'react'
import { IoMdHeadset,IoIosFitness } from "react-icons/io";
import { FaShirt } from "react-icons/fa6";
import { RiSofaFill } from "react-icons/ri";
import { GiLipstick } from "react-icons/gi";
import { MdViewModule } from "react-icons/md";




const Category = () => {
  return (
    <div className='bg-white mt-15 p-5 py-10 pb-20'>
     <div className='m-5'>
        <h1 className='text-2xl font-bold'>Shop by Category</h1>
      <p>Explore our curated collections</p>
     </div>
      

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        <div className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-400 to-cyan-700 rounded-3xl  hover:-rotate-5 transition shadow'>
            <IoMdHeadset className='size-15 mx-auto' />
            <h1 className="font-bold">Electronics</h1>
            <span className='opacity-70'>240+ items</span>
        </div>
        
        <div className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-400 to-cyan-700 rounded-3xl  hover:-rotate-5 transition shadow'>
            <FaShirt className='size-15 mx-auto'/>
            <h1 className="font-bold">Fashion</h1>
            <span className='opacity-70'>1.2k+ items</span>
            </div>

        <div className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-400 to-cyan-700 rounded-3xl  hover:rotate-5 transition shadow'>
            <RiSofaFill className='size-15 mx-auto'/>
            <h1 className="font-bold">Home</h1>
            <span className='opacity-70'>540+ items</span>
        </div>

        <div className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-400 to-cyan-700 rounded-3xl  hover:-rotate-5 transition shadow'>
          <IoIosFitness className='size-15 mx-auto'/>
            <h1 className="font-bold">Sports</h1>
            <span className='opacity-70'>320+ items</span>
            </div>

        <div className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-400 to-cyan-700 rounded-3xl  hover:rotate-5 transition shadow'>
            <GiLipstick className='size-15 mx-auto'/>
            <h1 className="font-bold">Beauty</h1>
            <span className='opacity-70'>480+ items</span>
            </div>

        <div className='p-10 sm:p-12 text-center text-white bg-gradient-to-tr from-gray-400 to-cyan-700 rounded-3xl  hover:-rotate-5 transition shadow'>
            <MdViewModule className='size-15 mx-auto'/>
            <h1 className="font-bold">View All</h1>
            <span className='opacity-70'>3k+ items</span>
            </div>
       
      </div>
      
    </div>
  )
}

export default Category
