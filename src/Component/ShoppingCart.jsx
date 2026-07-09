import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const initialCart = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
  },
  {
    id: 2,
    name: "Orange Shoes",
    price: 149,
    quantity: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNO36XKY6a7gCZq0CK5bQrqrMjc-VhMWm9QQVwp4TNoQ&s=10",
  },
  {
    id: 3,
    name: "Orange Shoes",
    price: 149,
    quantity: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNO36XKY6a7gCZq0CK5bQrqrMjc-VhMWm9QQVwp4TNoQ&s=10",
  },
  {
    id: 4,
    name: "Orange Shoes",
    price: 149,
    quantity: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNO36XKY6a7gCZq0CK5bQrqrMjc-VhMWm9QQVwp4TNoQ&s=10",
  },
];

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState(initialCart);

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <section className=" bg-blue-50  px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold">Your cart is empty</h3>
          <p className="text-gray-500 mt-2">
            Add some products to get started.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 border rounded-xl bg-white border-slate-300">
            {cartItems.map((item) => (
             
              <div
                key={item.id}
                className="flex sm:flex-row flex-col items-center gap-2 sm:gap-6 border-t border-slate-300 mx-2 p-3 "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="sm:w-28 w-50 h-28 object-cover rounded-lg"
                />
                  
                <div className="flex-1 text-center sm:text-left">
                  < Link to={`/products/${item.id}`} >
                   <h3 className="text-lg font-semibold">{item.name}</h3> 
                   </Link>
                  <p className="text-gray-500 mt-1">${item.price}</p>
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
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
        </div>
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

            <button className="w-full mt-6 bg-[#003049] text-white py-2 rounded-lg hover:bg-gradient-to-r from-cyan-700 to-cyan-500 transition transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}