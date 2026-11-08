import './App.css'
import Footer from './Component/Footer';
import Nav from './Component/Navbar/Nav'
import ScrollTopButton from './Component/ScrollTopButton';
import { useState, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./AuthContext";
const Home = lazy(() => import("./Component/Home/Home"));
const Products = lazy(() => import("./Component/Products/Products"));
const SingleProduct = lazy(() => import("./Component/Products/SingleProduct"));
const FavProducts = lazy(() => import("./Component/Products/FavProducts"));
const Contact = lazy(() => import("./Component/Contact"));
const AccountProfile = lazy(() => import("./Component/AccountProfile"));
const ShoppingCart = lazy(() => import("./Component/ShoppingCart"));
const PageNotFound404 = lazy(() => import("./Component/PageNotFound404"));
import Signup from './Component/Signup';
import Login from './Component/Login';
import ProtectedRoute from './Component/ProtectedRoute';
import UserAddress from './Component/UserAddress';
import Checkout from "./Component/Checkout";


function App() {

  const [cartOrders, setOrders] = useState([])
  const { currentUser } = useAuth();
  const { pathname } = useLocation();
  const orders = currentUser ? cartOrders : [];

  // The mobile menu only stays open on the page it was opened on
  const [menuOpenedOn, setMenuOpenedOn] = useState(null);
  const isMenuOpen = menuOpenedOn === pathname;
  const setIsMenuOpen = (open) => setMenuOpenedOn(open ? pathname : null);

  // New page: start at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Load the cart once the user is known, so the cart badge and
  // checkout work without visiting the cart page first
  useEffect(() => {
    if (!currentUser) return;

    const loadOrders = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "orders", currentUser.uid, "items")
        );

        setOrders(
          snapshot.docs.map((docSnap) => {
            const item = docSnap.data();

            return {
              id: docSnap.id,
              myOrder: {
                id: item.productId,
                name: item.productName,
                price: item.price,
                image: item.image,
                category: item.category,
                categoryId: item.categoryId,
              },
              quantity: item.quantity,
              size: item.size || null,
              color: item.color || null,
            };
          })
        );
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    loadOrders();
  }, [currentUser]);

  return (
    <>
      <Nav isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        orders={orders}
      />

      <main className="min-h-[60vh] bg-mist">
        <Suspense fallback={<div className="text-center py-20 text-slate-500">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home orders={orders} setOrders={setOrders} />} />
            <Route path="/products/:categories" element={<Products orders={orders} setOrders={setOrders} />} />
            <Route path="/products/:categories/:id" element={<SingleProduct orders={orders} setOrders={setOrders} />} />
            <Route path="/favorites" element={<FavProducts orders={orders} setOrders={setOrders} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<PageNotFound404 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/useraddress" element={<UserAddress />} />
            <Route path="/checkout" element={<Checkout orders={orders} setOrders={setOrders} />} />
            <Route
              path="/account" element={<ProtectedRoute>
                <AccountProfile />
              </ProtectedRoute>} />
            <Route
              path="/cart" element={<ProtectedRoute>
                <ShoppingCart
                  orders={orders}
                  setOrders={setOrders}
                />
              </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>

      <ScrollTopButton />
      <ToastContainer limit={1} newestOnTop />

      <Footer />
    </>
  )
}

export default App
