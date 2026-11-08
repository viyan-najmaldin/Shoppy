const ProductGridSkeleton = ({ count = 8, className = 'mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8' }) => {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className='bg-white rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden animate-pulse'>
          <div className='aspect-square bg-slate-200' />
          <div className='p-3 sm:p-4 space-y-2'>
            <div className='h-3 w-1/3 bg-slate-200 rounded' />
            <div className='h-4 w-full bg-slate-200 rounded' />
            <div className='h-4 w-1/2 bg-slate-200 rounded' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGridSkeleton
