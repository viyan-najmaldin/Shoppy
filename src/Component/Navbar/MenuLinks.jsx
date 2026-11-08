import { NavLink } from 'react-router-dom'
import { TfiMenuAlt } from "react-icons/tfi";
import { useCategories } from '../../api/productApi';

// Categories shown in the desktop row (4 on tablets)
const DESKTOP_CATEGORY_COUNT = 6;

// Desktop: the biggest categories in one row of the header.
// Phones: a panel with categories, collections and contact.
const MenuLinks = ({ mobile = false }) => {
  const { categories } = useCategories();
  const realCategories = categories.filter((category) => !category.isCollection);
  const collections = categories.filter((category) => category.isCollection);

  if (mobile) {
    const rowClass = ({ isActive }) =>
      `flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive
        ? 'bg-tigris-800 text-white font-bold'
        : 'text-ink hover:bg-mist'}`;

    return (
      <div className='px-4 py-4 space-y-5'>
        <NavLink to='/products/All' className={rowClass}>
          <span className='font-bold'>All products</span>
        </NavLink>

        <section>
          <h2 className='px-3 mb-1 text-xs font-bold text-ink/50'>Categories</h2>
          <div className='grid grid-cols-2 gap-1'>
            {realCategories.map((category) => (
              <NavLink key={category.id} to={`/products/${category.id}`} className={rowClass}>
                <span dir='auto' className='truncate'>{category.name}</span>
                <span className='text-xs opacity-60'>{category.count}</span>
              </NavLink>
            ))}
          </div>
        </section>

        {collections.length > 0 &&
          <section>
            <h2 className='px-3 mb-1 text-xs font-bold text-ink/50'>Collections</h2>
            <div className='flex flex-wrap gap-2 px-1'>
              {collections.map((collection) => (
                <NavLink
                  key={collection.id}
                  to={`/products/${collection.id}`}
                  dir='auto'
                  className={({ isActive }) =>
                    `rounded-full border px-3 py-1.5 text-sm ${isActive ? 'border-tigris-800 bg-tigris-800 text-white' : 'border-line'}`}
                >
                  {collection.name}
                </NavLink>
              ))}
            </div>
          </section>}

        <NavLink to='/contact' className={rowClass}>Contact us</NavLink>
      </div>
    )
  }

  // The desktop row holds the biggest categories that fit on one line;
  // the rest are a click away on the products page
  const linkClass = ({ isActive }) =>
    `shrink-0 px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${isActive
      ? 'bg-white/15 text-white font-semibold'
      : 'text-white/85 hover:text-lagoon'}`;

  return (
    <div className='flex items-center gap-1'>
      <NavLink to='/products/All' className={linkClass}>
        <TfiMenuAlt className='inline mr-1.5 -mt-0.5' />All products
      </NavLink>
      {realCategories.slice(0, DESKTOP_CATEGORY_COUNT).map((category, index) => (
        <NavLink
          key={category.id}
          to={`/products/${category.id}`}
          className={(state) => `${linkClass(state)} ${index >= 4 ? 'hidden lg:block' : ''}`}
        >
          <span dir='auto'>{category.name}</span>
        </NavLink>
      ))}
      <NavLink to='/contact' className={linkClass}>Contact</NavLink>
    </div>
  )
}

export default MenuLinks
