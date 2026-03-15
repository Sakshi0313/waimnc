import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SchemeData {
  title: string; titleEn: string;
  subtitle: string; subtitleEn: string;
  desc: string; descEn: string;
  eligibility: string[]; eligibilityEn: string[];
  benefits: string[]; benefitsEn: string[];
  schemes?: { name: string; nameEn: string; status: string; statusEn: string; beneficiaries: string; beneficiariesEn: string; desc: string; descEn: string }[];
}

const SchemePage = ({ data }: { data: SchemeData }) => {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="gov-gradient rounded-2xl p-8 text-primary-foreground text-center">
            <h1 className="text-3xl font-bold">{t(data.title, data.titleEn)}</h1>
            <p className="text-primary-foreground/80 mt-2 text-lg">{t(data.subtitle, data.subtitleEn)}</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed text-lg">{t(data.desc, data.descEn)}</p>
            </CardContent>
          </Card>

          {data.schemes && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">{t("योजना यादी", "Scheme List")}</h2>
              {data.schemes.map((s) => (
                <Card key={s.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{t(s.name, s.nameEn)}</h3>
                          <Badge variant={s.status === "सक्रिय" ? "default" : "secondary"}>{t(s.status, s.statusEn)}</Badge>
                        </div>
                        <p className="text-muted-foreground">{t(s.desc, s.descEn)}</p>
                        <p className="text-sm flex items-center gap-1"><Users className="w-4 h-4 text-primary" /> {t("लाभार्थी", "Beneficiaries")}: {t(s.beneficiaries, s.beneficiariesEn)}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" /> {t("अधिक माहिती", "More Info")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4">{t("पात्रता", "Eligibility")}</h2>
                <div className="space-y-2">
                  {data.eligibility.map((e, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{t(e, data.eligibilityEn[i])}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4">{t("लाभ", "Benefits")}</h2>
                <div className="space-y-2">
                  {data.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{t(b, data.benefitsEn[i])}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="text-center">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-4">{t("या योजनेसाठी अर्ज करा", "Apply for this Scheme")}</h2>
              <Button className="gov-gradient text-primary-foreground text-lg px-8 py-6">
                {t("ऑनलाइन अर्ज करा", "Apply Online")} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

const schemeData: Record<string, SchemeData> = {
  central: {
    title: "केंद्र शासन योजना", titleEn: "Central Government Schemes",
    subtitle: "भारत सरकारच्या प्रमुख योजना", subtitleEn: "Major Schemes of Government of India",
    desc: "केंद्र शासनाच्या विविध कल्याणकारी योजना वाई नगरपालिका क्षेत्रात राबवल्या जातात. नागरिकांना या योजनांचा लाभ घेता येतो.",
    descEn: "Various welfare schemes of the Central Government are implemented in Wai Municipal area. Citizens can avail benefits of these schemes.",
    eligibility: ["वाई नगरपालिका क्षेत्रातील रहिवासी", "आधार कार्ड आवश्यक", "उत्पन्न मर्यादा लागू (योजनेनुसार)", "बँक खाते आवश्यक"],
    eligibilityEn: ["Resident of Wai Municipal area", "Aadhaar card required", "Income limit applicable (as per scheme)", "Bank account required"],
    benefits: ["आर्थिक सहाय्य", "मोफत/अनुदानित घरे", "स्वच्छता सुविधा", "पाणी पुरवठा सुधारणा"],
    benefitsEn: ["Financial assistance", "Free/subsidized housing", "Sanitation facilities", "Water supply improvement"],
    schemes: [
      { name: "प्रधानमंत्री आवास योजना (शहरी)", nameEn: "Pradhan Mantri Awas Yojana (Urban)", status: "सक्रिय", statusEn: "Active", beneficiaries: "1,200+", beneficiariesEn: "1,200+", desc: "आर्थिकदृष्ट्या दुर्बल घटकांसाठी परवडणारी घरे. अनुदान ₹2.67 लाख पर्यंत.", descEn: "Affordable housing for economically weaker sections. Subsidy up to ₹2.67 lakh." },
      { name: "स्वच्छ भारत मिशन (शहरी)", nameEn: "Swachh Bharat Mission (Urban)", status: "सक्रिय", statusEn: "Active", beneficiaries: "5,000+", beneficiariesEn: "5,000+", desc: "वैयक्तिक शौचालय बांधकाम, सार्वजनिक स्वच्छता.", descEn: "Individual toilet construction, public sanitation." },
      { name: "अमृत 2.0 योजना", nameEn: "AMRUT 2.0 Scheme", status: "सक्रिय", statusEn: "Active", beneficiaries: "सर्व", beneficiariesEn: "All", desc: "पाणीपुरवठा, मलनिःसारण व शहरी पायाभूत सुविधा.", descEn: "Water supply, sewerage, and urban infrastructure." },
    ],
  },
  state: {
    title: "राज्य शासन योजना", titleEn: "State Government Schemes",
    subtitle: "महाराष्ट्र शासनाच्या प्रमुख योजना", subtitleEn: "Major Schemes of Maharashtra Government",
    desc: "महाराष्ट्र शासनाच्या विविध कल्याणकारी योजना वाई नगरपालिका क्षेत्रात राबवल्या जातात.",
    descEn: "Various welfare schemes of Maharashtra Government are implemented in Wai Municipal area.",
    eligibility: ["महाराष्ट्र राज्याचे रहिवासी", "आधार कार्ड आवश्यक", "रेशन कार्ड (काही योजनांसाठी)", "उत्पन्न दाखला"],
    eligibilityEn: ["Resident of Maharashtra state", "Aadhaar card required", "Ration card (for some schemes)", "Income certificate"],
    benefits: ["आर्थिक सहाय्य", "शहरी विकास", "महिला सक्षमीकरण", "शेतकरी अनुदान"],
    benefitsEn: ["Financial assistance", "Urban development", "Women empowerment", "Farmer subsidies"],
    schemes: [
      { name: "मुख्यमंत्री शहरी विकास योजना", nameEn: "Chief Minister Urban Development Scheme", status: "सक्रिय", statusEn: "Active", beneficiaries: "सर्व", beneficiariesEn: "All", desc: "रस्ते, पूल, उद्याने विकास.", descEn: "Roads, bridges, parks development." },
      { name: "माझी लाडकी बहीण योजना", nameEn: "Majhi Ladki Bahin Yojana", status: "सक्रिय", statusEn: "Active", beneficiaries: "महिला", beneficiariesEn: "Women", desc: "पात्र महिलांना दरमहा ₹1,500 अनुदान.", descEn: "₹1,500 monthly subsidy to eligible women." },
      { name: "नमो शेतकरी महासन्मान निधी", nameEn: "Namo Shetkari Mahasanman Nidhi", status: "सक्रिय", statusEn: "Active", beneficiaries: "शेतकरी", beneficiariesEn: "Farmers", desc: "शेतकऱ्यांना वार्षिक ₹6,000.", descEn: "₹6,000 annually to farmers." },
    ],
  },
  local: {
    title: "नगरपालिकेच्या योजना", titleEn: "Municipal Schemes",
    subtitle: "वाई नगर परिषदेच्या स्थानिक योजना", subtitleEn: "Local Schemes of Wai Municipal Council",
    desc: "वाई नगर परिषदेने स्थानिक गरजांनुसार विविध योजना राबवल्या आहेत.",
    descEn: "Wai Municipal Council has implemented various schemes as per local needs.",
    eligibility: ["वाई नगरपालिका क्षेत्रातील रहिवासी", "नगरपालिका कर भरलेला असावा", "अर्जासोबत ओळखपत्र"],
    eligibilityEn: ["Resident of Wai Municipal area", "Municipal tax must be paid", "ID proof with application"],
    benefits: ["शहर स्वच्छता", "LED पथदिवे", "मोफत पाणी जोडणी", "उद्यान विकास"],
    benefitsEn: ["City cleanliness", "LED street lights", "Free water connection", "Park development"],
    schemes: [
      { name: "स्वच्छ वाई अभियान", nameEn: "Clean Wai Campaign", status: "सक्रिय", statusEn: "Active", beneficiaries: "सर्व", beneficiariesEn: "All", desc: "शहर स्वच्छता मोहीम.", descEn: "City cleanliness campaign." },
      { name: "एलईडी पथदिवे योजना", nameEn: "LED Street Light Scheme", status: "पूर्ण", statusEn: "Completed", beneficiaries: "सर्व प्रभाग", beneficiariesEn: "All Wards", desc: "सर्व रस्त्यांवर LED दिवे.", descEn: "LED lights on all roads." },
      { name: "मोफत पाणी जोडणी योजना", nameEn: "Free Water Connection Scheme", status: "सक्रिय", statusEn: "Active", beneficiaries: "BPL कुटुंबे", beneficiariesEn: "BPL Families", desc: "दारिद्र्यरेषेखालील कुटुंबांना मोफत नळ जोडणी.", descEn: "Free water connection for below poverty line families." },
    ],
  },
  pmay: {
    title: "प्रधानमंत्री आवास योजना", titleEn: "Pradhan Mantri Awas Yojana",
    subtitle: "सर्वांसाठी घरे - 2024", subtitleEn: "Housing for All - 2024",
    desc: "प्रधानमंत्री आवास योजना (शहरी) अंतर्गत आर्थिकदृष्ट्या दुर्बल घटक (EWS), अल्प उत्पन्न गट (LIG) आणि मध्यम उत्पन्न गट (MIG) यांना परवडणारी घरे उपलब्ध करून दिली जातात.",
    descEn: "Under PMAY (Urban), affordable housing is provided to Economically Weaker Sections (EWS), Low Income Group (LIG), and Middle Income Group (MIG).",
    eligibility: ["वार्षिक उत्पन्न ₹3 लाख पर्यंत (EWS)", "वार्षिक उत्पन्न ₹3-6 लाख (LIG)", "कुटुंबातील कोणत्याही सदस्याला पक्के घर नसावे", "आधार कार्ड आवश्यक"],
    eligibilityEn: ["Annual income up to ₹3 lakh (EWS)", "Annual income ₹3-6 lakh (LIG)", "No family member should own a pucca house", "Aadhaar card required"],
    benefits: ["₹2.67 लाख अनुदान (EWS)", "₹2.35 लाख अनुदान (LIG)", "व्याज अनुदान 6.5% पर्यंत (MIG)", "जमीन मालकी हक्क"],
    benefitsEn: ["₹2.67 lakh subsidy (EWS)", "₹2.35 lakh subsidy (LIG)", "Interest subsidy up to 6.5% (MIG)", "Land ownership rights"],
  },
  "swachh-bharat": {
    title: "स्वच्छ भारत मिशन", titleEn: "Swachh Bharat Mission",
    subtitle: "स्वच्छ भारत, स्वस्थ भारत", subtitleEn: "Clean India, Healthy India",
    desc: "स्वच्छ भारत मिशन (शहरी) अंतर्गत वैयक्तिक शौचालय बांधकाम, सार्वजनिक शौचालय बांधकाम, कचरा व्यवस्थापन आणि शहर स्वच्छता मोहीम राबवली जाते.",
    descEn: "Under Swachh Bharat Mission (Urban), individual toilet construction, public toilet construction, waste management, and city cleanliness drives are conducted.",
    eligibility: ["वाई नगरपालिका क्षेत्रातील रहिवासी", "ज्यांच्याकडे स्वतःचे शौचालय नाही", "BPL कुटुंबे प्राधान्य", "अर्जासोबत फोटो ओळखपत्र"],
    eligibilityEn: ["Resident of Wai Municipal area", "Those without own toilet", "BPL families priority", "Photo ID with application"],
    benefits: ["₹12,000 शौचालय बांधकाम अनुदान", "मोफत कचरा संकलन", "कचरा वर्गीकरण प्रशिक्षण", "सार्वजनिक शौचालय सुविधा"],
    benefitsEn: ["₹12,000 toilet construction subsidy", "Free waste collection", "Waste segregation training", "Public toilet facilities"],
  },
};

export const CentralSchemes = () => <SchemePage data={schemeData.central} />;
export const StateSchemes = () => <SchemePage data={schemeData.state} />;
export const LocalSchemes = () => <SchemePage data={schemeData.local} />;
export const PMAY = () => <SchemePage data={schemeData.pmay} />;
export const SwachhBharat = () => <SchemePage data={schemeData["swachh-bharat"]} />;
