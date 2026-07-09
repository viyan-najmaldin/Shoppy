import './App.css'
import Footer from './Component/Footer';
import Home from './Component/Home/Home';
import MenuLinks from './Component/Navbar/MenuLinks'
import Nav from './Component/Navbar/Nav'
import { useState } from 'react';
import Products from './Component/Products/Products';
import SingleProduct from './Component/Products/SingleProduct';
import FavProducts from './Component/Products/FavProducts'
import AccountProfile from './Component/AccountProfile';
import PageNotFound404 from './Component/PageNotFound404';
import Contact from './Component/Contact';
import ShoppingCart from './Component/ShoppingCart';
import { Routes, Route } from "react-router-dom";


function App() {
 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>

   <Nav  isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen} />

   {isMenuOpen && 
  <div className="sm:hidden">
     <MenuLinks/> 
  </div> }

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path="/favorites" element={<FavProducts />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/account" element={<AccountProfile />} />      
      <Route path="/cart" element={<ShoppingCart />} />


      {/* 404 page */}
      <Route path="*" element={<PageNotFound404 />} />
    </Routes>

    <Footer />
    </>
  )
}

export default App
