import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Home, Droplets, MessageSquare, FileText, Skull, HardHat,
  ArrowRight, CheckCircle, Clock, AlertCircle, Upload
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceData {
  icon: LucideIcon;
  title: string; titleEn: string;
  desc: string; descEn: string;
  fee: string; feeEn: string;
  time: string; timeEn: string;
  documents: string[]; documentsEn: string[];
  steps: string[]; stepsEn: string[];
}

const ServicePage = ({ data }: { data: ServiceData }) => {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl gov-gradient mx-auto mb-4 flex items-center justify-center">
              <data.icon className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-primary">{t(data.title, data.titleEn)}</h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">{t(data.desc, data.descEn)}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-5 flex items-center gap-3">
                <Clock className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t("कालावधी", "Duration")}</p>
                  <p className="font-bold">{t(data.time, data.timeEn)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-5 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t("शुल्क", "Fee")}</p>
                  <p className="font-bold">{t(data.fee, data.feeEn)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-primary mb-4">{t("आवश्यक कागदपत्रे", "Required Documents")}</h2>
                <div className="space-y-2">
                  {data.documents.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{t(d, data.documentsEn[i])}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-primary mb-4">{t("प्रक्रिया", "Process")}</h2>
                <div className="space-y-3">
                  {data.steps.map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full gov-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-primary-foreground font-bold">{i + 1}</span>
                      </div>
                      <p className="text-sm pt-1">{t(s, data.stepsEn[i])}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-primary mb-6 text-center">{t("ऑनलाइन अर्ज करा", "Apply Online")}</h2>
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Input placeholder={t("पूर्ण नाव", "Full Name")} />
                <Input placeholder={t("मोबाइल नंबर", "Mobile Number")} type="tel" />
                <Input placeholder={t("ईमेल (पर्यायी)", "Email (Optional)")} type="email" />
                <Input placeholder={t("पत्ता", "Address")} />
                <div className="sm:col-span-2">
                  <Textarea placeholder={t("अतिरिक्त माहिती...", "Additional information...")} rows={3} />
                </div>
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{t("कागदपत्रे अपलोड करा", "Upload Documents")}</span>
                    <input type="file" className="hidden" multiple />
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <Button className="gov-gradient text-primary-foreground w-full text-lg py-6">
                    {t("अर्ज सबमिट करा", "Submit Application")} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

const serviceData: Record<string, ServiceData> = {
  "property-tax": {
    icon: Home, title: "मालमत्ता कर भरणा", titleEn: "Property Tax Payment",
    fee: "मालमत्तेनुसार बदलते", feeEn: "Varies by property",
    time: "तात्काळ", timeEn: "Instant",
    desc: "आपल्या मालमत्तेचा कर ऑनलाइन भरा. मालमत्ता क्रमांक टाकून थकबाकी तपासा आणि भरणा करा.",
    descEn: "Pay your property tax online. Enter property number to check dues and make payment.",
    documents: ["मालमत्ता कर बिल", "मालमत्ता नोंदणी क्रमांक", "ओळखपत्र (आधार/पॅन)", "मागील भरणा पावती"],
    documentsEn: ["Property tax bill", "Property registration number", "ID proof (Aadhaar/PAN)", "Previous payment receipt"],
    steps: ["मालमत्ता क्रमांक टाका", "थकबाकी तपासा", "रक्कम निवडा", "ऑनलाइन पेमेंट करा", "पावती डाउनलोड करा"],
    stepsEn: ["Enter property number", "Check dues", "Select amount", "Make online payment", "Download receipt"],
  },
  "water-bill": {
    icon: Droplets, title: "पाणी बिल भरणा", titleEn: "Water Bill Payment",
    fee: "बिलानुसार", feeEn: "As per bill",
    time: "तात्काळ", timeEn: "Instant",
    desc: "पाणी बिल ऑनलाइन भरा. ग्राहक क्रमांक वापरून बिल तपासा.",
    descEn: "Pay water bill online. Check bill using customer number.",
    documents: ["ग्राहक क्रमांक", "मागील बिल प्रत", "ओळखपत्र"],
    documentsEn: ["Customer number", "Previous bill copy", "ID proof"],
    steps: ["ग्राहक क्रमांक टाका", "चालू बिल पहा", "ऑनलाइन पेमेंट करा", "पावती डाउनलोड करा"],
    stepsEn: ["Enter customer number", "View current bill", "Make online payment", "Download receipt"],
  },
  complaint: {
    icon: MessageSquare, title: "तक्रार नोंदवा", titleEn: "Register Complaint",
    fee: "मोफत", feeEn: "Free",
    time: "24-72 तास प्रतिसाद", timeEn: "24-72 hours response",
    desc: "नगरपालिका सेवांबद्दल तक्रार नोंदवा. तक्रार क्रमांक मिळून प्रगतीचा मागोवा घ्या.",
    descEn: "Register complaints about municipal services. Get complaint number and track progress.",
    documents: ["ओळखपत्र", "तक्रारीचे छायाचित्र (पर्यायी)", "पत्ता पुरावा"],
    documentsEn: ["ID proof", "Complaint photo (optional)", "Address proof"],
    steps: ["तक्रारीचा प्रकार निवडा", "तपशील भरा", "फोटो अपलोड करा", "तक्रार सबमिट करा", "तक्रार क्रमांक नोंदवा"],
    stepsEn: ["Select complaint type", "Fill details", "Upload photo", "Submit complaint", "Note complaint number"],
  },
  "birth-certificate": {
    icon: FileText, title: "जन्म दाखला", titleEn: "Birth Certificate",
    fee: "₹ 50", feeEn: "₹ 50",
    time: "7 कामकाजी दिवस", timeEn: "7 working days",
    desc: "जन्म दाखला ऑनलाइन अर्ज करा. रुग्णालय नोंदणी क्रमांक आवश्यक.",
    descEn: "Apply for birth certificate online. Hospital registration number required.",
    documents: ["रुग्णालय जन्म नोंदणी", "पालकांचे ओळखपत्र", "पत्ता पुरावा", "लग्न प्रमाणपत्र"],
    documentsEn: ["Hospital birth record", "Parents' ID proof", "Address proof", "Marriage certificate"],
    steps: ["ऑनलाइन अर्ज भरा", "कागदपत्रे अपलोड करा", "शुल्क भरा", "अर्ज स्वीकृती", "दाखला डाउनलोड/संकलन"],
    stepsEn: ["Fill online application", "Upload documents", "Pay fee", "Application accepted", "Download/collect certificate"],
  },
  "death-certificate": {
    icon: Skull, title: "मृत्यू दाखला", titleEn: "Death Certificate",
    fee: "₹ 50", feeEn: "₹ 50",
    time: "7 कामकाजी दिवस", timeEn: "7 working days",
    desc: "मृत्यू दाखला मिळवण्यासाठी ऑनलाइन अर्ज करा.",
    descEn: "Apply online to get a death certificate.",
    documents: ["मृत्यू नोंदणी प्रमाणपत्र", "मृत व्यक्तीचे ओळखपत्र", "अर्जदाराचे ओळखपत्र", "वैद्यकीय प्रमाणपत्र"],
    documentsEn: ["Death registration certificate", "Deceased's ID proof", "Applicant's ID proof", "Medical certificate"],
    steps: ["ऑनलाइन अर्ज भरा", "कागदपत्रे अपलोड करा", "शुल्क भरा", "पडताळणी", "दाखला वितरण"],
    stepsEn: ["Fill online application", "Upload documents", "Pay fee", "Verification", "Certificate distribution"],
  },
  "construction-permit": {
    icon: HardHat, title: "बांधकाम परवानगी", titleEn: "Construction Permit",
    fee: "₹ 500 - ₹ 5,000", feeEn: "₹ 500 - ₹ 5,000",
    time: "15-30 कामकाजी दिवस", timeEn: "15-30 working days",
    desc: "नवीन बांधकाम किंवा दुरुस्तीसाठी परवानगी अर्ज. नकाशा व कागदपत्रे अपलोड करा.",
    descEn: "Apply for new construction or repair permission. Upload plans and documents.",
    documents: ["जमीन मालकी पुरावा (7/12 उतारा)", "बांधकाम नकाशा (अभियंता प्रमाणित)", "ओळखपत्र", "जुने बांधकाम परवाना (असल्यास)", "ना-हरकत प्रमाणपत्रे"],
    documentsEn: ["Land ownership proof (7/12 extract)", "Building plan (Engineer certified)", "ID proof", "Old construction permit (if any)", "No objection certificates"],
    steps: ["अर्ज भरा", "नकाशा व कागदपत्रे अपलोड करा", "शुल्क भरा", "तपासणी (जागेवर भेट)", "परवानगी मंजुरी/नामंजुरी"],
    stepsEn: ["Fill application", "Upload plans & documents", "Pay fee", "Inspection (site visit)", "Approval/Rejection"],
  },
};

export const PropertyTax = () => <ServicePage data={serviceData["property-tax"]} />;
export const WaterBill = () => <ServicePage data={serviceData["water-bill"]} />;
export const Complaint = () => <ServicePage data={serviceData.complaint} />;
export const BirthCertificate = () => <ServicePage data={serviceData["birth-certificate"]} />;
export const DeathCertificate = () => <ServicePage data={serviceData["death-certificate"]} />;
export const ConstructionPermit = () => <ServicePage data={serviceData["construction-permit"]} />;
