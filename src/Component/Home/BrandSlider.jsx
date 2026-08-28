import React from "react";

const BrandSlider = () => {
  const brands = [
    {
      name: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      name: "Adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Sony",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
    },
    {
      name: "Zara",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
    },
    {
      name: "H&M",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
    },
    {
      name: "Dior",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Dior_Logo.svg",
    },
    {
      name: "IKEA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Ikea_logo.svg",
    },
    {
      name: "Philips",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Philips_logo_new.svg",
    },
    {
      name: "Under Armour",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg",
    },
    
  ];

  const rowOne = [...brands, ...brands];
  const rowTwo = [...brands.reverse(), ...brands];

  return (
    <section className="py-16 bg-white overflow-hidden">

      {/* Header */}
      <div className="text-center mb-10 px-4">

        <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em]">
          Brands you love
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
          Popular Brands
        </h2>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Shop your favorite products from the world's most popular brands.
        </p>

      </div>


      {/* =========================
          ROW 1 — LEFT
      ========================== */}

      <div className="relative overflow-hidden mb-5">

        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40
                     z-10 pointer-events-none
                     bg-gradient-to-r from-white to-transparent"
        />

        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40
                     z-10 pointer-events-none
                     bg-gradient-to-l from-white to-transparent"
        />

        <div
          className="flex w-max items-center
                     animate-[brandLeft_35s_linear_infinite]
                     hover:[animation-play-state:paused]"
        >

          {rowOne.map((brand, index) => (
            <BrandCard
              key={`row-one-${brand.name}-${index}`}
              brand={brand}
            />
          ))}

        </div>

      </div>

      

    </section>
  );
};


/* =========================
   BRAND CARD
========================= */

const BrandCard = ({ brand }) => {
  return (
    <div className="mx-2 sm:mx-3">

      <div
        className="w-32 h-20
                   sm:w-40 sm:h-24
                   md:w-44 md:h-28
                   bg-gray-200
                   rounded-2xl
                   border border-gray-100
                   flex items-center justify-center
                   px-5
                   transition-all duration-300
                   hover:bg-white
                   hover:shadow-lg
                   hover:-translate-y-1"
      >

        <img
          src={brand.logo}
          alt={brand.name}
          className="max-w-[90px]
                     sm:max-w-[110px]
                     max-h-[42px]
                     object-contain
                     grayscale
                     
                     hover:grayscale-0
                     hover:opacity-100
                     transition-all duration-300"
        />

      </div>

    </div>
  );
};

export default BrandSlider;
