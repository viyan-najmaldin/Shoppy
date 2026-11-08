import { FaBagShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const PageLogo = () => {
  return (
    <Link to='/' className='shrink-0 flex items-center gap-2 rounded-lg' aria-label='Shoppy home'>
      <span className='w-9 h-9 bg-gradient-to-br from-red-700 to-red-400 rounded-lg flex items-center justify-center text-white'>
        <FaBagShopping />
      </span>
      <span className='bg-gradient-to-r from-red-300 to-blue-200 bg-clip-text font-playwrite text-transparent text-xl md:text-2xl font-extrabold py-2'>Shoppy</span>
    </Link>
  )
}

export default PageLogo
