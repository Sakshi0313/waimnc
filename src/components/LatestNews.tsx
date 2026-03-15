import { CalendarDays } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LatestNews = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const newsItems = [
    { date: t("०५ मार्च २०२६", "05 March 2026"), title: t("स्वच्छता मोहीम - वाई शहरात विशेष स्वच्छता अभियान सुरू", "Cleanliness drive - Special campaign started in Wai city"), tag: t("अभियान", "Campaign") },
    { date: t("०२ मार्च २०२६", "02 March 2026"), title: t("नवीन पाणीपुरवठा योजनेचे भूमिपूजन संपन्न", "New water supply scheme groundbreaking completed"), tag: t("योजना", "Scheme") },
    { date: t("२८ फेब्रुवारी २०२६", "28 February 2026"), title: t("मालमत्ता कर भरणा - अंतिम मुदत ३१ मार्च", "Property tax payment - Deadline March 31"), tag: t("कर", "Tax") },
    { date: t("२५ फेब्रुवारी २०२६", "25 February 2026"), title: t("रस्ते दुरुस्ती प्रकल्प - टप्पा २ पूर्ण", "Road repair project - Phase 2 completed"), tag: t("प्रकल्प", "Project") },
    { date: t("२० फेब्रुवारी २०२६", "20 February 2026"), title: t("नगरपालिका सभागृहात सर्वसाधारण सभा आयोजित", "General meeting held in municipal hall"), tag: t("सभा", "Meeting") },
    { date: t("१५ फेब्रुवारी २०२६", "15 February 2026"), title: t("LED दिवाबत्ती प्रकल्प - ५०% काम पूर्ण", "LED street light project - 50% work completed"), tag: t("प्रकल्प", "Project") },
    { date: t("१० फेब्रुवारी २०२६", "10 February 2026"), title: t("वृक्षारोपण मोहीम यशस्वी - ५०० झाडे लावली", "Tree plantation drive successful - 500 trees planted"), tag: t("पर्यावरण", "Environment") },
  ];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused && el) {
        el.scrollTop += speed;
        if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
          el.scrollTop = 0;
        }
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">{t("ताज्या घडामोडी", "Latest Updates")}</h2>
        <div
          className="max-w-3xl mx-auto h-[320px] overflow-hidden rounded-xl border bg-card"
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="space-y-0 divide-y divide-border">
            {[...newsItems, ...newsItems].map((item, i) => (
              <a
                key={i}
                href="#"
                className="flex items-start gap-4 p-4 hover:bg-accent/50 transition-colors group"
              >
                <div className="flex-shrink-0 bg-primary/10 rounded-lg p-2.5">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">{item.date}</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{item.title}</p>
                </div>
                <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full flex-shrink-0">
                  {item.tag}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
