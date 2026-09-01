import './App.css'
import Footer from './Component/Footer';
import MenuLinks from './Component/Navbar/MenuLinks'
import Nav from './Component/Navbar/Nav'
import { useState, lazy, Suspense, useEffect  } from 'react';
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
// import productData from "./data/productData";
import Signup from './Component/Signup';
import Login from './Component/Login';
import ProtectedRoute from './Component/ProtectedRoute';
import UserAddress from './Component/UserAddress';
import Checkout from "./Component/Checkout";
import { getProducts } from "./api/productApi";


function App() {
 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [Data, setData]=useState([])
   const [orders, setOrders]= useState([])
   const [search, setSearch] = useState("");


    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        console.log(data);

        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);
   
  console.log(Data)

  return (
    <>
            <Nav  isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                categories={Data.category}
                orders={orders}
                search={search}
                setSearch={setSearch}
                />

            {isMenuOpen && 
            <div className="sm:hidden">
              <MenuLinks/> 
            </div> }
            <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home Data={Data} setData={setData} orders={orders} setOrders={setOrders} />} />
                <Route path="/products/:categories" element={<Products search={search} Data={Data} setData={setData} orders={orders} setOrders={setOrders} />} />
                <Route path="/products/:categories/:id" element={<SingleProduct Data={Data} setData={setData} orders={orders} setOrders={setOrders} />} />
                <Route path="/favorites" element={<FavProducts Data={Data} setData={setData} orders={orders} setOrders={setOrders} />} />
                <Route path="/contact" element={<Contact />} />     
                {/* <Route path="/cart" element={<ShoppingCart  orders={orders} setOrders={setOrders} />} /> */}
                <Route path="*" element={<PageNotFound404 />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/useraddress" element={<UserAddress />} />
                <Route path="/checkout" element={<Checkout orders={orders} setOrders={setOrders} />}/>
                <Route
                  path="/account" element={ <ProtectedRoute> 
                                              <AccountProfile />
                                            </ProtectedRoute> } />
                <Route
                    path="/cart" element={ <ProtectedRoute>
                                              <ShoppingCart
                                                orders={orders}
                                                setOrders={setOrders}
                                              />
                      </ProtectedRoute>
                    }
                  />
                {/* <Route path="/account" element={<AccountProfile />} /> */}
            </Routes>
            </Suspense>
            <ToastContainer  limit={1}
  newestOnTop />
                  
              <Footer />
    </>
  )
}

export default App
