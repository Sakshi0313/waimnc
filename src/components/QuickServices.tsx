import { Droplets, Home, AlertTriangle, Baby, HeartPulse, HardHat } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const QuickServices = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Droplets,
      label: t("पाणी बिल भरा", "Pay Water Bill"),
      color: "text-blue-600",
      bg: "hover:bg-blue-50",
      to: "/services/water-bill",
    },
    {
      icon: Home,
      label: t("मालमत्ता कर भरा", "Pay Property Tax"),
      color: "text-orange-500",
      bg: "hover:bg-orange-50",
      to: "/services/property-tax",
    },
    {
      icon: AlertTriangle,
      label: t("तक्रार नोंदवा", "Register Complaint"),
      color: "text-red-500",
      bg: "hover:bg-red-50",
      to: "/services/complaint",
    },
    {
      icon: Baby,
      label: t("जन्म दाखला", "Birth Certificate"),
      color: "text-green-600",
      bg: "hover:bg-green-50",
      to: "/services/birth-certificate",
    },
    {
      icon: HeartPulse,
      label: t("मृत्यू दाखला", "Death Certificate"),
      color: "text-rose-600",
      bg: "hover:bg-rose-50",
      to: "/services/death-certificate",
    },
    {
      icon: HardHat,
      label: t("बांधकाम परवानगी", "Construction Permit"),
      color: "text-amber-600",
      bg: "hover:bg-amber-50",
      to: "/services/construction-permit",
    },
  ];

  return (
    <section id="services" className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-2">
          {t("महत्त्वाच्या नागरिक सेवा", "Important Citizen Services")}
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          {t("ऑनलाइन सेवा एका क्लिकवर", "Online services at one click")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className={`bg-card rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 group border ${s.bg}`}
            >
              <s.icon className={`w-10 h-10 mx-auto mb-3 ${s.color} group-hover:scale-110 transition-transform`} />
              <p className="text-sm font-semibold leading-tight">{s.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickServices;
