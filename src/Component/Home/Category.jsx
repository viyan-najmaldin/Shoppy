import { Link } from 'react-router-dom';
import { MdViewModule } from "react-icons/md";
import { useCategories } from '../../api/productApi';

// How many categories the home page shows; the rest are on the products page
const HOME_CATEGORY_COUNT = 7;

const circleClass = 'aspect-square w-full rounded-full overflow-hidden ring-1 ring-line group-hover:ring-2 group-hover:ring-lagoon transition';

// The biggest categories, each pictured with one of its own products
const Category = () => {
  const { categories, isLoading } = useCategories();
  const shown = categories
    .filter((category) => !category.isCollection)
    .slice(0, HOME_CATEGORY_COUNT);

  return (
    <section className='px-4 sm:px-6 lg:px-8 py-8 sm:py-10'>
      <div className='flex items-baseline justify-between gap-4 mb-5'>
        <h2 className='text-2xl sm:text-3xl font-black tracking-tight text-tigris-800'>Shop by category</h2>
        <Link to='/products/All' className='shrink-0 font-bold text-sm text-tigris-700 underline underline-offset-4 decoration-cherry decoration-2 hover:text-tigris-900'>All categories</Link>
      </div>

      <div className='flex gap-4 overflow-x-auto snap-x scroll-px-4 -mx-4 px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                      sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:gap-5 sm:overflow-visible'>
        {isLoading && Array.from({ length: HOME_CATEGORY_COUNT + 1 }, (_, index) => (
          <div key={index} className='shrink-0 w-24 sm:w-auto animate-pulse'>
            <div className='aspect-square rounded-full bg-white' />
            <div className='h-3 mt-3 mx-auto w-2/3 rounded bg-white' />
          </div>
        ))}

        {shown.map((category) => (
          <Link key={category.id} to={`/products/${category.id}`} className='group shrink-0 w-24 sm:w-auto snap-start text-center'>
            <div className={`${circleClass} bg-white`}>
              {category.previews?.[0] &&
                <img src={category.previews[0]} alt="" loading="lazy" className='w-full h-full object-cover' />}
            </div>
            <h3 className='mt-2.5 text-sm font-bold leading-tight line-clamp-2' dir="auto">{category.name}</h3>
            <p className='text-xs text-ink/55'>{category.count} items</p>
          </Link>
        ))}

        {!isLoading &&
          <Link to='/products/All' className='group shrink-0 w-24 sm:w-auto snap-start text-center'>
            <div className={`${circleClass} flex items-center justify-center bg-tigris-800 text-white`}>
              <MdViewModule className='size-9 sm:size-11' />
            </div>
            <h3 className='mt-2.5 text-sm font-bold'>View all</h3>
            <p className='text-xs text-ink/55'>{categories.filter((category) => !category.isCollection).length} categories</p>
          </Link>}
      </div>
    </section>
  )
}

export default Category
