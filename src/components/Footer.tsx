import { MapPin, Phone, Mail, Facebook, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    t("मुख्य पृष्ठ", "Home"), t("नागरिक सेवा", "Citizen Services"),
    t("तक्रार नोंदवा", "Register Complaint"), t("निविदा", "Tenders"),
    t("गॅलरी", "Gallery"), t("संपर्क", "Contact"),
  ];

  return (
    <footer id="contact" className="gov-gradient-green text-secondary-foreground pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-3">{t("वाई नगर परिषद", "Wai Municipal Council")}</h3>
            <div className="space-y-2 text-sm opacity-90">
              <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {t("मुख्य कार्यालय, स्टेशन रोड, वाई, जिल्हा सातारा, महाराष्ट्र - ४१२८०३", "Main Office, Station Road, Wai, District Satara, Maharashtra - 412803")}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> 02167-xxxxxx</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@wainagarpalika.gov.in</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">{t("महत्त्वाच्या लिंक", "Important Links")}</h3>
            <ul className="space-y-1.5 text-sm opacity-90">
              {links.map(l => (
                <li key={l}><a href="#" className="hover:underline">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">{t("सोशल मीडिया", "Social Media")}</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/20 flex items-center justify-center hover:bg-secondary-foreground/30 transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/20 flex items-center justify-center hover:bg-secondary-foreground/30 transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
            <p className="text-sm opacity-90">{t("कार्यालयीन वेळ: सोम - शनि", "Office Hours: Mon - Sat")}<br />{t("सकाळी १०:०० ते सायंकाळी ५:३०", "10:00 AM to 5:30 PM")}</p>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/20 pt-4 text-center text-xs opacity-75">
          <p>{t("© २०२६ वाई नगर परिषद, सातारा. सर्व हक्क राखीव.", "© 2026 Wai Municipal Council, Satara. All rights reserved.")}</p>
          <p className="mt-1">{t("National Informatics Centre (NIC) द्वारे विकसित", "Developed by National Informatics Centre (NIC)")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
