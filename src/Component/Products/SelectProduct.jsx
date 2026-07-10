import React from 'react'
import {  FaRegHeart, FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const SelectProduct = ({data, setData , orders, setOrders}) => {

      const navigate = useNavigate();
      const onFavToggle=(id)=>{
        setData((prev) =>
        prev.map((product) =>
          product.id === id
            ? { ...product, favorite: !product.favorite }
            : product
        ))
      }


      const onOrders = () => {
        setOrders((prevOrders) => {
          const existingOrder = prevOrders.find(
            (item) => item.myOrder.id === data.id
          );

          if (existingOrder) {
            return prevOrders.map((item) =>
              item.myOrder.id === data.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }

          return [
            ...prevOrders,
            {
              id: prevOrders.length + 1,
              myOrder: data,
              quantity: 2,
            },
          ];
        });
      };

      const myOrderr = orders.find(
        (item) => item.myOrder.id === data.id
      );



      const decreaseQty = () => {
  setOrders((prevOrders) =>
    prevOrders
      .map((item) =>
        item.myOrder.id === data.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};


  return (
      <div className='my-6 py-4 border-slate-300 border-t w-full'>
                           <h1 className='sm:text-xl font-semibold'>Select Color</h1>  
                             <div className='flex gap-2 my-'>
                                <button className='p-3 border border-slate-300 bg-red-500 w-fit rounded-3xl'></button>
                                <button className='p-3 border border-slate-300 bg-white w-fit rounded-3xl'></button>
                                <button className='p-3 border border-slate-300 bg-black w-fit rounded-3xl'></button>
                                <button className='p-3 border border-slate-300 bg-blue-500 w-fit rounded-3xl'></button>
                                <button className='p-3 border border-slate-300 bg-yellow-500 w-fit rounded-3xl'></button>
                             </div>
      
                           <h1 className='sm:text-xl mt-4 py-2 font-semibold'>Quantity</h1>
                          <div className='flex gap-2 items-center'>
                               <div className='flex justify-between items-center gap-5 border border-slate-400 rounded-lg sm:w-40 '>
                               <button className='text-xl font-mono hover:bg-slate-200 px-4 p-1'
                               onClick={decreaseQty}
                               >-</button>
                               <span>                           
                                 {myOrderr ? myOrderr.quantity : 1}                  
                                 </span>
                               <button className='text-xl font-mono hover:bg-slate-200 px-4 p-1'
                                onClick={onOrders}>
                                  +</button>
                          </div>  
                          {data.quantity<15 && <p className='text-slate-500 text-sm'>Only {data.quantity} left in stock</p> }
                          </div>

                    <div className='flex gap-4 py-10 border-b border-slate-300 '>
                        <button className='bg-cyan-800 flex rounded-lg gap-2 text-white p-4 px-10 w-full justify-center items-center hover:bg-gradient-to-r from-cyan-700 to-cyan-500 transition font-semibold'
                        onClick={()=>{
                          onOrders()
                          // console.log(orders)
                          navigate('/cart')
                        }}
                         title='Add to Shopping Cart'> 
                            <FaCartShopping className="text-lg"/>
                            Add to Cart
                        </button>
                        <button className='p-4 border rounded-lg border-slate-300 text-lg text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition'
                         onClick={()=>onFavToggle(data.id)}
                         title='Add to favorite'
                        >
                        {data.favorite? <FaHeart className='text-red-500' />: <FaRegHeart /> } </button>
                    </div>
    </div>
  )
}

export default SelectProduct
