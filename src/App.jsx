import './App.css'
import Footer from './Component/Footer';
import Home from './Component/Home/Home';
import MenuLinks from './Component/Navbar/MenuLinks'
import Nav from './Component/Navbar/Nav'
import { useState } from 'react';
import Products from './Component/Products/Products';
import SingleProduct from './Component/Products/SingleProduct';
import FavProducts from './Component/Products/FavProducts'

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
        <Home />
        <Products />
        <SingleProduct />
        <FavProducts />


    <Footer />
    </>
  )
}

export default App
