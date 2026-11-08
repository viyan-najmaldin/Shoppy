import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../AuthContext";
import { useFavorites } from "../../FavoritesContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { formatPrice, discountPercent, productPath } from "../../utils/format";


const Carts = ({ data, orders, setOrders }) => {

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const off = discountPercent(data);

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
          category: data.category || "",
          categoryId: data.categoryId || null,
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
            id: String(data.id),
            myOrder: data,
            quantity: 1
          }
        ];
      });

      toast.success(existingOrder ? "Quantity updated in cart" : "Product added to cart!");

    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  return (

    <div className="group relative flex flex-col">
      <Link to={productPath(data)} className="flex flex-col flex-1">
        <div className="relative aspect-square bg-white rounded-2xl overflow-hidden ring-1 ring-line">
          <img src={data.image} alt={data.name} loading="lazy"
            className="w-full h-full object-cover" />
          {off > 0 && <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-pomegranate text-white text-xs font-bold rounded-full">-{off}%</span>}
        </div>

        <div className="pt-3 flex-1">
          {data.category && <div className="text-xs text-ink/55 mb-0.5 truncate" dir="auto">{data.category}</div>}
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:underline underline-offset-2 decoration-cherry" dir="auto">{data.name}</h3>
        </div>
      </Link>

      <button className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-sm text-ink/50 hover:text-pomegranate transition-colors"
        aria-label={isFavorite(data.id) ? "Remove from favorites" : "Add to favorites"}
        onClick={() => toggleFavorite(data)}
      >
        {isFavorite(data.id) ? <FaHeart className='text-pomegranate' /> : <FaRegHeart />}
      </button>

      <div className="flex items-center justify-between gap-2 pt-2">
        <div className="min-w-0">
          <div className="font-extrabold text-base sm:text-lg text-tigris-800 whitespace-nowrap">{formatPrice(data.price)}</div>
          {off > 0 && <div className="text-xs text-ink/45 line-through">{formatPrice(data.oldPrice)}</div>}
        </div>

        <button className="shrink-0 w-10 h-10 flex items-center justify-center bg-tigris-800 hover:bg-tigris-700 text-white rounded-full transition-colors"
          aria-label="Add to cart"
          onClick={onOrders}
        >
          <FaCartShopping />
        </button>
      </div>

    </div>

  )
}

export default Carts
