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
import Category from './Component/Home/Category';


function App() {
 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const Data =[
     {
    id: 1,
    name: "Wireless Headset",
    price: 89,
    off: 0,
    oldPrice: '',
    color: "black",
    category: "Electronics",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    favorite: false,
    rating : 4,
    description: "Wireless Headset, i love it hehe"
  },
   {
    id: 2,
    name: "White shose",
    price: 50,
    off: 20,
    oldPrice: 70,
    color: "White",
    category: "Sports",
    quantity: 10,
    image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
    favorite :true,
    rating : 2,
    description: "white shose hehe i want to buy it but i have no money, so sad :("
  },
    {
    id: 3,
    name: "NN fdgfdfd",
    price: 42,
    off: 0,
    oldPrice: '',
     color: "Green",
    category: "Sports",
    quantity: 30,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQewMrjE3iixwEvv56SkzE0qykj4VoFh7x_6VllPT8HlP5nsdwB2tLKpV7&s=10",
    rating : 4,
    favorite :false,
    description: "i have nothing to say just try tio buy it"

  }
    ]
  return (
    <>
            <Nav  isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                categories={Data.category} />

            {isMenuOpen && 
            <div className="sm:hidden">
              <MenuLinks/> 
            </div> }

            <Routes>
                <Route path="/" element={<Home Data={Data} />} />
                <Route path="/products/:categories" element={<Products Data={Data} />} />
                <Route path="/products/:categories/:id" element={<SingleProduct Data={Data} />} />
                <Route path="/favorites" element={<FavProducts />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/account" element={<AccountProfile />} />      
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="*" element={<PageNotFound404 />} />
            </Routes>

              <Footer />
    </>
  )
}

export default App
