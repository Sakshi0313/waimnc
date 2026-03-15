import { Calendar } from "lucide-react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import mayorEvent1 from "@/assets/mayor-event-1.jpg";
import mayorEvent2 from "@/assets/mayor-event-2.jpg";
import mayorEvent3 from "@/assets/mayor-event-3.jpg";

const MayorRoutine = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const routineData = [
    { date: t("12 मार्च 2026", "12 March 2026"), title: t("स्वच्छता मोहिमेचे उद्घाटन", "Cleanliness Drive Inauguration"), description: t("नगराध्यक्षांनी वार्ड क्र. ५ मध्ये स्वच्छता मोहिमेचे उद्घाटन केले.", "Mayor inaugurated the cleanliness drive in Ward No. 5."), image: mayorEvent1 },
    { date: t("11 मार्च 2026", "11 March 2026"), title: t("रस्ता प्रकल्पाची पाहणी", "Road Project Inspection"), description: t("नवीन रस्ता बांधकाम प्रकल्पाची पाहणी केली.", "Inspected new road construction project."), image: mayorEvent2 },
    { date: t("10 मार्च 2026", "10 March 2026"), title: t("नगरपालिका सभा", "Municipal Meeting"), description: t("नगरपालिकेच्या सर्वसाधारण सभेत अर्थसंकल्पावर चर्चा करण्यात आली.", "Budget discussion in the general meeting."), image: mayorEvent3 },
    { date: t("9 मार्च 2026", "9 March 2026"), title: t("शाळा भेट कार्यक्रम", "School Visit Program"), description: t("वाई शहरातील नगरपालिका शाळांना भेट देऊन विद्यार्थ्यांशी संवाद साधला.", "Visited municipal schools and interacted with students."), image: mayorEvent1 },
    { date: t("8 मार्च 2026", "8 March 2026"), title: t("महिला दिन कार्यक्रम", "Women's Day Event"), description: t("जागतिक महिला दिनानिमित्त विशेष कार्यक्रमाचे आयोजन केले.", "Special event organized for International Women's Day."), image: mayorEvent3 },
  ];

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">📅 {t("नगराध्यक्ष दिनक्रम", "Mayor's Daily Routine")}</h2>
            <p className="text-muted-foreground mt-1">{t("नगराध्यक्षांचे दैनंदिन उपक्रम", "Daily activities of the Mayor")}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="p-2 rounded-full border border-border hover:bg-muted transition-colors"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => scroll("right")} className="p-2 rounded-full border border-border hover:bg-muted transition-colors"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {routineData.map((item, i) => (
            <div key={i} className="min-w-[280px] max-w-[300px] bg-card rounded-xl shadow-md border border-border overflow-hidden flex-shrink-0 hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {item.date}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MayorRoutine;
