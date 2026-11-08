import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Shopping1 from "../../assets/11.jpg";
import Shopping2 from "../../assets/22.jpg";
import Shopping3 from "../../assets/33.jpg";
import { useCategories } from "../../api/productApi";

// Each slide links to the vendor category whose name matches one of its words,
// so the links keep working when the vendors rename or renumber categories
const SLIDES = [
  {
    image: Shopping1,
    position: "object-[30%_center]",
    title: "Shop smarter, live better",
    text: "Gadgets, home and kitchen essentials, delivered anywhere in Iraq. Pay when your order arrives.",
    cta: "Shop now",
  },
  {
    image: Shopping2,
    position: "object-center",
    title: "Hear every detail",
    text: "Wireless headphones, earbuds and speakers, ready to ship.",
    cta: "Shop audio",
    match: ["صوتيات", "سماعات"],
  },
  {
    image: Shopping3,
    position: "object-[70%_center]",
    title: "Level up your setup",
    text: "Gaming mice, keyboards, headsets and accessories.",
    cta: "Shop gaming",
    match: ["گيمنگ", "كيمنك", "العاب"],
  },
];

const AUTOPLAY_MS = 6000;

const HomeStart = () => {
  const { categories } = useCategories();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reducedMotion) return;

    const timer = setInterval(() => setCurrent((index) => (index + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const linkFor = (slide) => {
    const category = slide.match && categories.find((item) =>
      slide.match.some((word) => item.name.includes(word)));
    return category ? `/products/${category.id}` : "/products/All";
  };

  const show = (index) => setCurrent((index + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[current];
  const arrowClass = "w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-tigris-800 transition-colors";

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8">
      <div
        className="grid lg:grid-cols-[5fr_7fr] rounded-3xl overflow-hidden bg-tigris-800 shadow-[0_20px_50px_-30px_rgba(0,48,73,0.8)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Highlights"
      >
        {/* Photo: on top on phones, on the right on wide screens */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:h-[460px] lg:order-2">
          {SLIDES.map((item, index) => (
            <img
              key={item.title}
              src={item.image}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover ${item.position} transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>

        <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 lg:p-12 text-white">
          <div key={current} className="animate-[heroIn_500ms_ease-out]">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight">
              {slide.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/75 max-w-md">{slide.text}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={linkFor(slide)}
                className="bg-cherry hover:bg-pomegranate text-white font-bold rounded-full px-7 py-3 transition-colors"
              >
                {slide.cta}
              </Link>
              <Link
                to="/products/All"
                className="border border-white/40 hover:bg-white hover:text-tigris-800 text-white font-bold rounded-full px-7 py-3 transition-colors"
              >
                Browse everything
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {SLIDES.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setCurrent(index)}
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={index === current}
                  className={`h-2 rounded-full transition-all duration-300 ${index === current ? "w-8 bg-lagoon" : "w-2 bg-white/35 hover:bg-white/60"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button className={arrowClass} onClick={() => show(current - 1)} aria-label="Previous slide"><FaAngleLeft /></button>
              <button className={arrowClass} onClick={() => show(current + 1)} aria-label="Next slide"><FaAngleRight /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeStart;
