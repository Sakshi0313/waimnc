import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import { subscribeToActiveOfficials, type OfficialRecord } from "@/lib/officials";

const Officials = () => {
  const { lang, t } = useLanguage();
  const [officials, setOfficials] = useState<OfficialRecord[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return subscribeToActiveOfficials(setOfficials);
  }, []);

  if (officials.length === 0) return null;

  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">{t("मान्यवर", "Officials")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {officials.map((o) => (
            <div key={o.id} className="text-center">
              {o.photoBase64
                ? <img src={o.photoBase64} alt={o.nameMr} className="w-28 h-28 mx-auto mb-3 rounded-lg object-cover border-2 border-gov-gold shadow-md" />
                : <div className="w-28 h-28 mx-auto mb-3 rounded-lg bg-muted border-2 border-gov-gold flex items-center justify-center text-5xl shadow-md">👤</div>
              }
              <h3 className="font-semibold text-sm">{lang === "mr" ? o.nameMr : (o.nameEn || o.nameMr)}</h3>
              <p className="text-xs text-muted-foreground">{lang === "mr" ? o.titleMr : (o.titleEn || o.titleMr)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Officials;
