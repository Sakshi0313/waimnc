import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[420px] md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt={`Wai City ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-card/30 backdrop-blur hover:bg-card/60 text-primary-foreground rounded-full p-2 transition-colors">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-card/30 backdrop-blur hover:bg-card/60 text-primary-foreground rounded-full p-2 transition-colors">
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground text-shadow leading-tight mb-4 whitespace-pre-line">
              {slides[current].title}
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-6 text-shadow">{slides[current].subtitle}</p>
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrent(index)} className={`w-3 h-3 rounded-full transition-all ${index === current ? "bg-primary w-8" : "bg-primary-foreground/50"}`} />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
