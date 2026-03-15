import { Building2, Droplets, Leaf, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    { icon: Building2, title: t("रस्ते विकास प्रकल्प", "Road Development Project"), desc: t("शहरातील प्रमुख रस्त्यांचे सिमेंट कॉंक्रिटीकरण", "Cement concretization of major city roads"), progress: 75 },
    { icon: Droplets, title: t("पाणीपुरवठा योजना", "Water Supply Scheme"), desc: t("२४x७ पाणीपुरवठा योजनेची अंमलबजावणी", "Implementation of 24x7 water supply scheme"), progress: 45 },
    { icon: Leaf, title: t("स्वच्छ शहर अभियान", "Clean City Campaign"), desc: t("ODF++ दर्जा प्राप्तीसाठी विशेष मोहीम", "Special drive for ODF++ status"), progress: 90 },
    { icon: Lightbulb, title: t("स्मार्ट लाईट प्रकल्प", "Smart Light Project"), desc: t("LED दिवाबत्ती बसवणे - संपूर्ण शहर", "LED street lights installation - entire city"), progress: 60 },
  ];

  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">{t("प्रकल्प", "Projects")}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p) => (
            <div key={p.title} className="border rounded-xl p-5 hover:shadow-lg transition-shadow">
              <p.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-bold text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{p.desc}</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="gov-gradient h-2 rounded-full transition-all" style={{ width: `${p.progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{p.progress}% {t("पूर्ण", "Complete")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
