import { FaTruck, FaRotateLeft, FaLock, FaAngleRight } from "react-icons/fa6";
import ProductGallery from './ProductGallery';
import SelectProduct from './SelectProduct';
import { useParams, Link } from "react-router-dom";
import { getProduct, useApi } from '../../api/productApi';
import { formatPrice, discountPercent } from '../../utils/format';


const SingleProduct = ({ orders, setOrders }) => {
  const { id } = useParams();
  const { data, isLoading } = useApi(() => getProduct(id), [id]);

  if (isLoading) {
    return (
      <div className='p-4 sm:p-5'>
        <div className='bg-white rounded-2xl border border-slate-200 p-4 sm:p-8 grid md:grid-cols-2 gap-6 md:gap-10 animate-pulse'>
          <div className='aspect-square bg-slate-200 rounded-2xl' />
          <div className='space-y-4'>
            <div className='h-7 bg-slate-200 rounded w-3/4' />
            <div className='h-7 bg-slate-200 rounded w-1/3' />
            <div className='h-24 bg-slate-200 rounded' />
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='text-center py-20 px-5'>
        <h1 className='text-2xl font-bold mb-2'>Product not found</h1>
        <p className='text-slate-500 mb-6'>This product may no longer be available.</p>
        <Link to='/products/All' className='bg-tigris-800 text-white rounded-lg px-6 py-3'>Browse products</Link>
      </div>
    );
  }

  const off = discountPercent(data);

  return (

    <div className='p-4 sm:p-5 pb-12'>

      <div className='text-sm font-semibold flex items-center gap-2 text-slate-500 min-w-0'>
        <Link to='/' className='hover:text-tigris-700 shrink-0'>Home</Link>
        <FaAngleRight className='shrink-0' />
        <Link to={`/products/${data.categoryId || 'All'}`} className='hover:text-tigris-700 truncate' dir="auto">
          {data.category || 'All Products'}
        </Link>
      </div>

      <div className='bg-white mt-3 sm:mt-5 rounded-2xl border border-slate-200 p-4 sm:p-8 grid md:grid-cols-2 gap-6 md:gap-10'>

        <section className='min-w-0'>
          <ProductGallery key={data.id} images={data.images.length ? data.images : [data.image].filter(Boolean)} name={data.name} />
        </section>

        <section className='min-w-0'>
          <h1 className='text-xl sm:text-3xl font-bold leading-snug' dir="auto">{data.name}</h1>

          <div className='flex flex-wrap gap-3 my-4 items-center'>
            <span className='text-2xl sm:text-3xl font-bold text-tigris-900'>{formatPrice(data.price)}</span>
            {off > 0 && <>
              <span className='sm:text-xl text-slate-400 line-through'>{formatPrice(data.oldPrice)}</span>
              <span className="px-2 py-0.5 bg-red-500/15 text-red-600 rounded-lg text-sm font-semibold">-{off}%</span>
            </>}
          </div>

          {data.tags?.length > 0 &&
            <div className='flex flex-wrap gap-2 mb-2'>
              {data.tags.map((tag) => (
                <span key={tag.title} className='px-2 py-0.5 rounded-md text-xs font-semibold'
                  style={{ backgroundColor: tag.color || '#e2e8f0', color: tag.color_code_text || '#0f172a' }}>
                  {tag.title}
                </span>
              ))}
            </div>}

          <SelectProduct
            data={data}
            orders={orders}
            setOrders={setOrders} />

          <ul className='mt-5 space-y-1 text-sm text-slate-700'>
            <li><FaTruck className="text-tigris-800 inline mr-2" />Delivery across Iraq</li>
            <li><FaRotateLeft className="text-tigris-800 inline mr-2" />30-day easy returns</li>
            <li><FaLock className="text-tigris-800 inline mr-2" />2-year warranty included</li>
          </ul>
        </section>

      </div>

      {data.description &&
        <section className='bg-white mt-4 sm:mt-5 rounded-2xl border border-slate-200 p-4 sm:p-8'>
          <h2 className='text-lg font-bold mb-3'>Description</h2>
          <p className='whitespace-pre-line leading-relaxed text-slate-700' dir="auto">{data.description}</p>
        </section>}

    </div>
  )
}

export default SingleProduct
