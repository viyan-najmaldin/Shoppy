import { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState(urlQuery);
  const [lastUrlQuery, setLastUrlQuery] = useState(urlQuery);

  // Keep the box in sync when the query changes from elsewhere (back button, reset)
  if (urlQuery !== lastUrlQuery) {
    setLastUrlQuery(urlQuery);
    setSearch(urlQuery);
  }

  const isProductList = /^\/products\/[^/]+$/.test(pathname);

  // On a product list, search as you type (debounced)
  useEffect(() => {
    if (!isProductList || search.trim() === urlQuery) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (search.trim()) params.set("q", search.trim());
      else params.delete("q");
      params.delete("page");
      navigate(`${pathname}?${params}`, { replace: true });
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = search.trim();
    navigate(query ? `/products/All?q=${encodeURIComponent(query)}` : "/products/All");
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className='relative w-full md:w-auto md:flex-1 md:max-w-2xl order-last md:order-none'
    >
      <label htmlFor="searchInput" className="sr-only">Search products</label>
      <input
        className='bg-white w-full shadow-lg rounded-full py-2 md:py-2.5 pr-4 pl-11 text-sm md:text-base text-ink placeholder:text-ink/45 focus:outline-none focus:ring-2 focus:ring-lagoon transition'
        type="search"
        name="search"
        dir="auto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        id="searchInput"
        placeholder="Search for products..." />
      <button type="submit" aria-label="Search" className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-ink/45 hover:text-tigris-800">
        <FaMagnifyingGlass />
      </button>
    </form>
  )
}

export default Search
