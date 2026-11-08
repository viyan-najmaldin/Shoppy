import {
  FaRegUser,
  FaRegHeart,
  FaCartShopping, FaBars, FaXmark
} from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../../FavoritesContext';

const linkClass = ({ isActive }) =>
  `relative flex flex-col items-center gap-0.5 transition-colors ${isActive ? 'text-lagoon' : 'text-white hover:text-lagoon'}`;

const Badge = ({ count }) => count > 0 && (
  <span className='absolute -top-2 -right-3 bg-cherry text-white min-w-5 h-5 px-1 flex items-center justify-center text-[11px] font-bold rounded-full'>
    {count > 99 ? '99+' : count}
  </span>
);

const UserAction = ({ isMenuOpen, setIsMenuOpen, orders }) => {
  const cartCount = orders.reduce((total, item) => total + item.quantity, 0);
  const { favorites } = useFavorites();

  return (
    <div className='flex items-center justify-end gap-5 md:gap-6'>
      <NavLink className={linkClass} to='/account' aria-label='Account'>
        <FaRegUser className='text-xl' />
        <span className='text-xs hidden md:block'>Account</span>
      </NavLink>

      <NavLink className={linkClass} to='/favorites' aria-label='Favorites'>
        <span className='relative'>
          <FaRegHeart className='text-xl' />
          <Badge count={favorites.length} />
        </span>
        <span className='text-xs hidden md:block'>Favorites</span>
      </NavLink>

      <NavLink className={linkClass} to='/cart' aria-label='Cart'>
        <span className='relative'>
          <FaCartShopping className='text-xl' />
          <Badge count={cartCount} />
        </span>
        <span className='text-xs hidden md:block'>Cart</span>
      </NavLink>

      <button
        className='md:hidden text-xl text-white'
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        onClick={() => { setIsMenuOpen(!isMenuOpen) }}
      >
        {isMenuOpen ? <FaXmark /> : <FaBars />}
      </button>
    </div>
  )
}

export default UserAction
