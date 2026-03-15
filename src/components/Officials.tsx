import { useLanguage } from "@/contexts/LanguageContext";

const Officials = () => {
  const { t } = useLanguage();

  const officials = [
    { name: t("श्री. राजेश पाटील", "Mr. Rajesh Patil"), title: t("नगराध्यक्ष", "Mayor"), emoji: "👤" },
    { name: t("श्री. सुनील कुलकर्णी", "Mr. Sunil Kulkarni"), title: t("मुख्याधिकारी", "Chief Officer"), emoji: "👤" },
    { name: t("श्री. अमित देशमुख", "Mr. Amit Deshmukh"), title: t("जिल्हाधिकारी, सातारा", "District Collector, Satara"), emoji: "👤" },
    { name: t("श्री. देवेंद्र फडणवीस", "Mr. Devendra Fadnavis"), title: t("मुख्यमंत्री, महाराष्ट्र", "Chief Minister, Maharashtra"), emoji: "👤" },
  ];

  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">{t("मान्यवर", "Officials")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {officials.map((o) => (
            <div key={o.name} className="text-center">
              <div className="w-28 h-28 mx-auto mb-3 rounded-lg bg-muted border-2 border-gov-gold flex items-center justify-center text-5xl shadow-md">{o.emoji}</div>
              <h3 className="font-semibold text-sm">{o.name}</h3>
              <p className="text-xs text-muted-foreground">{o.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Officials;
