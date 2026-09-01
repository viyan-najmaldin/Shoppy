import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../AuthContext";
import { FaStar, FaRegStar, FaRegHeart, FaHeart   } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const Carts = ({data,setData, orders, setOrders}) => {

  const navigate = useNavigate();
  const { currentUser } = useAuth();

 const onOrders = async () => {

  if (!currentUser) {
    navigate("/login");
    return;
  }

  try {

    const existingOrder = orders.find(
      (item) => item.myOrder.id === data.id
    );

    const quantity = existingOrder
      ? existingOrder.quantity + 1
      : 1;

    // Save inside this user's cart
    await setDoc(
      doc(
        db,
        "orders",
        currentUser.uid,
        "items",
        String(data.id)
      ),
      {
        userId: currentUser.uid,
        productId: data.id,
        productName: data.name,
        price: data.price,
        image: data.image,
        category: data.category,
        quantity: quantity,
        createdAt: new Date()
      },
      { merge: true }
    );

    // Update React state
    setOrders((prevOrders) => {

      const existing = prevOrders.find(
        (item) => item.myOrder.id === data.id
      );

      if (existing) {
        return prevOrders.map((item) =>
          item.myOrder.id === data.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      }

      return [
        ...prevOrders,
        {
          id: data.id,
          myOrder: data,
          quantity: 1
        }
      ];
    });

    if (!existingOrder) {
      toast.success("Product added to cart!");
    }

  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("Failed to add product to cart.");
  }
};

        const myOrderr = orders.find(
        (item) => item.myOrder.id === data.id 
      );

  return (
   
       <div key={data.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
        <Link to={`/products/${data.category}/${data.id}`}>
          <div className="relative aspect-square bg-slate-100 overflow-hidden cursor-pointer">
                <img src={data.image} alt="img" loading="lazy" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                {/* <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">Hot</span> */}
                {data.off && <span className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg">{data.off}% OFF</span> }
                 {/* {data.quantity<15 && <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg">Only {data.quantity} left</span> } */}
          </div>

      <div className="p-4 pb-2">
            <div className="text-xs text-slate-500 mb-1 capitalize">{data.category}</div>
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 cursor-pointer hover:text-cyan-700 transition" >{data.name}</h3>
            <div className="flex items-center gap-1 ">
            <div className="flex items-center gap-1 text-yellow-400">

            
                  {[...Array(5)].map((_, index) =>
                    index < data.rating ? (
                      <FaStar key={index} />
                    ) : (
                      <FaRegStar key={index} />
                    )
                  )}
      
        </div>

          <span className="text-xs text-slate-500">(168)</span>
        </div>
        </div>
        </Link>
        <div className="flex w-fit sm:w-full items-center gap-1 p-4 pt-2">
          <div className="flex-1 ">
            <div className="flex gap-1 items-center"> <span className="font-bold sm:text-lg text-dark">{data.price}</span> <span className="text-slate-500 sm:text-sm text-xs ">IQD</span></div>
            {data.oldPrice? <div className="text-xs text-slate-400 line-through">IQD{data.oldPrice}</div>: <div className='p-2'></div>}
          </div>
          <button className="p-2.5 rounded-xl text-slate-400"
          onClick={()=>{ 
            setData((prev) =>
            prev.map((product) =>
            product.id === data.id
            ? { ...product, favorite: !product.favorite }
            : product
        ))}}
          >
           {data.favorite ?<FaHeart className='text-red-500' />: <FaRegHeart />  }
          </button>
          <button className="p-2.5 bg-cyan-700 hover:bg-cyan-500 text-white rounded-xl transition"
          onClick={()=>{
          onOrders()                       
        }}
          >
           <FaCartShopping />
          </button>
        
      </div>
    
    </div>
   
  )
}

export default Carts
