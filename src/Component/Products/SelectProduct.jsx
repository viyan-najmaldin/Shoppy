import {useRef, useState} from 'react'
import {  FaRegHeart, FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";



const SelectProduct = ({Data, data, setData , orders, setOrders}) => {

      const [selectedSize, setSelectedSize] = useState("M");
      const [selectedColor, setSelectedColor] = useState("")
      const [newProduct, setNewProduct] = useState("")

      const divRef = useRef(null);
      const navigate = useNavigate();
      const onFavToggle=(id)=>{
        setData((prev) =>
        prev.map((product) =>
          product.id === id
            ? { ...product, favorite: !product.favorite }
            : product
        ))
      }

 const changeColor = (selectedColor) => {
  const product = Data.find(
    (item) =>
      item.code === data.code &&
      item.color === selectedColor
  );

  if (product) {
    setNewProduct(product);
    navigate(`/products/${product.category}/${product.id}`);
  }
};


      const onOrders = () => {
        setOrders((prevOrders) => {
          const existingOrder = prevOrders.find(
            (item) => item.myOrder.id === data.id 
          );

          if (existingOrder) {
            return prevOrders.map((item) =>
              item.myOrder.id === data.id 
                ? { ...item, size: selectedSize, color:selectedColor, quantity: item.quantity  }
                : item
            );
          }

          return [
            ...prevOrders,
            {
              id: prevOrders.length + 1,
              myOrder: data,
              quantity: 1,
                ...(data.sizes && { size: selectedSize }),
                ...(data.colors && { color: selectedColor })

            },
          ];
        });
           myOrderr? '' :toast.success("Product added to cart!")

      };

      const myOrderr = orders.find(
        (item) => item.myOrder.id === data.id 
      );

const IncreaseQty = () => {
        setOrders((prevOrders) => {
          const existingOrder = prevOrders.find(
            (item) => item.myOrder.id === data.id 
          );

          if (existingOrder) {
            return prevOrders.map((item) =>
              item.myOrder.id === data.id 
                ? { ...item, size: selectedSize , color:selectedColor, quantity: item.quantity + 1 }
                : item
            );
          }

          return [
            ...prevOrders,
            {
              id: prevOrders.length + 1,
              myOrder: data,
              quantity: 2,
                ...(data.sizes && { size: selectedSize }),
                ...(data.colors && { color: selectedColor })
            },
          ];
        });
     toast.success(`You added ${myOrderr? myOrderr.quantity+1: 2} items to cart!`);
      };

      const decreaseQty = () => {
        setOrders((prevOrders) =>
          prevOrders
            .map((item) =>
              item.myOrder.id === data.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
        );
    };


  return (
      <div className='my-6 py-4 border-slate-300 border-t w-full'>

        
                           { data.sizes && <div>
                            <h3 className="font-semibold mb-2">Select Size <strong>{selectedSize || "None"}</strong></h3>

                          <div className="flex gap-2 mb-4">
                              {data.sizes.map((size) => (
                                <button
                                  key={size}
                                  onClick={() => {
                                    setSelectedSize(size)
                                    orders && setOrders((prevOrders) => {
                                    
                                          return prevOrders.map((item) =>
                                            item.myOrder.id === data.id
                                              ? { ...item, size: size }
                                              : item
                                          );
                                        
                                    })
                                  }}
                                  className={`w-15 h-8 border border-slate-200 rounded-full transition
                                    ${
                                      selectedSize === size
                                        ? "bg-cyan-800 text-white"
                                        : "bg-white text-black  hover:border-cyan-600"
                                    }`}
                                >
                                  {size}
                                </button>
                              ))}
                            </div> 

                           
                          </div> }
                          
                          { data.colors && <div>
                            <h3 className="font-semibold my-4">Select Color  <strong>{selectedColor || ""}</strong> </h3> 

                          <div className="flex gap-2 mb-4">
                              {data.colors.map((color) => (
                                <button
                                  key={color}
                                  onClick={() => {
                                    setSelectedColor(color)
                                    orders && setOrders((prevOrders) => {
                                          return prevOrders.map((item) =>
                                            item.myOrder.id === data.id
                                              ? { ...item, color: color }
                                              : item
                                          );
                                      
                                    })
                                    changeColor(color)
                                  }}
                                    style={{ backgroundColor: color }}
                                  className={`size-5 border rounded-full transition
                                    ${
                                      selectedColor === color? "border-5 border-slate-300 "
                                        : " hover:border-cyan-600 border-slate-300"
                                    }`}
                                >
                                  
                                </button>
                              ))}
                              
                            </div> 

                           
                          </div> }

                      
      
                           <h1 className='font-semibold mb-2'>Quantity</h1>
                          <div className='flex gap-2 items-center'>
                               <div className='flex justify-between items-center gap-5 border border-slate-400 rounded-lg sm:w-40 '>
                               <button className='text-xl font-mono hover:bg-slate-200 px-4 p-1 disabled:opacity-50 disabled:cursor-not-allowed'
                               onClick={decreaseQty}
                                 disabled={myOrderr ? myOrderr.quantity <= 1 : true}
                               >-</button>
                               <span>                           
                                 {myOrderr ? myOrderr.quantity : 1}                  
                                 </span>
                               <button className='text-xl font-mono hover:bg-slate-200 px-4 p-1'
                                onClick={IncreaseQty}>
                                  +</button>
                          </div>  
                          {data.quantity<15 && <p className='text-slate-500 text-sm'>Only {data.quantity} left in stock</p> }
                          </div>

                    <div className=' py-10 border-b border-slate-300 '>
                       <div className='flex gap-4'>

                      
                        <button className='bg-cyan-800 flex rounded-lg gap-2 text-white p-4 px-10 w-full justify-center items-center hover:bg-gradient-to-r from-cyan-700 to-cyan-500 transition font-semibold'
                        onClick={()=>{
                          onOrders()  
                         myOrderr&&  divRef.current.focus()                        
                        }}
                         title='Add to Shopping Cart'> 
                            <FaCartShopping className="text-lg"/>
                            Add to Cart
                        </button>
                 { console.log(orders) }
                        <button className='p-4 border rounded-lg border-slate-300 text-lg text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition'
                         onClick={()=>onFavToggle(data.id)}
                         title='Add to favorite'
                        >
                        {data.favorite? <FaHeart className='text-red-500' />: <FaRegHeart /> } </button>
                    </div>
                      
                    {myOrderr && (
                      <p
                        ref={divRef}
                        tabIndex={-1}
                        className="text-xs gap-1 text-slate-600 flex mt-1 focus:text-red-700"
                      >
                        <FaInfoCircle className="text-sm" />
                        You already added this item to the cart.
                      </p>
                    )}

                    </div>  
    </div>
  )
}

export default SelectProduct
