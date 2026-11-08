import Carts from '../Home/Carts'
import wishlist from "../../assets/Online wishes list-rafiki.png";
import { useNavigate } from "react-router-dom";
import { useFavorites } from '../../FavoritesContext';


const FavProducts = ({ orders, setOrders }) => {

  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className='px-4 sm:px-5 py-5 pb-12'>
      <div className='mb-5'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-1'>Favorites</h1>
        <p className='text-slate-500'>Store everything you love on one page.
          Think about it before purchasing it.</p>
      </div>

      {favorites.length ?
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8'>
          {favorites.map(product => <Carts key={product.id} data={product} orders={orders} setOrders={setOrders} />)}
        </div>
        :
        <div className='flex flex-col sm:flex-row justify-center items-center gap-5 py-6'>
          <p className='text-slate-500'>It is empty here</p>
          <div className='flex flex-col items-center'>
            <img src={wishlist} alt="" className='w-full max-w-80' />
            <button className='bg-red-500 text-white shadow-lg rounded-full p-3 px-10 transition'
              onClick={() => navigate("/products/All")}>
              Shop Now
            </button>
          </div>
        </div>
      }
    </div>
  )
}

export default FavProducts
