import { useState } from 'react'
import { IoFilter } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCategories } from '../../api/productApi';
import { formatPrice } from '../../utils/format';

const PRICE_STEP = 1000;

const Filter = ({ categoryId, priceMax, maxPrice, setMaxPrice, onReset }) => {

  const [showFilter, setShowFilter] = useState(false)
  const { categories } = useCategories();

  // The slider moves freely; the list only reloads once the user lets go
  const sliderMax = Math.max(PRICE_STEP, Math.ceil(priceMax / PRICE_STEP) * PRICE_STEP);
  const committedValue = maxPrice || sliderMax;
  const [sliderValue, setSliderValue] = useState(committedValue);
  const [lastCommitted, setLastCommitted] = useState(committedValue);

  if (committedValue !== lastCommitted) {
    setLastCommitted(committedValue);
    setSliderValue(committedValue);
  }

  const commitPrice = () => {
    setMaxPrice(Number(sliderValue) >= sliderMax ? 0 : Number(sliderValue));
  };

  const realCategories = categories.filter((category) => !category.isCollection);
  const collections = categories.filter((category) => category.isCollection);

  const categoryLink = (category) => (
    <li key={category.id}>
      <Link
        to={`/products/${category.id}`}
        onClick={() => setShowFilter(false)}
        className={`flex justify-between gap-2 px-2 py-1.5 rounded-lg text-sm transition ${categoryId === category.id
          ? 'bg-tigris-800 text-white'
          : 'hover:bg-slate-100 text-slate-700'}`}
      >
        <span dir="auto" className='truncate'>{category.name}</span>
        <span className='opacity-60'>{category.count}</span>
      </Link>
    </li>
  );

  return (
    <aside className='lg:w-64 lg:shrink-0'>
      <button
        onClick={() => { setShowFilter(!showFilter) }}
        className='lg:hidden flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm font-semibold text-tigris-800'
      >
        {showFilter ? <FaXmark /> : <IoFilter />} Filters & Categories
      </button>

      <div className={`${showFilter ? 'block' : 'hidden'} lg:block mt-3 lg:mt-0 p-5 border border-slate-200 bg-white rounded-2xl lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto`}>

        <div className='flex justify-between mb-4'>
          <h2 className='font-bold text-lg'>Filters</h2>
          <button
            className='text-tigris-700 hover:text-tigris-500 text-sm'
            onClick={onReset}
          >Reset
          </button>
        </div>

        <div className='pb-5 border-b border-slate-200'>
          <h3 className='font-semibold mb-2'>Max price</h3>
          <input className='w-full accent-tigris-700' type="range" min="0" max={sliderMax} step={PRICE_STEP}
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
            onMouseUp={commitPrice}
            onTouchEnd={commitPrice}
            onKeyUp={commitPrice}
          />
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>0</span>
            <span className="font-semibold text-slate-900">{formatPrice(sliderValue)}</span>
            <span>{formatPrice(sliderMax)}</span>
          </div>
        </div>

        <div className='py-5 border-b border-slate-200'>
          <h3 className='font-semibold mb-2'>Categories</h3>
          <ul className="space-y-0.5">
            {categoryLink({ id: 'All', name: 'All Products', count: '' })}
            {realCategories.map(categoryLink)}
          </ul>
        </div>

        {collections.length > 0 &&
          <div className='pt-5'>
            <h3 className='font-semibold mb-2'>Collections</h3>
            <ul className="space-y-0.5">
              {collections.map(categoryLink)}
            </ul>
          </div>}

      </div>
    </aside>

  )
}

export default Filter
