import { Droplets, Home, FileText, Trash2, AlertTriangle, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const QuickServices = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Droplets, label: t("पाणी बिल भरा", "Pay Water Bill"), color: "text-gov-blue" },
    { icon: Home, label: t("मालमत्ता कर भरा", "Pay Property Tax"), color: "text-gov-saffron" },
    { icon: AlertTriangle, label: t("तक्रार नोंदवा", "Register Complaint"), color: "text-destructive" },
    { icon: FileText, label: t("दाखले डाउनलोड", "Download Certificates"), color: "text-gov-green" },
    { icon: Trash2, label: t("कचरा तक्रार", "Garbage Complaint"), color: "text-gov-maroon" },
    { icon: Lightbulb, label: t("दिवाबत्ती तक्रार", "Street Light Complaint"), color: "text-gov-gold" },
  ];

  return (
    <section id="services" className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-2">{t("महत्त्वाच्या नागरिक सेवा", "Important Citizen Services")}</h2>
        <p className="text-muted-foreground text-center mb-8">{t("ऑनलाइन सेवा एका क्लिकवर", "Online services at one click")}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((s) => (
            <a key={s.label} href="#" className="bg-card rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 group border">
              <s.icon className={`w-10 h-10 mx-auto mb-3 ${s.color} group-hover:scale-110 transition-transform`} />
              <p className="text-sm font-semibold">{s.label}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickServices;
