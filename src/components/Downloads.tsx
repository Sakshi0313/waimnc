import { Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Downloads = () => {
  const { t } = useLanguage();

  const docs = [
    t("अर्ज फॉर्म", "Application Form"),
    t("बांधकाम परवाना फॉर्म", "Construction Permit Form"),
    t("मालमत्ता कर फॉर्म", "Property Tax Form"),
    t("जन्म दाखला अर्ज", "Birth Certificate Application"),
    t("मृत्यू दाखला अर्ज", "Death Certificate Application"),
    t("व्यापार परवाना फॉर्म", "Trade License Form"),
  ];

  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">{t("डाउनलोड", "Downloads")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {docs.map((d) => (
            <a key={d} href="#" className="flex items-center gap-2 border rounded-lg p-3 hover:bg-accent hover:text-accent-foreground transition-colors group">
              <Download className="w-4 h-4 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="text-sm">{d}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Downloads;
