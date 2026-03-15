import { FileText, ExternalLink, Download, Megaphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NoticeItem {
  id: number;
  date: string;
  dateEn: string;
  title: string;
  titleEn: string;
  type: "pdf" | "link" | "text";
  url?: string;
  content?: string;
  contentEn?: string;
  tag: string;
  tagEn: string;
}

const notices: NoticeItem[] = [
  {
    id: 1, date: "१० मार्च २०२६", dateEn: "10 March 2026",
    title: "मालमत्ता कर भरणा अंतिम तारीख ३१ मार्च",
    titleEn: "Property Tax Payment Deadline March 31",
    type: "pdf", url: "#",
    content: "सर्व मालमत्ताधारकांनी ३१ मार्च २०२६ पूर्वी मालमत्ता कर भरणा करावा. उशीरा भरल्यास दंड आकारला जाईल.",
    contentEn: "All property owners must pay property tax before March 31, 2026. Late payment will incur penalty.",
    tag: "कर", tagEn: "Tax",
  },
  {
    id: 2, date: "०८ मार्च २०२६", dateEn: "08 March 2026",
    title: "पाणी पुरवठा बंद सूचना - १५ मार्च",
    titleEn: "Water Supply Closure Notice - March 15",
    type: "text",
    content: "दुरुस्तीमुळे १५ मार्चला शहरातील काही भागात पाणी पुरवठा बंद राहील. नागरिकांनी पाणी साठवून ठेवावे.",
    contentEn: "Water supply will be closed in some areas on March 15 due to repairs. Citizens should store water in advance.",
    tag: "पाणी", tagEn: "Water",
  },
  {
    id: 3, date: "०५ मार्च २०२६", dateEn: "05 March 2026",
    title: "स्वच्छता मोहीम - विशेष अभियान सुरू",
    titleEn: "Cleanliness Drive - Special Campaign Started",
    type: "link", url: "https://swachhbharatmission.gov.in",
    content: "वाई शहरात विशेष स्वच्छता अभियान सुरू. सर्व नागरिकांनी सहभागी व्हावे.",
    contentEn: "Special cleanliness campaign started in Wai city. All citizens should participate.",
    tag: "अभियान", tagEn: "Campaign",
  },
  {
    id: 4, date: "०३ मार्च २०२६", dateEn: "03 March 2026",
    title: "नगरपालिका सर्वसाधारण सभा - २० मार्च",
    titleEn: "Municipal General Meeting - March 20",
    type: "pdf", url: "#",
    content: "नगरपालिकेची सर्वसाधारण सभा दि. २० मार्च रोजी सकाळी ११ वाजता आयोजित करण्यात आली आहे. सभेचे कामकाज पत्र संलग्न.",
    contentEn: "Municipal general meeting is scheduled for March 20 at 11 AM. Agenda attached.",
    tag: "सभा", tagEn: "Meeting",
  },
  {
    id: 5, date: "०१ मार्च २०२६", dateEn: "01 March 2026",
    title: "जन्म-मृत्यू दाखला ऑनलाइन उपलब्ध",
    titleEn: "Birth-Death Certificates Available Online",
    type: "link", url: "/services/birth-certificate",
    content: "आता जन्म-मृत्यू दाखला ऑनलाइन उपलब्ध आहे. नगरपालिका वेबसाइटवर अर्ज करा.",
    contentEn: "Birth-Death certificates are now available online. Apply on the municipal website.",
    tag: "सेवा", tagEn: "Service",
  },
  {
    id: 6, date: "२८ फेब्रुवारी २०२६", dateEn: "28 February 2026",
    title: "वृक्षारोपण मोहीम - प्रत्येकी एक झाड",
    titleEn: "Tree Plantation Drive - One Tree Each",
    type: "text",
    content: "नगरपालिकेतर्फे वृक्षारोपण मोहीम राबवली जात आहे. प्रत्येक नागरिकाने एक झाड लावावे.",
    contentEn: "Tree plantation drive is being organized by the municipality. Every citizen should plant one tree.",
    tag: "पर्यावरण", tagEn: "Environment",
  },
  {
    id: 7, date: "२५ फेब्रुवारी २०२६", dateEn: "25 February 2026",
    title: "बांधकाम परवाना नवीन नियमावली जाहीर",
    titleEn: "New Construction Permit Rules Announced",
    type: "pdf", url: "#",
    content: "बांधकाम परवान्यासाठी नवीन नियमावली जाहीर करण्यात आली आहे. सविस्तर माहितीसाठी PDF पहा.",
    contentEn: "New rules for construction permits have been announced. See PDF for details.",
    tag: "नियम", tagEn: "Rules",
  },
  {
    id: 8, date: "२० फेब्रुवारी २०२६", dateEn: "20 February 2026",
    title: "रस्ते दुरुस्ती प्रकल्प टप्पा २ पूर्ण",
    titleEn: "Road Repair Project Phase 2 Completed",
    type: "text",
    content: "शहरातील रस्ते दुरुस्ती प्रकल्पाचा टप्पा २ पूर्ण झाला आहे. टप्पा ३ लवकरच सुरू होणार.",
    contentEn: "Phase 2 of the city road repair project has been completed. Phase 3 will start soon.",
    tag: "प्रकल्प", tagEn: "Project",
  },
];

const NoticeBoard = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Megaphone className="w-7 h-7 text-primary" />
          <h2 className="text-2xl font-bold">{t("सूचना फलक", "Notice Board")}</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="gov-gradient text-primary-foreground px-4 py-3 font-semibold text-sm flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              {t("सूचना / जाहिराती", "Notices / Announcements")}
            </div>
            <div className="h-[420px] overflow-y-auto divide-y divide-border">
              {notices.map((notice) => (
                <div key={notice.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{t(notice.date, notice.dateEn)}</p>
                      <p className="text-sm font-medium mt-0.5">{t(notice.title, notice.titleEn)}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {t(notice.content || "", notice.contentEn || "")}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {notice.type === "pdf" && (
                          <a href={notice.url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs bg-destructive/10 text-destructive px-2.5 py-1 rounded-md font-medium hover:bg-destructive/20 transition-colors">
                            <Download className="w-3 h-3" />
                            {t("PDF डाउनलोड", "Download PDF")}
                          </a>
                        )}
                        {notice.type === "link" && (
                          <a href={notice.url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-md font-medium hover:bg-primary/20 transition-colors">
                            <ExternalLink className="w-3 h-3" />
                            {t("लिंक उघडा", "Open Link")}
                          </a>
                        )}
                        <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                          {t(notice.tag, notice.tagEn)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {notice.type === "pdf" && <FileText className="w-4 h-4 text-destructive" />}
                      {notice.type === "link" && <ExternalLink className="w-4 h-4 text-primary" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;
