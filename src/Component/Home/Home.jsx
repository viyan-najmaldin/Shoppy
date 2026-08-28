import React from 'react'
import HomeStart from './HomeStart'
import Category from './Category'
import TrindingProducts from './TrindingProducts'
import TechAndBrands from './TechAndBrands'
import BrandSlider from './BrandSlider'
import Subscribe from './Subscribe'
import Aboutwebsite from './Aboutwebsite'
import { useState,useEffect } from 'react'
import { FaArrowUp } from "react-icons/fa";



const Home = ({Data , setData, orders, setOrders}) => {
    const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

     const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  return (
    <div className='bg-blue-50 font-josefin'>
      <HomeStart/>
      <Category />
      <TechAndBrands />
      <TrindingProducts Data={Data} setData={setData} orders={orders} setOrders={setOrders} />
       <BrandSlider />
      <Aboutwebsite />
      {/* <Subscribe /> */}
      <div className='bg-blue-50 h-20'></div>
          {showButton &&
                      <button
                     onClick={scrollToTop}
                     className="fixed bottom-6 right-6 w-12 h-12 bg-slate-800 text-white rounded-full shadow-lg hover:bg-cyan-800 transition-all duration-300 flex items-center justify-center" > 
                     <FaArrowUp />
                     </button> }
    </div>
  )
}

export default Home
