import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserAddress() {
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    street: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

 
  useEffect(() => {
    const loadAddress = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          setFormData({
            fullName:
              userData.fullName ||
              currentUser.displayName ||  "",
            phone: userData.phone || "",
            city: userData.city || "",
            street: userData.street || "",

          });
        } else {
          setFormData({
            fullName: currentUser.displayName || "",
            phone: "",
            city: "",
            street: "",
          });
        }
      } catch (error) {
        console.error("Error loading user address:", error);
      }

      setLoading(false);
    };

    loadAddress();
  }, [currentUser]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please log in first.");
      return;
    }

    setSaving(true);

    try {
      const userRef = doc(db, "users", currentUser.uid);

      await setDoc(
        userRef,
        {
          fullName: formData.fullName,
          email: currentUser.email,
          phone: formData.phone,
          city: formData.city,
          street: formData.street,
        },
        {
          merge: true,
        }
      );

      alert("Your address has been saved successfully!");
    } catch (error) {
      console.error("Error saving address:", error);

      alert("Failed to save your address.");
    }

    setSaving(false);
  };


  if (!currentUser) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-5">
        <div className="bg-white p-8 rounded-2xl border border-slate-300 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Please Log In
          </h2>

          <p className="text-slate-500 mb-5">
            You need to log in to manage your address.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-[#003049] text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <p className="text-slate-600">
          Loading your address...
        </p>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-blue-50 p-5 font-josefin">

      <div className="max-w-3xl mx-auto">

        <div className="mb-6">
          <button
            onClick={() => navigate("/account")}
            className="text-cyan-700 hover:text-cyan-900 mb-3"
          >
            ← Back to Profile
          </button>

          <h1 className="text-3xl font-bold">
            Your Address
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your delivery information for your Shoppy orders.
          </p>
        </div>

        
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-sm"
        >

          <div className="flex items-center gap-3 mb-6">

            <div className="bg-cyan-100 text-cyan-700 p-3 rounded-full">
              <FaMapMarkerAlt />
            </div>

            <div>

              <h2 className="text-xl font-semibold">
                Delivery Information
              </h2>

              <p className="text-sm text-slate-500">
                Enter your address details
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="md:col-span-2">

              <label
                htmlFor="fullName"
                className="block mb-2 font-medium"
              >
                Full Name
              </label>

              <div className="relative">

                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-1 focus:ring-cyan-500"
                />

              </div>

            </div>

            <div className="md:col-span-2">

              <label
                htmlFor="phone"
                className="block mb-2 font-medium"
              >
                Phone Number
              </label>

              <div className="relative">

                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+964 750 123 4567"
                  required
                  className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-1 focus:ring-cyan-500"
                />

              </div>

            </div>


        <div className="md:col-span-2">
            <div>
              <label
                htmlFor="city"
                className="block mb-2 font-medium"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Erbil"
                required
                className="w-full mb-5 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

              <label
                htmlFor="street"
                className="block mb-2 font-medium"
              >
                Street Address
              </label>
              <input
                id="street"
                name="street"
                type="text"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street name, building number, apartment..."
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

          </div>


          <div className="flex justify-end gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => navigate("/account")}
                    className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-[#003049] text-white rounded-lg hover:bg-gradient-to-r from-cyan-700 to-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Saving..." : "Save Address"}
                  </button>

          </div>

        </form>

      </div>

    </div>
  );
}