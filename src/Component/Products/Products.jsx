import React, { useState, useEffect } from 'react'
import Carts from '../Home/Carts'
import Filter from './Filter'
import { useParams } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const Products = ({Data, search}) => {

   const { categories  } = useParams();
   const [priceValue, setPriceValue] = useState(500)
   const [categoryValue, setCategoryValue] = useState([])
   const [ratingValue, setRatingValue] = useState(0)
   const [sortValue, setSortValue] = useState("featured");
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


 
const myData = Data.filter((product) =>{

   const myCategory=  (categories === "All" || product.category === categories) &&
                      (categoryValue.length === 0 || categoryValue.includes(product.category))
   const myPrice = product.price <= priceValue
   const myRating =  ratingValue === 0 || product.rating >= ratingValue;
   const mySearch =
                  product.name.toLowerCase().includes(search.toLowerCase()) ||
                  product.category.toLowerCase().includes(search.toLowerCase()) ||
                  product.color.toLowerCase().includes(search.toLowerCase());


   return myCategory && myPrice && myRating && mySearch
    }  );
   
    const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

    const sortedData = [...myData];

      if (sortValue === "price-low") {
      sortedData.sort((a, b) => a.price - b.price);
      } else if (sortValue === "price-high") {
      sortedData.sort((a, b) => b.price - a.price);
      } else if (sortValue === "rating") {
      sortedData.sort((a, b) => b.rating - a.rating);
      }

      
  return (
    <div className='sm:flex gap-5 bg-blue-50 pb-10 p-5'>
       <Filter priceValue={priceValue} setPriceValue={setPriceValue} 
       categoryValue={categoryValue} setCategoryValue={setCategoryValue}
       ratingValue={ratingValue}  setRatingValue={setRatingValue}
       Data={Data} />
      { sortedData.length?  <div>
                <div className='sm:mt-9 flex justify-between flex-col sm:flex-row sm:items-center p-4 bg-white text-slate-600 border border-slate-200 rounded-2xl'>
                    <div className='m-2'>
                        Showing 
                        <span className='text-black font-semibold'> {myData.length} </span> 
                        products
                      </div>
                 
                    <div>
                      <label className='hidden lg:inline mr-2'>Sort:</label>
                         <select id="sortSelect" 
                         value={sortValue}
                         onChange={(e) => setSortValue(e.target.value)}
                         className="flex-1 flex-initial p-2 border w-full lg:w-auto border-slate-300 rounded-lg text-sm focus:outline-none focus:border-none focus:ring-2 focus:ring-cyan-700/30">
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="newest">Newest</option>
                         </select>
                    </div>
                 </div>
 
                    <div className='mt-5 grid grid-cols-2 lg:grid-cols-3 gap-5'>
                        {sortedData.map(data=> <Carts key={data.id} data={data} />)}
                    </div>
        </div> : <h1 className='mx-auto text-2xl text-slate-700 sm:min-h-fit min-h-100 sm:mt-20'>Product not found</h1>
}

           {showButton &&
                <button
               onClick={scrollToTop}
               className="fixed bottom-6 right-6 w-12 h-12 bg-slate-800 text-white rounded-full shadow-lg hover:bg-cyan-800 transition-all duration-300 flex items-center justify-center" > 
               <FaArrowUp />
               </button> }

    </div>
  )
}

export default Products
