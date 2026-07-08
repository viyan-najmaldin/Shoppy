import React from 'react'

const MoreExplore = () => {
  return (
    <div className='border-slate-300 border-b pb-5'>
             <span className='text-sm p-1 text-cyan-700 hover:underline'>Explore more</span>
               <div className='grid grid-cols-4 gap-2 mt-1  sm:h-30 h-20 justify-center'>
                <img src="https://wallartprints-bt.myshopify.com/cdn/shop/files/hummingbird-nature-pictures-98278440.jpg" alt="img" loading="lazy" 
                      className=" object-cover w-full  sm:h-30 h-20 border border-slate-200 rounded-lg hover:scale-105 transition-transform duration-500"/>
                <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" alt="img" loading="lazy" 
                      className=" object-cover w-full  sm:h-30 h-20 border border-slate-200 rounded-lg hover:scale-105 transition-transform duration-500"/>
                <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" alt="img" loading="lazy" 
                      className=" object-cover w-full  sm:h-30 h-20 border border-slate-200 rounded-lg hover:scale-105 transition-transform duration-500"/>
                <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" alt="img" loading="lazy" 
                      className=" object-cover w-full  sm:h-30 h-20 border border-slate-200 rounded-lg hover:scale-105 transition-transform duration-500"/>
               </div>
    </div>
  )
}

export default MoreExplore
