import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Users, ClipboardList, Clock } from "lucide-react";
import {
  HardHat, HeartPulse, Droplets, Lightbulb,
  ShieldAlert, Receipt, FileCheck, Map,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DeptData {
  icon: LucideIcon;
  title: string; titleEn: string;
  head: string; headEn: string;
  phone: string;
  desc: string; descEn: string;
  services: string[]; servicesEn: string[];
  stats: { label: string; labelEn: string; value: string }[];
  hours: string; hoursEn: string;
}

const DeptPage = ({ data }: { data: DeptData }) => {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="gov-gradient rounded-2xl p-8 text-primary-foreground">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <data.icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{t(data.title, data.titleEn)}</h1>
                <p className="text-primary-foreground/80">{t("वाई नगर परिषद", "Wai Municipal Council")}</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 text-lg">{t(data.desc, data.descEn)}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.stats.map((s) => (
              <Card key={s.label} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <p className="text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{t(s.label, s.labelEn)}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Users className="w-5 h-5" /> {t("विभाग प्रमुख", "Department Head")}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">👤</div>
                  <div>
                    <p className="font-bold">{t(data.head, data.headEn)}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> {data.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted rounded-lg p-3">
                  <Clock className="w-4 h-4" />
                  <span>{t("कार्यालयीन वेळ", "Office Hours")}: {t(data.hours, data.hoursEn)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" /> {t("उपलब्ध सेवा", "Available Services")}
                </h2>
                <div className="space-y-2">
                  {data.services.map((s, i) => (
                    <div key={s} className="flex items-center gap-2 bg-primary/5 rounded-lg p-3 hover:bg-primary/10 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{t(s, data.servicesEn[i])}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

const deptData: Record<string, DeptData> = {
  construction: {
    icon: HardHat, title: "बांधकाम विभाग", titleEn: "Construction Department",
    head: "श्री. महेश पाटील", headEn: "Shri. Mahesh Patil", phone: "02167-220010",
    desc: "रस्ते बांधकाम, पूल बांधकाम, नगरपालिका इमारतींची देखभाल व दुरुस्ती, नवीन बांधकाम परवानगी.",
    descEn: "Road construction, bridge construction, maintenance and repair of municipal buildings, new construction permits.",
    services: ["रस्ते बांधकाम व दुरुस्ती", "पूल बांधकाम", "बांधकाम परवाना", "इमारत नकाशा मंजुरी", "रस्ता खोदाई परवानगी"],
    servicesEn: ["Road construction & repair", "Bridge construction", "Construction permit", "Building plan approval", "Road excavation permission"],
    stats: [{ label: "चालू प्रकल्प", labelEn: "Active Projects", value: "12" }, { label: "पूर्ण प्रकल्प", labelEn: "Completed Projects", value: "45" }, { label: "कर्मचारी", labelEn: "Staff", value: "28" }, { label: "वार्षिक बजेट", labelEn: "Annual Budget", value: "₹2.5 Cr" }],
    hours: "सकाळी 10:00 - संध्याकाळी 5:45", hoursEn: "10:00 AM - 5:45 PM",
  },
  health: {
    icon: HeartPulse, title: "आरोग्य व स्वच्छता विभाग", titleEn: "Health & Sanitation Department",
    head: "डॉ. सुरेश कांबळे", headEn: "Dr. Suresh Kamble", phone: "02167-220011",
    desc: "सार्वजनिक आरोग्य, कचरा व्यवस्थापन, रोग प्रतिबंधक उपाययोजना, लसीकरण.",
    descEn: "Public health, waste management, preventive measures, vaccination.",
    services: ["कचरा संकलन", "रोग प्रतिबंधक फवारणी", "अन्न परवाना", "सार्वजनिक शौचालय देखभाल", "लसीकरण मोहीम"],
    servicesEn: ["Waste collection", "Preventive spraying", "Food license", "Public toilet maintenance", "Vaccination drive"],
    stats: [{ label: "दैनिक कचरा संकलन", labelEn: "Daily Waste Collection", value: "15 T" }, { label: "सफाई कर्मचारी", labelEn: "Sanitation Workers", value: "120" }, { label: "शौचालये", labelEn: "Toilets", value: "25" }, { label: "आरोग्य केंद्रे", labelEn: "Health Centers", value: "3" }],
    hours: "सकाळी 10:00 - संध्याकाळी 5:45", hoursEn: "10:00 AM - 5:45 PM",
  },
  water: {
    icon: Droplets, title: "पाणी पुरवठा विभाग", titleEn: "Water Supply Department",
    head: "श्री. अनिल जोशी", headEn: "Shri. Anil Joshi", phone: "02167-220012",
    desc: "शुद्ध पिण्याच्या पाण्याचा पुरवठा, जलवाहिन्या देखभाल, नवीन नळ जोडणी.",
    descEn: "Supply of clean drinking water, pipeline maintenance, new water connections.",
    services: ["नवीन नळ जोडणी", "पाणी बिल भरणा", "जलवाहिनी दुरुस्ती", "पाणी गुणवत्ता तपासणी", "टँकर सेवा"],
    servicesEn: ["New water connection", "Water bill payment", "Pipeline repair", "Water quality testing", "Tanker service"],
    stats: [{ label: "दैनिक पुरवठा", labelEn: "Daily Supply", value: "8 MLD" }, { label: "नळ जोडण्या", labelEn: "Connections", value: "8,500" }, { label: "जलवाहिनी", labelEn: "Pipeline", value: "45 km" }, { label: "पाणी टाक्या", labelEn: "Water Tanks", value: "6" }],
    hours: "24/7 आणीबाणी सेवा", hoursEn: "24/7 Emergency Service",
  },
  lights: {
    icon: Lightbulb, title: "दिवाबत्ती विभाग", titleEn: "Street Lighting Department",
    head: "श्री. संदीप शिंदे", headEn: "Shri. Sandeep Shinde", phone: "02167-220013",
    desc: "रस्त्यावरील दिवाबत्ती देखभाल, नवीन LED दिवे बसवणे, वीज बचत उपाय.",
    descEn: "Street light maintenance, installation of new LED lights, energy saving measures.",
    services: ["दिवाबत्ती दुरुस्ती", "नवीन दिवे बसवणे", "LED रूपांतरण", "तक्रार निवारण"],
    servicesEn: ["Light repair", "New light installation", "LED conversion", "Complaint resolution"],
    stats: [{ label: "एकूण दिवे", labelEn: "Total Lights", value: "3,200" }, { label: "LED दिवे", labelEn: "LED Lights", value: "2,800" }, { label: "दैनिक तक्रारी", labelEn: "Daily Complaints", value: "5-10" }, { label: "वीज बचत", labelEn: "Energy Savings", value: "40%" }],
    hours: "सकाळी 10:00 - संध्याकाळी 5:45", hoursEn: "10:00 AM - 5:45 PM",
  },
  encroachment: {
    icon: ShieldAlert, title: "अतिक्रमण विभाग", titleEn: "Encroachment Department",
    head: "श्री. प्रदीप गायकवाड", headEn: "Shri. Pradeep Gaikwad", phone: "02167-220014",
    desc: "अनधिकृत बांधकाम निवारण, फेरीवाला व्यवस्थापन, सार्वजनिक जागा संरक्षण.",
    descEn: "Unauthorized construction removal, hawker management, public space protection.",
    services: ["अतिक्रमण तक्रार", "फेरीवाला परवाना", "सार्वजनिक जागा संरक्षण", "अनधिकृत बांधकाम कारवाई"],
    servicesEn: ["Encroachment complaint", "Hawker license", "Public space protection", "Unauthorized construction action"],
    stats: [{ label: "कारवाई", labelEn: "Actions Taken", value: "156" }, { label: "फेरीवाला परवाने", labelEn: "Hawker Licenses", value: "320" }, { label: "निवारित तक्रारी", labelEn: "Resolved Complaints", value: "89%" }, { label: "कर्मचारी", labelEn: "Staff", value: "15" }],
    hours: "सकाळी 10:00 - संध्याकाळी 5:45", hoursEn: "10:00 AM - 5:45 PM",
  },
  tax: {
    icon: Receipt, title: "कर विभाग", titleEn: "Tax Department",
    head: "श्रीमती वैशाली कुलकर्णी", headEn: "Smt. Vaishali Kulkarni", phone: "02167-220015",
    desc: "मालमत्ता कर, पाणी कर, स्वच्छता कर वसुली व व्यवस्थापन.",
    descEn: "Property tax, water tax, sanitation tax collection and management.",
    services: ["मालमत्ता कर भरणा", "कर दाखला", "नवीन मालमत्ता नोंदणी", "कर माफी अर्ज", "थकबाकी चौकशी"],
    servicesEn: ["Property tax payment", "Tax certificate", "New property registration", "Tax exemption application", "Arrears inquiry"],
    stats: [{ label: "वार्षिक वसुली", labelEn: "Annual Collection", value: "₹4.2 Cr" }, { label: "मालमत्ता नोंदी", labelEn: "Property Records", value: "12,000" }, { label: "वसुली दर", labelEn: "Collection Rate", value: "78%" }, { label: "ऑनलाइन भरणा", labelEn: "Online Payments", value: "45%" }],
    hours: "सकाळी 10:00 - संध्याकाळी 5:45", hoursEn: "10:00 AM - 5:45 PM",
  },
  registration: {
    icon: FileCheck, title: "जन्म-मृत्यू नोंदणी", titleEn: "Birth-Death Registration",
    head: "श्रीमती मीना देशपांडे", headEn: "Smt. Meena Deshpande", phone: "02167-220016",
    desc: "जन्म नोंदणी, मृत्यू नोंदणी, दाखले वितरण.",
    descEn: "Birth registration, death registration, certificate distribution.",
    services: ["जन्म नोंदणी", "मृत्यू नोंदणी", "जन्म दाखला", "मृत्यू दाखला", "दाखला दुरुस्ती"],
    servicesEn: ["Birth registration", "Death registration", "Birth certificate", "Death certificate", "Certificate correction"],
    stats: [{ label: "मासिक जन्म नोंदी", labelEn: "Monthly Birth Records", value: "80-100" }, { label: "मासिक मृत्यू नोंदी", labelEn: "Monthly Death Records", value: "30-40" }, { label: "दाखला वितरण वेळ", labelEn: "Certificate Time", value: "7 days" }, { label: "ऑनलाइन अर्ज", labelEn: "Online Applications", value: "60%" }],
    hours: "सकाळी 10:00 - संध्याकाळी 5:45", hoursEn: "10:00 AM - 5:45 PM",
  },
  planning: {
    icon: Map, title: "नगररचना विभाग", titleEn: "Town Planning Department",
    head: "श्री. अभिजीत भोसले", headEn: "Shri. Abhijit Bhosale", phone: "02167-220017",
    desc: "शहर नियोजन, विकास आराखडा, भूखंड वापर परवानगी.",
    descEn: "City planning, development plan, land use permission.",
    services: ["भूखंड वापर बदल", "विकास आराखडा माहिती", "बांधकाम रेषा दाखला", "नगररचना नकाशा", "ना-हरकत प्रमाणपत्र"],
    servicesEn: ["Land use change", "Development plan info", "Building line certificate", "Town planning map", "No objection certificate"],
    stats: [{ label: "विकास आराखडा क्षेत्र", labelEn: "Development Plan Area", value: "25 sq.km" }, { label: "मंजूर नकाशे", labelEn: "Approved Plans", value: "340" }, { label: "प्रलंबित अर्ज", labelEn: "Pending Applications", value: "28" }, { label: "कर्मचारी", labelEn: "Staff", value: "12" }],
    hours: "सकाळी 10:00 - संध्याकाळी 5:45", hoursEn: "10:00 AM - 5:45 PM",
  },
};

export const Construction = () => <DeptPage data={deptData.construction} />;
export const Health = () => <DeptPage data={deptData.health} />;
export const Water = () => <DeptPage data={deptData.water} />;
export const Lights = () => <DeptPage data={deptData.lights} />;
export const Encroachment = () => <DeptPage data={deptData.encroachment} />;
export const Tax = () => <DeptPage data={deptData.tax} />;
export const Registration = () => <DeptPage data={deptData.registration} />;
export const Planning = () => <DeptPage data={deptData.planning} />;
