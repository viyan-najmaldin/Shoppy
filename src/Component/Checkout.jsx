import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Checkout({ orders }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Calculate subtotal
  const subtotal = orders.reduce(
    (total, item) =>
      total + item.myOrder.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  // If user is not logged in
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-blue-50 p-6 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <h2 className="text-2xl font-bold mb-3">
            Please log in
          </h2>

          <p className="text-slate-500 mb-5">
            You need to log in before checking out.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-[#003049] text-white px-6 py-3 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-blue-50 p-5">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <button
            onClick={() => navigate("/cart")}
            className="text-cyan-700 hover:text-cyan-900 mb-3"
          >
            ← Back to Cart
          </button>

          <h1 className="text-3xl font-bold">
            Checkout
          </h1>

          <p className="text-slate-500 mt-2">
            Review your order before completing your purchase.
          </p>

        </div>


        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* Customer Information */}
            <div className="bg-white rounded-2xl border border-slate-300 p-6">

              <h2 className="text-xl font-semibold mb-5">
                Customer Information
              </h2>

              <div className="space-y-3">

                <div>
                  <p className="text-sm text-slate-500">
                    Email
                  </p>

                  <p className="font-medium">
                    {currentUser.email}
                  </p>
                </div>

              </div>

            </div>

          {/* Address */}
            <div className="bg-white rounded-2xl border border-slate-300 p-6">

              <h2 className="text-xl font-semibold mb-3">
                Delivery Address
              </h2>

              <p className="text-slate-500">
                Your saved address will appear here.
              </p>

              <button
                onClick={() => navigate("/useraddress")}
                className="mt-4 text-cyan-700 font-semibold"
              >
                Add / Change Address
              </button>

            </div>

            {/* Products */}
            <div className="bg-white rounded-2xl border border-slate-300 p-6">

              <h2 className="text-xl font-semibold mb-5">
                Your Order
              </h2>

              <div className="space-y-4">

                {orders.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-slate-200 pb-4"
                  >

                    <img
                      src={item.myOrder.image}
                      alt={item.myOrder.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.myOrder.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Quantity: {item.quantity}
                      </p>

                      {item.size && (
                        <p className="text-sm text-slate-500">
                          Size: {item.size}
                        </p>
                      )}

                      {item.color && (
                        <p className="text-sm text-slate-500">
                          Color: {item.color}
                        </p>
                      )}

                    </div>

                    <p className="font-semibold">
                      $
                      {(
                        item.myOrder.price *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                  </div>

                ))}

              </div>

            </div>


          

          </div>


          {/* RIGHT SIDE */}
          <div>

            <div className="bg-white rounded-2xl border border-slate-300 p-6 sticky top-5">

              <h2 className="text-xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <hr className="my-5" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>


              <button
                className="w-full mt-6 bg-[#003049] text-white py-3 rounded-lg hover:bg-cyan-700 transition"
                onClick={() => console.log("Checkout:", orders)}
              >
                Place Order
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}