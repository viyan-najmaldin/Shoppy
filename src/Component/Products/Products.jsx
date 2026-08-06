import React, { useState, useEffect } from 'react'
import Carts from '../Home/Carts'
import Filter from './Filter'
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import nodata from '../../assets/Search engines-rafiki.png'

const Products = ({Data,setData, search , orders, setOrders}) => {

   const { categories  } = useParams();
   const [priceValue, setPriceValue] = useState(500)
   const [categoryValue, setCategoryValue] = useState([])
   const [ratingValue, setRatingValue] = useState(0)
   const [sortValue, setSortValue] = useState("featured");
   const [showButton, setShowButton] = useState(false);
     const navigate = useNavigate();


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
                        {sortedData.map(data=> <Carts key={data.id} data={data} setData={setData} orders={orders} setOrders={setOrders} />)}
                    </div>
        </div> : 
        // <div>
        // <h1 className='mx-auto text-2xl text-slate-700 sm:min-h-fit min-h-100 sm:mt-20'>
        //   Product not found</h1>
        //   <div className='flex flex-col justify-center'>  
        //                 <img src={nodata} alt="image wishlist" className='w-50'/>
        //                <button className='bg-red-500 mb-4 text-white shadow-lg rounded-full p-3 px-10 hover:bg-gradient-to-r from-cyan-600 to-red-400 hover:font-semibold transition'
        //                        onClick={()=>navigate("/products/All")}>
        //                         Shop Now  </button>
        //                 </div>
        //   </div>
              <div className="flex sm:ml-20 flex-col sm:flex-row items-center gap-3">
                    <div><h3 className="text-2xl font-semibold">Product not found</h3>
                    <p className="text-gray-500 mt-2">
                     We couldn't find any results.
                    </p>
                      </div>
                             <div className='flex flex-col justify-center'>  
                                  <img src={nodata} alt="image no-product" className='w-80'/>
                                 <button className='bg-red-500 mb-4 text-white shadow-lg rounded-full p-3 px-10 hover:bg-gradient-to-r from-cyan-600 to-red-400 hover:font-semibold transition'
                                         onClick={()=>navigate("/products/All")}>
                                          Shop Now  </button>
                                  </div>
                  </div>
          
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
