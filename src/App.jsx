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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const initialData =[
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
    favorite: true,
    rating : 4,
    sizes: ["S", "M", "L", "XL"],
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
    rating : 3,
    sizes: ["S", "M", "L", "XL"],
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
    sizes: ["S", "M", "L", "XL"],
    colors: ["red", "blue","white","brown"],
    favorite :false,
    description: "i have nothing to say just try tio buy it"
  },
    {
    id: 4,
    name: "Creamy Bag",
    price: 30,
    off: 0,
    oldPrice: '',
    color: "Brown",
    category: "Fashion",
    quantity: 50,
    image: "https://d1a66n3120ol3x.cloudfront.net/landing/tools/bag-product-photography/hero-054d1802-69df-4a26-81ad-1cded7f04a67.png",
    favorite: true,
    rating : 3,
    // sizes: ["red", "blue", "L", "XL"],
    colors: ["Red", "Black","Brown","White"],
    description: "fgfzdhg ghfg fhgjg fdgg hehe"
  },
{
    id: 5,
    code: 555,
    name: "Black T-shirt",
    price: 25,
    off: 10,
    oldPrice: '35',
    color: "Black",
    category: "Fashion",
    quantity: 59,
    image: "https://cdn.tom-tailor.com/products/1045021_29999_7.jpg?fwidth=1920&quality=75&format=auto",
    favorite: false,
    rating : 5,
    // sizes: ["red", "blue", "L", "XL"],
    colors: ["Red", "Black","Brown","White"],
    description: "fgfzdhg ghfg fhgjg fdgg hehe"
  },
  {
    id: 6,
    code: 555,
    name: "Brown T-shirt",
    price: 25,
    off: 10,
    oldPrice: '35',
    color: "Brown",
    category: "Fashion",
    quantity: 59,
    image: "https://cdn.tom-tailor.com/products/1045021_15033_7.jpg?fwidth=1920&quality=75&format=auto",
    favorite: false,
    rating : 5,
    // sizes: ["red", "blue", "L", "XL"],
    colors: ["Red", "Black","Brown","White"],
    description: "fgfzdhg ghfg fhgjg fdgg hehe"
  },
    {
    id: 7,
    code: 555,
    name: "White T-shirt",
    price: 25,
    off: 10,
    oldPrice: '35',
    color: "White",
    category: "Fashion",
    quantity: 59,
    image: "https://b3053110.smushcdn.com/3053110/wp-content/uploads/2022/06/Custom-T-Shirts-Manufacturer-15.jpg?lossy=2&strip=1&webp=1",
    favorite: false,
    rating : 4,
    // sizes: ["red", "blue", "L", "XL"],
    colors: ["Red", "Black","Brown","White"],
    description: "fgfzdhg ghfg fhgjg fdgg hehe"
  },
      {
    id: 8,
    code: 555,
    name: "Red T-shirt",
    price: 20,
    off: 15,
    oldPrice: '35',
    color: "Red",
    category: "Fashion",
    quantity: 70,
    image: "https://2269.co/cdn/shop/files/unisex-organic-cotton-t-shirt-red-front-64edd389190f1.jpg?v=1693307792&width=1946",
    favorite: false,
    rating : 3,
    // sizes: ["red", "blue", "L", "XL"],
    colors: ["Red", "Black","Brown","White"],
    description: "fgfzdhg ghfg fhgjg fdgg hehe"
  },
    ]

   const [Data, setData]=useState(initialData)
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
            <ToastContainer />
                  
              <Footer />
    </>
  )
}

export default App
