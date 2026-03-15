import { Phone, Mail, Bell, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const TopHeader = () => {
  const [dark, setDark] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const marqueeText = t(
    "📢 स्वच्छता मोहीम सुरू! सर्व नागरिकांनी सहभागी व्हावे. | 🏗️ नवीन पाणीपुरवठा योजना जाहीर - अर्ज करण्याची अंतिम तारीख: १५ एप्रिल | 💰 मालमत्ता कर भरणा अंतिम तारीख: ३१ मार्च - उशीरा भरल्यास दंड आकारला जाईल | 🏛️ नगरपालिका सर्वसाधारण सभा दि. २० मार्च रोजी सकाळी ११ वाजता | 🚰 दुरुस्तीमुळे १५ मार्चला काही भागात पाणी पुरवठा बंद राहील | 📋 जन्म-मृत्यू दाखला ऑनलाइन उपलब्ध - नगरपालिका वेबसाइटवर अर्ज करा | 🌳 वृक्षारोपण मोहीम - प्रत्येक नागरिकाने एक झाड लावा",
    "📢 Cleanliness drive started! All citizens should participate. | 🏗️ New water supply scheme announced - Last date to apply: April 15 | 💰 Property tax payment deadline: March 31 - Late payment will incur penalty | 🏛️ Municipal general meeting on March 20 at 11 AM | 🚰 Water supply will be closed in some areas on March 15 due to repairs | 📋 Birth-Death certificates available online - Apply on municipal website | 🌳 Tree plantation drive - Every citizen should plant a tree"
  );

  return (
    <div className="gov-gradient text-primary-foreground text-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-1.5 px-4 gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <a href="tel:18001234567" className="flex items-center gap-1 hover:underline">
            <Phone className="w-3.5 h-3.5" />
            <span>{t("हेल्पलाइन: 1800-123-4567", "Helpline: 1800-123-4567")}</span>
          </a>
          <a href="mailto:info@wainagarpalika.gov.in" className="flex items-center gap-1 hover:underline">
            <Mail className="w-3.5 h-3.5" />
            <span>info@wainagarpalika.gov.in</span>
          </a>
        </div>

        <div className="flex items-center gap-3 overflow-hidden flex-1 mx-4">
          <Bell className="w-3.5 h-3.5 flex-shrink-0 animate-pulse" />
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <span className="marquee inline-block">{marqueeText}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1 text-xs">
            <button onClick={() => setLang("mr")} className={`px-2 py-0.5 rounded ${lang === "mr" ? "bg-primary-foreground text-primary" : "hover:underline"}`}>
              मराठी
            </button>
            <button onClick={() => setLang("en")} className={`px-2 py-0.5 rounded ${lang === "en" ? "bg-primary-foreground text-primary" : "hover:underline"}`}>
              English
            </button>
          </div>
          <button onClick={toggleDark} className="p-1 rounded hover:bg-primary-foreground/20">
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
