import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const getSlides = (t: (mr: string, en: string) => string) => [
  {
    image: "/wai-temple.jpg",
    title: t("स्वच्छ, सुंदर आणि\nस्मार्ट वाई शहर", "Clean, Beautiful &\nSmart Wai City"),
    subtitle: t("शिवछत्रपतींच्या पावन भूमीवर, कृष्णा नदीच्या तीरावर वसलेले ऐतिहासिक वाई शहर", "Historic Wai city situated on the banks of Krishna River, on the sacred land of Shivchhatrapati"),
  },
  {
    image: "/mandhardevi.jpg",
    title: t("मांढरदेवी देवस्थान\nवाई", "Mandhardevi Temple\nWai"),
    subtitle: t("सातारा जिल्ह्यातील प्रसिद्ध मांढरदेवी देवीचे पवित्र स्थान", "The sacred shrine of Mandhardevi Goddess in Satara district"),
  },
  {
    image: "/Kamalgad.jpg",
    title: t("कमळगड किल्ला\nवाई", "Kamalgad Fort\nWai"),
    subtitle: t("वाई परिसरातील ऐतिहासिक कमळगड किल्ला — पर्यटकांचे आवडते ठिकाण", "Historic Kamalgad Fort near Wai — a favourite destination for trekkers and tourists"),
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();
  const slides = getSlides(t);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isUserScrolling = useRef(false);

  // Scroll to a specific slide
  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: index * width, behavior: "smooth" });
    setCurrent(index);
  };

  // Auto-advance every 5s
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      if (!isUserScrolling.current) {
        const next = (current + 1) % slides.length;
        scrollToSlide(next);
      }
    }, 5000);
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  }, [current, slides.length]);

  // Update dot indicator when user manually scrolls
  const handleScroll = () => {
    if (!scrollRef.current) return;
    isUserScrolling.current = true;
    const width = scrollRef.current.offsetWidth;
    const index = Math.round(scrollRef.current.scrollLeft / width);
    setCurrent(index);
    // Reset user-scrolling flag after scroll settles
    clearTimeout((handleScroll as unknown as { _t?: ReturnType<typeof setTimeout> })._t);
    (handleScroll as unknown as { _t?: ReturnType<typeof setTimeout> })._t = setTimeout(() => {
      isUserScrolling.current = false;
    }, 800);
  };

  return (
    <section className="relative h-[420px] md:h-[500px] overflow-hidden">
      {/* Horizontally scrollable slide strip — native touch scroll */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex h-full overflow-x-auto"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-full h-full"
            style={{ scrollSnapAlign: "start" }}
          >
            <img src={slide.image} alt={`Wai City ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground text-shadow leading-tight mb-4 whitespace-pre-line">
                    {slide.title}
                  </h2>
                  <p className="text-primary-foreground/90 text-lg mb-6 text-shadow">{slide.subtitle}</p>
                  <div className="flex gap-3 flex-wrap">
                    <Link to="/tourism" className="bg-white/20 backdrop-blur border border-white/40 px-6 py-3 rounded-lg text-primary-foreground font-semibold hover:bg-white/30 transition-colors">
                      {t("अधिक माहिती →", "More Info →")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`h-3 rounded-full transition-all ${index === current ? "bg-primary w-8" : "bg-primary-foreground/50 w-3"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
