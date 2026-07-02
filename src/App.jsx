import './App.css'
import Home from './Component/Home/Home';
import MenuLinks from './Component/Navbar/MenuLinks'
import Nav from './Component/Navbar/Nav'
import { useState } from 'react';

function App() {
 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>

   <Nav  isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen} />

   {isMenuOpen && 
  <div className="sm:hidden sticky top-36">
     <MenuLinks/> 
  </div> }
        <Home />
    <h1 className='bg-blue-50 h-[100vh]'></h1>


    </>
  )
}

export default App
