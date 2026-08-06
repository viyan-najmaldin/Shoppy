import React from 'react'
import {
  FaTruck,
  FaRotateLeft,
  FaLock,
  FaHeadset,
} from "react-icons/fa6";

const Aboutwebsite = () => {
  return (
    <div className="bg-white border-y sm:my-5 border-slate-300">
  <div className="max-w-7xl mx-auto px-4 py-15">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
     
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FaTruck className="text-purple-500 text-2xl" />
        </div>
        <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
        <p className="text-slate-600 text-sm">On all orders over $50</p>
      </div>

      
      <div className="text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FaRotateLeft className="text-red-500 text-2xl" />
        </div>
        <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
        <p className="text-slate-600 text-sm">30-day return policy</p>
      </div>

      <div className="text-center">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FaLock className="text-emerald-600 text-2xl" />
        </div>
        <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
        <p className="text-slate-600 text-sm">100% secure transactions</p>
      </div>

      <div className="text-center">
        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FaHeadset className="text-amber-600 text-2xl" />
        </div>
        <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
        <p className="text-slate-600 text-sm">Dedicated customer service</p>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Aboutwebsite
