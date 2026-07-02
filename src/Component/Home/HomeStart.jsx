import React from 'react'
import { FaFireFlameCurved, FaArrowRight } from "react-icons/fa6";
import Shopping from "../../assets/Shopping.png";

const HomeStart = () => {
  return (
    <div className='flex pt-10 px-5 gap-5 flex-col sm:flex-row'>
        <div className='flex items-center sm:items-start flex-col h-full'>
      <span className="w-fit inline-block px-4 py-1.5 bg-blue-100 text-blue-500 rounded-full text-sm font-semibold mb-4">
            <FaFireFlameCurved className="text-orange-400 inline mr-1" />
            Summer Sale 2024
            </span>

      <div className='text-center sm:text-left'>
           <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4'>Shop Smarter, <br/>
              <span class="p-0 bg-gradient-to-r from-blue-500 to-red-300 bg-clip-text text-transparent">Live Better</span></h1>

        <p className='text-lg text-gray-600'>Discover curated collections from top brands. Up to 70% off on premium products with free shipping.</p>
      </div>

      <div className='flex font-bold gap-5 mt-8'>
         <button className='bg-red-500 text-white shadow-lg rounded-full p-3 px-10 hover:bg-gradient-to-br from-red-700 to-red-500 hover:px-20 transition'>Shop Now <FaArrowRight className="inline mr-1" /> </button>
         <button className='bg-white rounded-full shadow-lg p-3 px-10  hover:px-20'>Learn More</button>
      </div>

      <div className='flex my-8 gap-5'>
            <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=1" class="w-10 h-10 rounded-full border-2 border-white" alt="image1 customers"/>
                <img src="https://i.pravatar.cc/100?img=2" class="w-10 h-10 rounded-full border-2 border-white" alt="imge2 customers"/>
                <img src="https://i.pravatar.cc/100?img=3" class="w-10 h-10 rounded-full border-2 border-white" alt="image3 customers"/>
              </div>
        <div>
           <h2 className='font-bold text-lg'>2 M+</h2>
        <span className='text-gray-600'>Happy Customers</span>  
        </div>  
       
      </div>
    </div> 

    <div className='sm:relative z-0 sm:w-2/4'>
        <img src="https://www.mallofqatar.com.qa/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fmoq-bucket-moq-skwid%2Fshopping_homepage_sqaure_img_1_a07728752d%2Fshopping_homepage_sqaure_img_1_a07728752d.jpg&w=3840&q=75" 
                 class="hidden sm:block rounded-3xl shadow-2xl w-full h-full object-cover" alt="Shopping"></img>
     
     <img src={Shopping} className='sm:absolute w-100 hover:rotate-5 transition -bottom-36 -left-46' alt="Shopping" />
      
    </div>
    </div>
   
  )
}

export default HomeStart
