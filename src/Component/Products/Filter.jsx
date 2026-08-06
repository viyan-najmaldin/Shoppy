import { useState } from 'react'
import { FaStar, FaRegStar ,FaAngleRight } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { useParams, Link } from "react-router-dom";

const Filter = ({Data, priceValue , setPriceValue, categoryValue, setCategoryValue, ratingValue, setRatingValue}) => {
   
    const [showFilter, setShowFilter] = useState(false)
    const { categories  } = useParams();
   
    const handleReset = () => {
        setPriceValue(500); 
        setCategoryValue([]);
        setRatingValue(0);
    };


    const filterCategory= (e) => {
                                if (e.target.checked) {
                                  setCategoryValue((prev) => [...prev, e.target.value]);
                                } else {
                                  setCategoryValue((prev) =>
                                    prev.filter((item) => item !== e.target.value)
                                  );
                                }
                              }

  return (
    <aside>
      <div className='flex justify-between items-center pb-2 sm:pb-4 sm:sticky top-35 text-sm'>
         <div className='font-semibold flex items-center gap-2'>
          <Link to='/' className='text-slate-500'> <span>Home</span></Link> 
          <FaAngleRight  className='text-slate-500'/>
           
           <span>{categories}</span></div>
         <button onClick={()=>{setShowFilter(!showFilter)}}>
         <IoFilter className="sm:hidden text-cyan-800 rounded-lg text-2xl" />
      </button>
      </div>
     
        <div className={`${showFilter? 'block': 'hidden'} sm:block p-5 py-10 border border-slate-200 sm:sticky top-45 bg-white min-w-60 max-h-fit rounded-2xl mb-5 sm:mb-0`}>

            <div className='flex justify-between mb-5'>
                  <h1 className='font-bold text-lg'>Filters</h1>
                  <button 
                  className='text-cyan-700 hover:text-cyan-500'
                   onClick={handleReset}
                  >Reset
                  </button>
            </div>

            <div className='pb-5 border-b border-slate-200'>
                <h1 className='font-semibold'>Price Range</h1>
                <input className='w-full' type="range" name="price" id="price" list='prices' value={priceValue} onChange={(e)=>setPriceValue(e.target.value)} />

                <div className="flex items-center justify-between text-sm text-slate-600 ">
                      <span>$0</span>
                      <span id="priceValue" className="font-medium text-dark">{priceValue}$</span>
                      <span>$500</span> 
                </div> 
            </div>

            <div className='py-5 border-b border-slate-200'>
                  <h1 className='font-semibold'>Categories</h1>   
                  <div className="space-y-2 pt-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-primary rounded" 
                           checked={categoryValue.includes("Electronics")}
                           onChange={filterCategory} 
                              value="Electronics"/>
                            <span className="text-sm">Electronics</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-primary rounded"
                              checked={categoryValue.includes("Fashion")}
                              onChange={filterCategory}
                              value="Fashion"/>
                            <span className="text-sm">Fashion</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4  rounded"
                              checked={categoryValue.includes("Home & Living")}
                              onChange={filterCategory}
                              value="Home & Living"/>
                            <span className="text-sm">Home & Living</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-primary rounded"
                              checked={categoryValue.includes("Sports")}
                              onChange={filterCategory}
                            value="Sports"/>
                            <span className="text-sm">Sports</span>
                        </label>
                   </div>  
            </div>

            <div className='pt-5 border-slate-200'>
                  <h1 className='font-semibold'>Rating</h1>   
                  <div className="space-y-2 py-3 ">
                        <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="rating" value="4" className="rating-filter w-4 h-4 text-primary"
                                   checked={ratingValue === 4}
                                   onChange={(e) => setRatingValue(Number(e.target.value))}/>

                                <div className="flex text-amber-400 text-sm">
                                  <FaStar />
                                  <FaStar />
                                  <FaStar />
                                  <FaStar />
                                  <FaRegStar />
                                </div>
                                <span className="text-sm text-slate-600">&amp; up</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="rating" value="3" className="rating-filter w-4 h-4 text-primary"
                                  checked={ratingValue === 3}
                                  onChange={(e) => setRatingValue(Number(e.target.value))}/>

                              <div className="flex text-amber-400 text-sm">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaRegStar />
                                <FaRegStar />
                              </div>
                              <span className="text-sm text-slate-600">&amp; up</span>
                    </label>
                  </div>
               
            </div>

        
     </div> 
    </aside>
    
  )
}

export default Filter
