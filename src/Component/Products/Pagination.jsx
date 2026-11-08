import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

// 1 … 4 5 [6] 7 8 … 20
const pageNumbers = (page, pages) => {
  const around = new Set([1, pages, page - 1, page, page + 1]);
  const sorted = [...around].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);

  const result = [];
  sorted.forEach((n, index) => {
    if (index > 0 && n - sorted[index - 1] > 1) result.push(`gap-${n}`);
    result.push(n);
  });
  return result;
};

const Pagination = ({ page, pages, onChange }) => {
  if (pages <= 1) return null;

  const buttonClass = 'min-w-10 h-10 px-3 rounded-lg border text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <nav aria-label="Pagination" className='flex flex-wrap items-center justify-center gap-1.5 mt-8'>
      <button
        className={`${buttonClass} bg-white border-slate-300 hover:border-tigris-600`}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <FaAngleLeft />
      </button>

      {pageNumbers(page, pages).map((n) =>
        typeof n === 'string'
          ? <span key={n} className='px-1 text-slate-400'>…</span>
          : <button
            key={n}
            onClick={() => onChange(n)}
            aria-current={n === page ? 'page' : undefined}
            className={`${buttonClass} ${n === page
              ? 'bg-tigris-800 border-tigris-800 text-white'
              : 'bg-white border-slate-300 hover:border-tigris-600'}`}
          >
            {n}
          </button>
      )}

      <button
        className={`${buttonClass} bg-white border-slate-300 hover:border-tigris-600`}
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <FaAngleRight />
      </button>
    </nav>
  )
}

export default Pagination
