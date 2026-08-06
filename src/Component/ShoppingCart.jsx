import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link , useNavigate} from "react-router-dom";
import orderss from "../assets/In no time-bro.png";



export default function ShoppingCart({ orders, setOrders}) {
  
  const navigate = useNavigate();
  const [showDeleteId , setShowDeleteId ] =useState(null)
  const increaseQty = (id) => {
    setOrders((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // console.log(orders)

const decreaseQty = (id) => {
  setOrders((items) => {
    const item = items.find((item) => item.id === id);

    if (item.quantity === 1) {
      return items.filter((item) => item.id !== id);
    }

    return items.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  });
};

  const removeItem = (id) => {
    setOrders((items) => items.filter((item) => item.id !== id));
    // setOrders(orders)
    // console.log(id)
    setShowDeleteId(null)
  };

  const subtotal = orders.reduce(
    (total, item) => total + item.myOrder.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <section className=" bg-blue-50  px-4 py-10">
      {orders.length === 0 ? (
        <div className="flex justify-center flex-col sm:flex-row items-center gap-3">
          <div><h3 className="text-2xl font-semibold">Your cart is empty</h3>
          <p className="text-gray-500 mt-2">
            Add some products to get started.
          </p>
            </div>
                   <div className='flex flex-col justify-center'>  
                        <img src={orderss} alt="image wishlist" className='w-100'/>
                       <button className='bg-red-500 mb-4 text-white shadow-lg rounded-full p-3 px-10 hover:bg-gradient-to-r from-cyan-600 to-red-400 hover:font-semibold transition'
                               onClick={()=>navigate("/products/All")}>
                                Shop Now  </button>
                        </div>
        </div>
      ) :
      
      (
        <>
         <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
        <div className="grid lg:grid-cols-3 mx-4 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 border rounded-xl bg-white border-slate-300">
            {orders.map((item) => (
             
              <div
                key={item.myOrder.id}
                className="flex sm:flex-row flex-col items-center gap-2 sm:gap-6 border-t border-slate-300 mx-2 p-3 "
              >
                <img
                  src={item.myOrder.image}
                  alt={item.myOrder.name}
                  className="sm:w-28 w-50 h-28 object-cover rounded-lg"
                />
                  
                <div className="flex-1 text-center sm:text-left">
                  < Link  to={`/products/${item.myOrder.category}/${item.myOrder.id}`} >
                   <h3 className="text-lg font-semibold">{item.myOrder.name}</h3> 
                   </Link>
                  <p className="text-gray-500 mt-1">${item.myOrder.price}</p>
                </div>

        <div className="flex gap-4">
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="p-3 hover:bg-gray-100"
                  >
                    <FaMinus size={12} />
                  </button>

                  <span className="px-2">{item.quantity}</span>
                   
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="p-3 hover:bg-gray-100"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
                 
                <button
                   onClick={() => setShowDeleteId(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
             
        </div>
         {showDeleteId === item.id &&  
         <div className="bg-mist-300 shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-center rounded-xl  border-2 border-slate-400">
                               <div className="flex bg-[#003049] justify-end p-0 rounded-t-lg ">
                                <button
                                  onClick={() => setShowDeleteId(null)}
                                  className="text-xl font-bold text-white rounded-tr-lg p-1 px-3 hover:bg-red-700"
                                >
                                  ✕
                                </button>
                              </div>
                           
                             <div className="p-5">
                             <p>do you want to delete this product?</p>
                              <div className="flex justify-center text-black mt-2 gap-2">
                              <button className="bg-white border hover:bg-red-700 hover:text-white px-4 border-slate-400 p-1 rounded-xl"
                              onClick={() => removeItem(item.id)}>Yes</button>
                              <button className="bg-white border px-4 hover:bg-[#003049] hover:text-white border-slate-400 p-1 rounded-xl"
                              onClick={() => setShowDeleteId(null)}>No</button>
                             </div>
                               </div>
                        </div>
                }
              
                    </div>
              
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white border border-slate-300 rounded-xl p-4 px-6 h-fit shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Shipping</span>
              <span>${shipping}</span>
            </div>

            <hr className="my-4 text-slate-300" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <button className="w-full mt-6 bg-[#003049] text-white py-2 rounded-lg hover:bg-gradient-to-r from-cyan-700 to-cyan-500 transition transition"
              onClick={()=>console.log(orders.map(x=>x.myOrder.name))}
            >
              Proceed to Checkout
            </button>
        <div className='items-end flex flex-col justify-center'>  
                        <img src={orderss} alt="image wishlist" className='mt-2 w-100'/>
                       
                        </div>   </div>

          
        </div>
      </>)}
    </section>
  );
}