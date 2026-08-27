
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import {
  collection,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

export default function Checkout({ orders, setOrders }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [address, setAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [success, setSuccess] = useState(false);

  const subtotal = orders.reduce(
    (total, item) =>
      total + Number(item.myOrder.price) * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 15 : 0;

  const total = subtotal + shipping;

  useEffect(() => {
    const loadAddress = async () => {
      if (!currentUser) {
        setLoadingAddress(false);
        return;
      }

      try {
        const userRef = doc(
          db,
          "users",
          currentUser.uid
        );

        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();

          setAddress({
            fullName: userData.fullName || "",
            email: userData.email || currentUser.email,
            phone: userData.phone || "",
            city: userData.city || "",
            street: userData.street || "",
          });
        }
      } catch (error) {
        console.error(
          "Error loading address:",
          error
        );
      } finally {
        setLoadingAddress(false);
      }
    };

    loadAddress();
  }, [currentUser]);

  const handlePlaceOrder = async () => {

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (orders.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!address) {
      alert("Please add your delivery address first.");
      return;
    }

    setPlacingOrder(true);

    try {

      const products = orders.map((item) => ({
        productId: item.myOrder.id,
        productName: item.myOrder.name,
        price: Number(item.myOrder.price),
        image: item.myOrder.image,
        category: item.myOrder.category,
        quantity: item.quantity,
        size: item.size || null,
        color: item.color || null,
      }));


      const completedOrder = {

        userId: currentUser.uid,
        email: currentUser.email,

        address: {
          fullName: address.fullName,
          phone: address.phone,
          city: address.city,
          street: address.street,
        },
        products: products,
        subtotal: subtotal,
        shipping: shipping,
        total: total,
        status: "pending",
        createdAt: serverTimestamp(),
      };

      const orderRef = await addDoc(
        collection(db, "completedOrders"),
        completedOrder
      );

      console.log(
        "Order created:",
        orderRef.id
      );
      const cartRef = collection(
        db,
        "orders",
        currentUser.uid,
        "items"
      );

      const cartSnapshot = await getDocs(cartRef);
      const deletePromises =
        cartSnapshot.docs.map((itemDoc) =>
          deleteDoc(itemDoc.ref)
        );

      await Promise.all(deletePromises);
      setOrders([]);
      setSuccess(true);
    } 
    catch (error) {
      console.error(
        "Error placing order:",
        error
      );

      alert(
        "Something went wrong while placing your order."
      );

    } finally {
      setPlacingOrder(false);
    }
  };

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


  if (success) {
    return (
      <section className="min-h-150 bg-blue-50 p-5 flex justify-center items-center">
        <div className="bg-white rounded-2xl border border-slate-300 p-5 w-150 text-center max-w-md">
          

          <h1 className="sm:text-2xl font-bold mb-3">
            
          <span className="bg-green-100  p-2 rounded-full mr-2 ">
            <IoCheckmarkDoneSharp  className="text-green-500 text-3xl inline mb-2" />
          </span> 
           Order Placed Successfully! 
          </h1>

          <p className="text-slate-500 mb-6">
            Thank you for your order. <br/> Your order has been saved successfully.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-[#003049] text-white px-6 py-3 rounded-lg hover:bg-gradient-to-r from-cyan-700 to-cyan-500 transition"
          >
            Continue Shopping
          </button>

        </div>

      </section>
    );
  }


  // =========================
  // CHECKOUT PAGE
  // =========================

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


          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="lg:col-span-2 space-y-6">


            {/* CUSTOMER */}

            <div className="bg-white rounded-2xl border border-slate-300 p-6">

              <h2 className="text-xl font-semibold mb-5">
                Customer Information
              </h2>

              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="font-medium">
                {currentUser.email}
              </p>

            </div>


            {/* ADDRESS */}

            <div className="bg-white rounded-2xl border border-slate-300 p-6">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-xl font-semibold">
                  Delivery Address
                </h2>

                <button
                  onClick={() => navigate("/useraddress")}
                  className="text-cyan-700 font-semibold text-sm"
                >
                  Change
                </button>

              </div>


              {loadingAddress ? (

                <p className="text-slate-500">
                  Loading address...
                </p>

              ) : address ? (

                <div className="space-y-1">

                  <p className="font-semibold">
                    {address.fullName}
                  </p>

                  <p>
                    {address.phone}
                  </p>

                  <p>
                    {address.street}
                  </p>

                  <p>
                    {address.city}, {address.region}
                  </p>

                  <p>
                    {address.country}
                  </p>

                  <p>
                    {address.zipCode}
                  </p>

                </div>

              ) : (

                <div>

                  <p className="text-red-500 mb-3">
                    You don't have a saved address.
                  </p>

                  <button
                    onClick={() => navigate("/useraddress")}
                    className="bg-cyan-700 text-white px-5 py-2 rounded-lg"
                  >
                    Add Address
                  </button>

                </div>

              )}

            </div>


            {/* PRODUCTS */}

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
                        Number(item.myOrder.price) *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>


          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div>

            <div className="bg-white rounded-2xl border border-slate-300 p-6 sticky top-5">

              <h2 className="text-xl font-semibold mb-6">
                Order Summary
              </h2>


              <div className="flex justify-between mb-3">

                <span>
                  Subtotal
                </span>

                <span>
                  ${subtotal.toFixed(2)}
                </span>

              </div>


              <div className="flex justify-between mb-3">

                <span>
                  Shipping
                </span>

                <span>
                  ${shipping.toFixed(2)}
                </span>

              </div>


              <hr className="my-5" />


              <div className="flex justify-between text-xl font-bold">

                <span>
                  Total
                </span>

                <span>
                  ${total.toFixed(2)}
                </span>

              </div>


              <button
                disabled={
                  placingOrder ||
                  orders.length === 0 ||
                  !address
                }
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-[#003049] text-white py-3 rounded-lg hover:bg-cyan-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
              >

                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
