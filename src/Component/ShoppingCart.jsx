import { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link , useNavigate} from "react-router-dom";
import orderss from "../assets/In no time-bro.png";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";


export default function ShoppingCart({ orders, setOrders}) {
  
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showDeleteId , setShowDeleteId ] =useState(null)
  useEffect(() => {
  const loadOrders = async () => {
    if (!currentUser) {
      setOrders([]);
      return;
    }

    try {
      const itemsRef = collection(
        db,
        "orders",
        currentUser.uid,
        "items"
      );

      const snapshot = await getDocs(itemsRef);

      const firebaseOrders = snapshot.docs.map((docSnap) => {
        const item = docSnap.data();

        return {
          id: docSnap.id,
          myOrder: {
            id: item.productId,
            name: item.productName,
            price: item.price,
            image: item.image,
            category: item.category,
          },
          quantity: item.quantity,
        };
      });

      setOrders(firebaseOrders);

    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  loadOrders();
}, [currentUser, setOrders]);


  const increaseQty = async (id) => {
  const item = orders.find((item) => item.id === id);

  if (!item || !currentUser) return;

  const newQuantity = item.quantity + 1;

  try {
    await updateDoc(
      doc(
        db,
        "orders",
        currentUser.uid,
        "items",
        String(id)
      ),
      {
        quantity: newQuantity,
      }
    );

    setOrders((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

  } catch (error) {
    console.error("Error increasing quantity:", error);
  }
};

const decreaseQty = async (id) => {
  const item = orders.find((item) => item.id === id);

  if (!item || !currentUser) return;

  if (item.quantity === 1) {
    await removeItem(id);
    return;
  }

  const newQuantity = item.quantity - 1;

  try {
    await updateDoc(
      doc(
        db,
        "orders",
        currentUser.uid,
        "items",
        String(id)
      ),
      {
        quantity: newQuantity,
      }
    );

    setOrders((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

  } catch (error) {
    console.error("Error decreasing quantity:", error);
  }
};

  const removeItem = async (id) => {
  if (!currentUser) return;

  try {
    await deleteDoc(
      doc(
        db,
        "orders",
        currentUser.uid,
        "items",
        String(id)
      )
    );

    setOrders((items) =>
      items.filter((item) => item.id !== id)
    );

    setShowDeleteId(null);

  } catch (error) {
    console.error("Error removing product:", error);
  }
};

  const subtotal = orders.reduce(
    (total, item) => total + item.myOrder.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <section className=" bg-blue-50  px-4 py-5">
      {orders.length === 0 ? (
        <div className="flex justify-center flex-col sm:flex-row items-center gap-3">
          <div><h3 className="text-2xl">Your cart is empty</h3>
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
        <div className="mb-8 mx-5">

          <button
            onClick={() => navigate(-1)}
            className="text-cyan-700 hover:text-cyan-900 mb-3"
          >
            ← Back 
          </button>

          <h1 className="text-3xl font-bold">
            Shopping Cart
          </h1>

          <p className="text-slate-500 mt-2">
            Review your order before completing your purchase.
          </p>

        </div>
        <div className="grid  lg:grid-cols-3 mx-4 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 border rounded-xl h-fit bg-white border-slate-300">
            {orders.map((item) => (
             
              <div
                key={item.id}
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
                           
                             <div className="p-5 w-100">
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
          <div className=" sm:-mt-25 bg-white border border-slate-300 rounded-xl p-4 px-6 h-fit shadow-sm">
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

            <button className="w-full mt-6 font-semibold text-lg text-white py-4 rounded-lg bg-gradient-to-r from-red-400 to-red-800  hover:text-black transition"
             onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
        <div className='items-end flex flex-col justify-center'>  
                        <img src={orderss} alt="image wishlist" className='mt-2 mx-auto w-100'/>
                       
                        </div>   </div>

          
        </div>
      </>)}
    </section>
  );
}