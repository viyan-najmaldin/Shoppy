import Carts from './Carts'
import { Link } from 'react-router-dom'
import { getProducts, useApi } from '../../api/productApi'
import ProductGridSkeleton from '../Products/ProductGridSkeleton'

const GRID = 'mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8'

// Only the first few products are loaded here; "View All" pages through the rest
const TrindingProducts = ({ orders, setOrders }) => {
  const { data, isLoading, error } = useApi(() => getProducts({ page: 1, limit: 8 }), []);

  return (
    <section className='py-8 sm:py-12 px-4 sm:px-6 lg:px-8'>
      <div className='flex items-baseline justify-between gap-4'>
        <h2 className='text-2xl sm:text-3xl font-black tracking-tight text-tigris-800'>Featured products</h2>
        <Link to="/products/All" className='shrink-0 font-bold text-sm text-tigris-700 underline underline-offset-4 decoration-cherry decoration-2 hover:text-tigris-900'>See all</Link>
      </div>

      {isLoading
        ? <ProductGridSkeleton count={8} className={GRID} />
        : error
        ? <div className='mt-5 rounded-2xl bg-white ring-1 ring-line p-6 text-center'>
            <p className='text-ink/70'>Products didn't load. Check your connection and try again.</p>
            <button className='mt-3 font-bold text-tigris-800 underline underline-offset-4 decoration-cherry decoration-2' onClick={() => window.location.reload()}>Try again</button>
          </div>
        : <div className={GRID}>
          {(data?.products || []).map(product => <Carts key={product.id} data={product} orders={orders} setOrders={setOrders} />)}
        </div>}
    </section>
  )
}

export default TrindingProducts
