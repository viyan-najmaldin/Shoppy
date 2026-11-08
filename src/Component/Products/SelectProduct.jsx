import {useState} from 'react'
import {  FaRegHeart, FaHeart,FaInfoCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useAuth } from "../../AuthContext";
import { useFavorites } from "../../FavoritesContext";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";


const SelectProduct = ({ data, orders, setOrders }) => {
  const myOrderr = orders.find(
        (item) => item.myOrder.id === data.id 
      );


      const [selectedSize, setSelectedSize] = useState("M");
      const [selectedColor, setSelectedColor] = useState("")
      const { currentUser } = useAuth();
      const { isFavorite, toggleFavorite } = useFavorites();
      const navigate = useNavigate();

      

      const onOrders = async () => {
  if (!currentUser) {
    navigate("/login");
    return;
  }

  const orderRef = doc(
    db,
    "orders",
    currentUser.uid,
    "items",
    String(data.id)
  );

  const existingOrder = orders.find(
    (item) => item.myOrder.id === data.id
  );

  try {
    if (existingOrder) {
      const newQuantity = existingOrder.quantity + 1;

      await updateDoc(orderRef, {
        quantity: newQuantity,
        size: data.sizes ? selectedSize : null,
        color: data.colors ? selectedColor : null,
      });

      setOrders((prevOrders) =>
        prevOrders.map((item) =>
          item.myOrder.id === data.id
            ? {
                ...item,
                quantity: newQuantity,
                size: data.sizes ? selectedSize : null,
                color: data.colors ? selectedColor : null,
              }
            : item
        )
      );

    } else {
      const newOrder = {
        productId: data.id,
        productName: data.name,
        price: data.price,
        image: data.image,
        category: data.category || "",
        categoryId: data.categoryId || null,
        quantity: 1,
        size: data.sizes ? selectedSize : null,
        color: data.colors ? selectedColor : null,
        userId: currentUser.uid,
      };

      await setDoc(orderRef, newOrder);

      setOrders((prevOrders) => [
        ...prevOrders,
        {
          id: String(data.id),
          myOrder: data,
          quantity: 1,
          size: data.sizes ? selectedSize : null,
          color: data.colors ? selectedColor : null,
        },
      ]);

      toast.success("Product added to cart!");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("Failed to add product.");
  }
};

    
const IncreaseQty = async () => {
  if (!currentUser) {
    navigate("/login");
    return;
  }

  if (!myOrderr) {
    // If product is not in cart yet, add it
    await onOrders();
    return;
  }

  const newQuantity = myOrderr.quantity + 1;

  const orderRef = doc(
    db,
    "orders",
    currentUser.uid,
    "items",
    String(data.id)
  );

  try {
    await updateDoc(orderRef, {
      quantity: newQuantity,
    });

    setOrders((prevOrders) =>
      prevOrders.map((item) =>
        item.myOrder.id === data.id
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  } catch (error) {
    console.error("Error increasing quantity:", error);
  }
};

   const decreaseQty = async () => {
  if (!currentUser || !myOrderr) return;

  const newQuantity = myOrderr.quantity - 1;

  const orderRef = doc(
    db,
    "orders",
    currentUser.uid,
    "items",
    String(data.id)
  );

  try {
    if (newQuantity <= 0) {
      await deleteDoc(orderRef);

      setOrders((prevOrders) =>
        prevOrders.filter(
          (item) => item.myOrder.id !== data.id
        )
      );

      return;
    }

    await updateDoc(orderRef, {
      quantity: newQuantity,
    });

    setOrders((prevOrders) =>
      prevOrders.map((item) =>
        item.myOrder.id === data.id
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );

  } catch (error) {
    console.error("Error decreasing quantity:", error);
  }
};


  return (
      <div className='my-4 py-4 border-slate-300 border-t w-full'>

        
            { data.sizes && <div>
            <h3 className="font-semibold mb-2">Select Size  
              <strong> {selectedSize || "None"}</strong></h3>

          <div className="flex gap-2 mb-4">
              {data.sizes.map((size) => (
                <button
                  key={size}
                 onClick={async () => {
                    setSelectedSize(size);

                    if (!currentUser || !myOrderr) return;

                    try {
                      await updateDoc(
                        doc(
                          db,
                          "orders",
                          currentUser.uid,
                          "items",
                          String(data.id)
                        ),
                        {
                          size: size,
                        }
                      );

                      setOrders((prevOrders) =>
                        prevOrders.map((item) =>
                          item.myOrder.id === data.id
                            ? { ...item, size: size }
                            : item
                        )
                      );
                    } catch (error) {
                      console.error("Error updating size:", error);
                    }
                  }}
                  className={`w-15 h-8 border border-slate-200 rounded-full transition
                    ${
                      selectedSize === size
                        ? "bg-tigris-800 text-white"
                        : "bg-white text-black  hover:border-tigris-600"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div> 

            
          </div> }
          
          { data.colors && <div>
            <h3 className="font-semibold my-4">Select Color  <strong>{selectedColor || ""}</strong> 
            </h3> 

          <div className="flex gap-2 mb-4">
              {data.colors.map((color) => (
                <button
                  key={color}
           onClick={async () => {
                    setSelectedColor(color);

                    if (currentUser && myOrderr) {
                      try {
                        await updateDoc(
                          doc(
                            db,
                            "orders",
                            currentUser.uid,
                            "items",
                            String(data.id)
                          ),
                          {
                            color: color,
                          }
                        );

                        setOrders((prevOrders) =>
                          prevOrders.map((item) =>
                            item.myOrder.id === data.id
                              ? { ...item, color: color }
                              : item
                          )
                        );
                      } catch (error) {
                        console.error("Error updating color:", error);
                      }
                    }

                  }}
                    style={{ backgroundColor: color }}
                  className={`size-5 border rounded-full transition
                    ${
                      selectedColor === color? "border-5 border-slate-300 "
                        : " hover:border-tigris-600 border-slate-300"
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
          {/* {data.quantity<15 && <p className='text-slate-500 text-sm'>
            Only {data.quantity} left in stock</p> } */}
          </div>

    <div className='py-6 border-b border-slate-300'>
        <div className='flex gap-4'>

      
        <button className='bg-tigris-800 flex rounded-lg gap-2 text-white p-3 sm:p-4 px-6 w-full justify-center items-center transition font-semibold'
        onClick={()=>{
          onOrders()                       
        }}
          title='Add to Shopping Cart'> 
            <FaCartShopping className="text-lg"/>
            Add to Cart
        </button>
        <button className='p-4 border rounded-lg border-slate-300 text-lg text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition'
          onClick={()=>toggleFavorite(data)}
          title='Add to favorite'
        >
        {isFavorite(data.id)? <FaHeart className='text-red-500' />: <FaRegHeart /> } </button>
    </div>
      
    {myOrderr && (
      <p
        className="text-xs gap-1 text-green-500 flex mt-1 focus:text-red-700"
      >
        <IoCheckmarkCircle className=" text-base" />
        Added to cart.
      </p>
    )}

    </div>  
    </div>
  )
}

export default SelectProduct
