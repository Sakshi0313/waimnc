import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImg1 from "@/assets/wai-hero.jpg";
import heroImg2 from "@/assets/wai-hero-2.jpg";
import heroImg3 from "@/assets/wai-hero-3.jpg";
import heroImg4 from "@/assets/wai-hero-4.jpg";

const getSlides = (t: (mr: string, en: string) => string) => [
  {
    image: heroImg1,
    title: t("स्वच्छ, सुंदर आणि\nस्मार्ट वाई शहर", "Clean, Beautiful &\nSmart Wai City"),
    subtitle: t("शिवछत्रपतींच्या पावन भूमीवर, कृष्णा नदीच्या तीरावर वसलेले ऐतिहासिक वाई शहर", "Historic Wai city situated on the banks of Krishna River, on the sacred land of Shivchhatrapati"),
  },
  {
    image: heroImg2,
    title: t("ऐतिहासिक मंदिरे\nआणि वारसा", "Historic Temples\n& Heritage"),
    subtitle: t("कृष्णा नदीच्या तीरावरील प्राचीन मंदिरे आणि सांस्कृतिक वारसा", "Ancient temples and cultural heritage along the banks of Krishna River"),
  },
  {
    image: heroImg3,
    title: t("धार्मिक पर्यटन\nस्थळ वाई", "Religious Tourism\nDestination Wai"),
    subtitle: t("महाराष्ट्रातील प्रमुख तीर्थक्षेत्र आणि पर्यटन स्थळ", "Major pilgrimage and tourist destination in Maharashtra"),
  },
  {
    image: heroImg4,
    title: t("कृष्णा नदीचे\nपवित्र घाट", "Sacred Ghats of\nKrishna River"),
    subtitle: t("वाई शहरातील प्रसिद्ध कृष्णा नदीचे घाट आणि स्नानघाट", "Famous ghats and bathing ghats of Krishna River in Wai"),
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
                    <a href="#services" className="gov-gradient px-6 py-3 rounded-lg text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                      {t("नागरिक सेवा →", "Citizen Services →")}
                    </a>
                    <a href="#complaint" className="bg-card/90 backdrop-blur px-6 py-3 rounded-lg text-foreground font-semibold hover:bg-card transition-colors">
                      {t("तक्रार नोंदवा", "Register Complaint")}
                    </a>
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
