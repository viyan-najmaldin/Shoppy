import Carts from '../Home/Carts'
import Filter from './Filter'
import Pagination from './Pagination'
import ProductGridSkeleton from './ProductGridSkeleton'
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import nodata from '../../assets/Search engines-rafiki.png'
import { getProducts, useApi, useCategories } from '../../api/productApi';

const PAGE_SIZE = 24;

const Products = ({ orders, setOrders }) => {

  const { categories: categoryId = "All" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { categories } = useCategories();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const search = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "featured";
  const maxPrice = Number(searchParams.get("maxPrice")) || 0;

  const { data, isLoading, error } = useApi(
    () => getProducts({
      page,
      limit: PAGE_SIZE,
      category: categoryId,
      q: search,
      sort,
      maxPrice: maxPrice || undefined,
    }),
    [page, categoryId, search, sort, maxPrice]
  );

  const categoryName = categoryId === "All"
    ? "All Products"
    : categories.find((category) => category.id === categoryId)?.name || "";

  // Any filter change goes back to page 1
  const updateParams = (changes) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    if (!("page" in changes)) params.delete("page");
    setSearchParams(params);
  };

  const goToPage = (newPage) => {
    updateParams({ page: newPage > 1 ? newPage : null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const products = data?.products || [];
  const total = data?.total || 0;
  const firstShown = (page - 1) * PAGE_SIZE + 1;

  return (
    <div className='px-4 sm:px-5 py-5 pb-12'>
      <div className='text-sm font-semibold flex items-center gap-2 mb-4 text-slate-500'>
        <Link to='/' className='hover:text-tigris-700'>Home</Link>
        <FaAngleRight />
        <span className='text-slate-900 truncate' dir="auto">{categoryName}</span>
      </div>

      <div className='lg:flex gap-6'>
        <Filter
          categoryId={categoryId}
          priceMax={data?.priceMax || 0}
          maxPrice={maxPrice}
          setMaxPrice={(value) => updateParams({ maxPrice: value || null })}
          onReset={() => setSearchParams({})}
        />

        <section className='flex-1 min-w-0 mt-4 lg:mt-0'>
          <div className='flex flex-wrap gap-3 justify-between items-center p-3 sm:p-4 bg-white text-slate-600 border border-slate-200 rounded-2xl'>
            <div className='text-sm'>
              {isLoading
                ? 'Loading products...'
                : total > 0
                  ? <>Showing <span className='text-black font-semibold'>{firstShown}–{firstShown + products.length - 1}</span> of <span className='text-black font-semibold'>{total}</span> products</>
                  : 'No products'}
              {search && <> for “<span className='text-black font-semibold' dir="auto">{search}</span>”</>}
            </div>

            <label className='flex items-center gap-2 text-sm'>
              <span className='hidden sm:inline'>Sort:</span>
              <select
                value={sort}
                onChange={(e) => updateParams({ sort: e.target.value === "featured" ? null : e.target.value })}
                className="p-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-tigris-700/30">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </label>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : error ? (
            <div className='text-center py-16'>
              <p className='text-lg text-slate-700'>Could not load products.</p>
              <button className='mt-4 text-tigris-700 font-semibold' onClick={() => window.location.reload()}>Try again</button>
            </div>
          ) : products.length ? (
            <>
              <div className='mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8'>
                {products.map(product => <Carts key={product.id} data={product} orders={orders} setOrders={setOrders} />)}
              </div>
              <Pagination page={page} pages={data.pages} onChange={goToPage} />
            </>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-10">
              <div className='text-center sm:text-left'>
                <h3 className="text-2xl">Product not found</h3>
                <p className="text-gray-500 mt-2">
                  We couldn't find any results.
                </p>
              </div>
              <div className='flex flex-col items-center'>
                <img src={nodata} alt="" className='w-full max-w-64' />
                <button className='bg-red-500 text-white shadow-lg rounded-full p-3 px-10 transition'
                  onClick={() => navigate("/products/All")}>
                  Shop Now
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Products
