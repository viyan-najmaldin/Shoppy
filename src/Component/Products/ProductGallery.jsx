import { useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

// Main image with the product's other pictures as thumbnails underneath.
// On phones the main image can also be swiped.
const ProductGallery = ({ images, name }) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const thumbsRef = useRef(null);

  // Keep the active thumbnail centred in the strip (horizontal only, so
  // the page itself never jumps)
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[current];
    if (!thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: 'smooth',
    });
  }, [current]);

  if (!images.length) {
    return <div className='aspect-square rounded-2xl bg-slate-100 border border-slate-200' />;
  }

  const show = (index) => setCurrent((index + images.length) % images.length);

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const distance = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(distance) > 40) show(current + (distance < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const arrowClass = 'absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center text-slate-700 hover:bg-white transition';

  return (
    <div>
      <div
        className='relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-white'
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[current]}
          alt={`${name} - picture ${current + 1}`}
          className='w-full h-full object-contain'
        />

        {images.length > 1 && <>
          <button className={`${arrowClass} left-3`} onClick={() => show(current - 1)} aria-label='Previous picture'>
            <FaAngleLeft />
          </button>
          <button className={`${arrowClass} right-3`} onClick={() => show(current + 1)} aria-label='Next picture'>
            <FaAngleRight />
          </button>
          <span className='absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/50 text-white text-xs'>
            {current + 1} / {images.length}
          </span>
        </>}
      </div>

      {images.length > 1 &&
        <div ref={thumbsRef} className='relative flex gap-2 mt-3 overflow-x-auto pb-1 snap-x'>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Show picture ${index + 1}`}
              className={`shrink-0 snap-start w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 bg-white transition ${index === current
                ? 'border-tigris-700'
                : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <img src={image} alt='' loading='lazy' className='w-full h-full object-cover' />
            </button>
          ))}
        </div>}
    </div>
  )
}

export default ProductGallery
