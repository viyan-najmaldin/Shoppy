import React, { useEffect, useState } from 'react';
import { FaFireFlameCurved, FaArrowRight, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Shopping from "../../assets/Shopping.png";
import Shopping1 from "../../assets/11.jpg";
import Shopping2 from "../../assets/22.jpg";
import Shopping3 from "../../assets/33.jpg";
import { useNavigate } from "react-router-dom";

const HomeStart = () => {

  const navigate = useNavigate();

  // Images for the carousel
  const slides = [
    Shopping1,
    Shopping2,
    Shopping3
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change image
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );

    }, 4000);

    return () => clearInterval(interval);

  }, [slides.length]);


  // Previous button
  const previousSlide = () => {

    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  };


  // Next button
  const nextSlide = () => {

    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );

  };


  return (

    <div className='flex pt-10 px-5 sm:pr-0 gap-5 flex-col sm:flex-row'>

      {/* LEFT SIDE */}

      <div className='flex items-center sm:items-start flex-col h-full'>

        <span className="w-fit inline-block px-4 py-1.5 bg-blue-100 text-blue-500 rounded-full text-sm font-semibold mb-4">

          <FaFireFlameCurved className="text-orange-400 inline mr-1" />

          Summer Sale 2026

        </span>


        <div className='text-center sm:text-left'>

          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4'>

            Shop Smarter, <br/>

            <span className="p-0 bg-gradient-to-r from-blue-500 to-red-300 bg-clip-text text-transparent">

              Live Better

            </span>

          </h1>


          <p className='text-lg text-gray-600'>

            Discover curated collections from top brands.
            Up to 70% off on premium products with free shipping.

          </p>

        </div>


        <div className='flex font-bold gap-5 mt-8'>

          <button
            className='bg-red-500 text-white shadow-lg rounded-full p-3 px-10 hover:bg-gradient-to-r from-red-600 to-orange-400 transition'
            onClick={() => navigate("/products/All")}
          >

            Shop Now

            <FaArrowRight className="inline ml-1" />

          </button>


          <button
            className='bg-white rounded-full shadow-lg p-3 px-10 hover:bg-gray-500 transition hover:text-white'
          >

            Learn More

          </button>

        </div>


        <div className='flex my-8 gap-5'>

          <div className="flex -space-x-3">

            <img
              src="https://i.pravatar.cc/100?img=1"
              className="w-10 h-10 rounded-full border-2 border-white"
              alt="customer"
            />

            <img
              src="https://i.pravatar.cc/100?img=2"
              className="w-10 h-10 rounded-full border-2 border-white"
              alt="customer"
            />

            <img
              src="https://i.pravatar.cc/100?img=3"
              className="w-10 h-10 rounded-full border-2 border-white"
              alt="customer"
            />

          </div>


          <div>

            <h2 className='font-bold text-lg'>
              2 M+
            </h2>

            <span className='text-gray-600'>
              Happy Customers
            </span>

          </div>

        </div>

      </div>


      <div className='sm:relative z-0 sm:w-2/4'>

        <div className='hidden sm:block relative sm:w-70 lg:w-full h-full overflow-hidden rounded-full lg:rounded-r-[2vw]'>

          <img
            src={slides[currentSlide]}
            alt="Shopping"
            className="w-full h-full object-cover transition-opacity duration-700"
          />

          <button
            onClick={previousSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 
                       w-10 h-10 rounded-full 
                       bg-white/40 backdrop-blur-sm
                       hover:bg-white/70
                       flex items-center justify-center
                       transition"
          >

            <FaAngleLeft />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 
                       w-10 h-10 rounded-full 
                       bg-white/40 backdrop-blur-sm
                       hover:bg-white/70
                       flex items-center justify-center
                       transition">
            <FaAngleRight />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-7 bg-white"
                    : "w-2 bg-white/50"
                }`}   />
            ))}

          </div>
        </div>


            <img
          src={Shopping}
          className='sm:absolute w-100 hover:rotate-5 transition -bottom-36 -left-46'
          alt="Shopping"
        />
      </div>

       
    </div>
  );
};

export default HomeStart;