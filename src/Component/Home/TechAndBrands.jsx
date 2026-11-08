
import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const UpgradeTechSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1800&q=80",
      smallText: "NEW TECHNOLOGY",
      title: "Upgrade Your Tech",
      description:
        "Discover powerful laptops designed to keep up with your everyday life.",
      button: "Shop Laptops",
    },
    {
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1800&q=80",
      smallText: "LATEST DEVICES",
      title: "Smartphones That Stand Out",
      description:
        "Experience stunning displays, powerful performance and modern design.",
      button: "Shop Smartphones",
    },
    {
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1800&q=80",
      smallText: "BETTER SOUND",
      title: "Hear Every Detail",
      description:
        "Upgrade your listening experience with premium wireless headphones.",
      button: "Shop Headphones",
    },
    {
      image:
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1800&q=80",
      smallText: "LEVEL UP",
      title: "Build Your Gaming Setup",
      description:
        "Everything you need to take your gaming experience to the next level.",
      button: "Shop Gaming",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 sm:px-5 mt-4">

      {/* Section title */}
      <div className="mb-6 z-2">
        <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-widest">
          Discover what's new
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
          Upgrade Your Tech
        </h2>
      </div>

      {/* Slider */}
      <Link to='/products/All'>
      <div className="relative w-full h-[220px] sm:h-[270px] overflow-hidden rounded-2xl sm:rounded-3xl">

        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide
                ? "opacity-100 z-6"
                : "opacity-0 z-0"
            }`}
          >

            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative z-8 h-full flex items-center">

              <div className="px-14 sm:px-20 lg:px-24 max-w-xl text-white">

                <p className="text-xs sm:text-sm font-semibold tracking-[0.25em]  text-white/80">
                  {slide.smallText}
                </p>

                <h3 className="text-xl sm:text-3xl font-bold leading-tight">
                  {slide.title}
                </h3>

                <p className="mt-2 sm:mt-5 text-sm sm:text-base lg:text-lg text-white/80 max-w-md leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {slide.description}
                </p>

                <span
                  className="inline-block mt-4 sm:mt-7 bg-white text-black
                             px-6 py-3 rounded-full
                             font-semibold text-sm
                             hover:bg-gray-200
                             transition duration-300
                             hover:scale-105"
                >
                  {slide.button}
                </span>

              </div>
            </div>
          </div>
        ))}

        {/* Previous button */}
        <button
          onClick={(e) => { e.preventDefault(); previousSlide(); }}
          aria-label="Previous slide"
          className="absolute z-8 left-3 sm:left-6 top-1/2
                     -translate-y-1/2
                     w-9 h-9 sm:w-12 sm:h-12
                     rounded-full
                     bg-white/20
                     backdrop-blur-md
                     border border-white/30
                     text-white
                     flex items-center justify-center
                     hover:bg-white hover:text-black
                     transition duration-300"
        >
          <FiArrowLeft size={20} />
        </button>

        {/* Next button */}
        <button
          onClick={(e) => { e.preventDefault(); nextSlide(); }}
          aria-label="Next slide"
          className="absolute z-8 right-3 sm:right-6 top-1/2
                     -translate-y-1/2
                     w-9 h-9 sm:w-12 sm:h-12
                     rounded-full
                     bg-white/20
                     backdrop-blur-md
                     border border-white/30
                     text-white
                     flex items-center justify-center
                     hover:bg-white hover:text-black
                     transition duration-300"
        >
          <FiArrowRight size={20} />
        </button>

        {/* Dots */}
        <div
          className="absolute z-8 bottom-3 sm:bottom-6 left-1/2
                     -translate-x-1/2
                     flex items-center gap-2"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

      </div></Link>
    </section>
  );
};

export default UpgradeTechSlider;
