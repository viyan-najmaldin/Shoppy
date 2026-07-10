import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegHeart, FaHeart   } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const Carts = ({data}) => {

  const navigate = useNavigate();
  return (
   
        <Link to={`/products/${data.category}/${data.id}`}>
       <div key={data.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="relative aspect-square bg-slate-100 overflow-hidden cursor-pointer">
                <img src={data.image} alt="img" loading="lazy" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                {/* <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">Hot</span> */}
                {data.off && <span className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg">{data.off}% OFF</span> }
               {data.quantity<15 && <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg">Only {data.quantity} left</span> }
          </div>

      <div className="p-4">
            <div className="text-xs text-slate-500 mb-1 capitalize">{data.category}</div>
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 cursor-pointer hover:text-cyan-700 transition" >{data.name}</h3>
            <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-1 text-yellow-400">

            
                  {[...Array(5)].map((_, index) =>
                    index < data.rating ? (
                      <FaStar key={index} />
                    ) : (
                      <FaRegStar key={index} />
                    )
                  )}
               
              {/* <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
              <FaRegStar /> */}
        </div>

          <span className="text-xs text-slate-500">(168)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <div className="font-bold text-lg text-dark">${data.price}</div>
            {data.oldPrice? <div className="text-xs text-slate-400 line-through">${data.oldPrice}</div>: <div className='p-2'></div>}
          </div>
          <button className="p-2.5 hover:bg-red-100 rounded-xl transition text-slate-400">
           {data.favorite ?<FaHeart className='text-red-500' />: <FaRegHeart />  }
          </button>
          <button className="p-2.5 bg-cyan-700 hover:bg-cyan-500 text-white rounded-xl transition"
          onClick={()=>navigate("/cart")}>
           <FaCartShopping />
          </button>
        
      </div>
    </div>
    </div>
    </Link>
  )
}

export default Carts
