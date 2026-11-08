import { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";

const ScrollTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showButton) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-30 w-11 h-11 bg-slate-800/90 text-white rounded-full shadow-lg hover:bg-tigris-800 transition flex items-center justify-center"
    >
      <FaArrowUp />
    </button>
  )
}

export default ScrollTopButton
