import './App.css'
import Footer from './Component/Footer';
import MenuLinks from './Component/Navbar/MenuLinks'
import Nav from './Component/Navbar/Nav'
import { useState, lazy, Suspense  } from 'react';
import { Routes, Route } from "react-router-dom";
import Category from './Component/Home/Category';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = lazy(() => import("./Component/Home/Home"));
const Products = lazy(() => import("./Component/Products/Products"));
const SingleProduct = lazy(() => import("./Component/Products/SingleProduct"));
const FavProducts = lazy(() => import("./Component/Products/FavProducts"));
const Contact = lazy(() => import("./Component/Contact"));
const AccountProfile = lazy(() => import("./Component/AccountProfile"));
const ShoppingCart = lazy(() => import("./Component/ShoppingCart"));
const PageNotFound404 = lazy(() => import("./Component/PageNotFound404"));
import productData from "./data/productData";

function App() {
 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [Data, setData]=useState(productData)
   const [orders, setOrders]= useState([])


  return (
    <>
            <Nav  isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                categories={Data.category}
                orders={orders} />

            {isMenuOpen && 
            <div className="sm:hidden">
              <MenuLinks/> 
            </div> }
            <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home Data={Data} />} />
                <Route path="/products/:categories" element={<Products Data={Data} />} />
                <Route path="/products/:categories/:id" element={<SingleProduct Data={Data} setData={setData} orders={orders} setOrders={setOrders} />} />
                <Route path="/favorites" element={<FavProducts Data={Data} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/account" element={<AccountProfile />} />      
                <Route path="/cart" element={<ShoppingCart  orders={orders} setOrders={setOrders} />} />
                <Route path="*" element={<PageNotFound404 />} />
            </Routes>
            </Suspense>
            <ToastContainer  limit={1}
  newestOnTop />
                  
              <Footer />
    </>
  )
}

export default App
