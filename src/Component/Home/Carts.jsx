import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegHeart  } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Carts = () => {
  return (
   
      
       <div className="group bg-white shadow rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square bg-slate-100 overflow-hidden cursor-pointer">
        <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" alt="img" loading="lazy" 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">Hot</span>
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg">20% OFF</span>
        <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg">Only 10 left</span>
      </div>

      <div className="p-4">
        <div className="text-xs text-slate-500 mb-1 capitalize">Home</div>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 cursor-pointer hover:text-cyan-700 transition" >Name</h3>
        <div className="flex items-center gap-1 mb-3">
        <div className="flex items-center gap-1 text-yellow-400">
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStarHalfAlt />
      <FaRegStar />
    </div>

          <span className="text-xs text-slate-500">(168)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <div className="font-bold text-lg text-dark">$50</div>
            <div className="text-xs text-slate-400 line-through">$70</div>
          </div>
          <button className="p-2.5 hover:bg-red-100 rounded-xl transition text-slate-400">
            <FaRegHeart />
          </button>
          <button className="p-2.5 bg-cyan-700 hover:bg-cyan-500 text-white rounded-xl transition">
           <FaCartShopping className="" />
          </button>
        
      </div>
    </div>
    </div>
  )
}

export default Carts
