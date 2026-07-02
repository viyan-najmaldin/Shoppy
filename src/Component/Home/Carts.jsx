import React from 'react'

const Carts = () => {
  return (
   
      
       <div class="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div class="relative aspect-square bg-slate-100 overflow-hidden cursor-pointer">
        <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" alt="img" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
        <span class="absolute top-3 left-3 px-2.5 py-1 bg-blue-500 text-white text-xs font-bold rounded-lg"fgfd></span>
        <span class="absolute top-3 right-3 px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg">20% OFF</span>
        <span class="absolute bottom-3 left-3 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg">Only 10 left</span>
      </div>
    </div>
  )
}

export default Carts
