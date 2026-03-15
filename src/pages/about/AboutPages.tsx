import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, MapPin, Phone, Award, Landmark, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Introduction = () => {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gov-gradient opacity-10" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="w-20 h-20 rounded-full gov-gradient mx-auto mb-6 flex items-center justify-center">
              <Building2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">{t("वाई नगर परिषद", "Wai Municipal Council")}</h1>
            <p className="text-lg text-muted-foreground">{t("जिल्हा सातारा, महाराष्ट्र | स्थापना: इ.स. 1852", "District Satara, Maharashtra | Established: 1852 AD")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Landmark, value: "170+", label: t("वर्षे सेवा", "Years of Service") },
              { icon: Users, value: "40,000+", label: t("लोकसंख्या", "Population") },
              { icon: MapPin, value: "8", label: t("प्रभाग", "Wards") },
            ].map((s) => (
              <Card key={s.label} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <s.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-bold text-primary">{s.value}</p>
                  <p className="text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <BookOpen className="w-6 h-6" /> {t("नगरपालिकेचा परिचय", "Introduction to the Municipality")}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t(
                  'वाई नगर परिषद ही महाराष्ट्र राज्यातील सातारा जिल्ह्यातील एक प्रमुख नगरपालिका आहे. वाई हे कृष्णा नदीच्या तीरावर वसलेले एक ऐतिहासिक शहर आहे. या शहराला "दक्षिण काशी" म्हणूनही ओळखले जाते.',
                  'Wai Municipal Council is a major municipality in Satara district of Maharashtra state. Wai is a historic city situated on the banks of the Krishna River. The city is also known as "Dakshin Kashi" (Southern Varanasi).'
                )}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "नगरपालिकेची स्थापना इ.स. 1852 मध्ये झाली असून ती महाराष्ट्रातील सर्वात जुन्या नगरपालिकांपैकी एक आहे. पाणीपुरवठा, स्वच्छता, रस्ते बांधकाम, दिवाबत्ती, आरोग्य सेवा आणि शहर नियोजन ही नगरपालिकेची प्रमुख कार्ये आहेत.",
                  "The municipality was established in 1852 AD and is one of the oldest municipalities in Maharashtra. Water supply, sanitation, road construction, street lighting, health services, and urban planning are the primary functions of the municipality."
                )}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Phone, label: t("संपर्क", "Contact"), value: "02167-220000" },
                  { icon: MapPin, label: t("पत्ता", "Address"), value: t("मुख्य बाजारपेठ, वाई 412803", "Main Market, Wai 412803") },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3 bg-muted rounded-lg p-4">
                    <c.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">{c.label}</p>
                      <p className="font-medium text-sm">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export const History = () => {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">{t("वाई शहराचा इतिहास", "History of Wai City")}</h1>
        <div className="max-w-3xl mx-auto space-y-0 relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20" />
          {[
            { year: t("इ.स.पू.", "Ancient Era"), title: t("प्राचीन काळ", "Ancient Period"), desc: t("वाई शहराचा उल्लेख प्राचीन ग्रंथांमध्ये आढळतो. कृष्णा नदीच्या तीरावर वसलेले हे शहर धार्मिक महत्त्वासाठी प्रसिद्ध होते.", "Wai city is mentioned in ancient texts. This city, situated on the banks of the Krishna River, was famous for its religious significance.") },
            { year: t("१७ वे शतक", "17th Century"), title: t("मराठा साम्राज्य", "Maratha Empire"), desc: t("छत्रपती शिवाजी महाराजांच्या काळात वाई एक महत्त्वाचे व्यापारी केंद्र बनले.", "During the era of Chhatrapati Shivaji Maharaj, Wai became an important trading center.") },
            { year: t("१८ वे शतक", "18th Century"), title: t("पेशवेकालीन वाई", "Wai in Peshwa Era"), desc: t("पेशवेकाळात वाई हे शिक्षण आणि संस्कृतीचे प्रमुख केंद्र बनले. अनेक शैक्षणिक संस्था स्थापन झाल्या.", "During the Peshwa period, Wai became a major center of education and culture. Many educational institutions were established.") },
            { year: "1852", title: t("नगरपालिका स्थापना", "Municipality Established"), desc: t("ब्रिटिश राजवटीत वाई नगरपालिकेची स्थापना करण्यात आली. महाराष्ट्रातील सर्वात जुन्या नगरपालिकांपैकी एक.", "Wai Municipality was established during British rule. One of the oldest municipalities in Maharashtra.") },
            { year: "1947", title: t("स्वातंत्र्योत्तर काळ", "Post-Independence Era"), desc: t("स्वातंत्र्यानंतर वाई शहराचा विकास वेगाने झाला. नवीन शाळा, रुग्णालये आणि पायाभूत सुविधा निर्माण झाल्या.", "After independence, Wai city developed rapidly. New schools, hospitals, and infrastructure were built.") },
            { year: t("आज", "Today"), title: t("आधुनिक वाई", "Modern Wai"), desc: t("आज वाई एक स्मार्ट शहर बनण्याच्या दिशेने वाटचाल करत आहे. डिजिटल सेवा, स्वच्छता मोहीम आणि विकास प्रकल्प सुरू आहेत.", "Today Wai is on its way to becoming a smart city. Digital services, cleanliness drives, and development projects are underway.") },
          ].map((item, i) => (
            <div key={i} className="relative pl-16 pb-10 group">
              <div className="absolute left-3.5 top-1 w-5 h-5 rounded-full bg-primary border-4 border-background z-10 group-hover:scale-125 transition-transform" />
              <Card className="hover:shadow-lg transition-all hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-2">{item.year}</span>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export const Structure = () => {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">{t("प्रशासकीय रचना", "Administrative Structure")}</h1>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">{t("वाई नगर परिषदेची प्रशासकीय रचना लोकशाही तत्त्वांवर आधारित आहे.", "The administrative structure of Wai Municipal Council is based on democratic principles.")}</p>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Card className="bg-primary text-primary-foreground w-64 text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl mb-2">👑</div>
                <h3 className="font-bold text-lg">{t("नगराध्यक्ष", "Mayor")}</h3>
                <p className="text-primary-foreground/80 text-sm">{t("निर्वाचित प्रमुख", "Elected Head")}</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center"><div className="w-0.5 h-8 bg-primary/30" /></div>

          <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto">
            {[
              { emoji: "📋", title: t("सर्वसाधारण सभा", "General Assembly"), desc: t("सर्व नगरसेवक - मुख्य निर्णय संस्था", "All corporators - Main decision-making body") },
              { emoji: "⚙️", title: t("मुख्याधिकारी", "Chief Officer"), desc: t("प्रशासकीय प्रमुख - IAS अधिकारी", "Administrative Head - IAS Officer") },
            ].map((item) => (
              <Card key={item.title} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-5 text-center">
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center"><div className="w-0.5 h-8 bg-primary/30" /></div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "💰", title: t("स्थायी समिती", "Standing Committee"), desc: t("आर्थिक निर्णय", "Financial Decisions") },
              { emoji: "🏗️", title: t("बांधकाम समिती", "Construction Committee"), desc: t("विकास कामे", "Development Works") },
              { emoji: "🏥", title: t("आरोग्य समिती", "Health Committee"), desc: t("आरोग्य सेवा", "Health Services") },
              { emoji: "📚", title: t("शिक्षण समिती", "Education Committee"), desc: t("शैक्षणिक कार्य", "Educational Activities") },
            ].map((item) => (
              <Card key={item.title} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-4 text-center">
                  <div className="text-xl mb-1">{item.emoji}</div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export const Mayor = () => {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden">
            <div className="gov-gradient p-8 text-primary-foreground text-center">
              <div className="w-32 h-32 rounded-full bg-primary-foreground/20 mx-auto mb-4 flex items-center justify-center text-6xl border-4 border-primary-foreground/30">
                👤
              </div>
              <h1 className="text-3xl font-bold">{t("श्री. रामचंद्र पाटील", "Shri. Ramchandra Patil")}</h1>
              <p className="text-primary-foreground/90 text-lg mt-1">{t("नगराध्यक्ष, वाई नगर परिषद", "Mayor, Wai Municipal Council")}</p>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: t("कार्यकाळ", "Tenure"), value: t("2024 - वर्तमान", "2024 - Present") },
                  { label: t("पक्ष", "Party"), value: t("राष्ट्रवादी काँग्रेस", "Nationalist Congress Party") },
                  { label: t("संपर्क", "Contact"), value: "02167-220001" },
                ].map((i) => (
                  <div key={i.label} className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground">{i.label}</p>
                    <p className="font-bold text-sm">{i.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3 text-primary">{t("संदेश", "Message")}</h2>
                <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-4">
                  {t(
                    '"वाई शहराचा सर्वांगीण विकास हे माझे ध्येय आहे. स्वच्छ, सुंदर आणि स्मार्ट वाई शहर बनवण्यासाठी आम्ही कटिबद्ध आहोत. नागरिकांच्या सहकार्याने आम्ही हे शक्य करू."',
                    '"The holistic development of Wai city is my goal. We are committed to making Wai a clean, beautiful, and smart city. With the cooperation of citizens, we will make this possible."'
                  )}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3 text-primary">{t("प्रमुख उपलब्धी", "Key Achievements")}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    t("स्वच्छ शहर अभियान यशस्वी", "Clean City Campaign Successful"),
                    t("LED पथदिवे प्रकल्प पूर्ण", "LED Street Light Project Completed"),
                    t("नवीन पाणीपुरवठा योजना सुरू", "New Water Supply Scheme Started"),
                    t("डिजिटल नागरिक सेवा", "Digital Citizen Services"),
                  ].map((a) => (
                    <div key={a} className="flex items-center gap-2 bg-primary/5 rounded-lg p-3">
                      <Award className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export const ChiefOfficer = () => {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/90 to-primary p-8 text-primary-foreground text-center">
              <div className="w-32 h-32 rounded-full bg-primary-foreground/20 mx-auto mb-4 flex items-center justify-center text-6xl border-4 border-primary-foreground/30">
                👤
              </div>
              <h1 className="text-3xl font-bold">{t("श्री. सुनील देशमुख", "Shri. Sunil Deshmukh")}</h1>
              <p className="text-primary-foreground/90 text-lg mt-1">{t("मुख्याधिकारी, वाई नगर परिषद", "Chief Officer, Wai Municipal Council")}</p>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: t("पद", "Position"), value: t("IAS अधिकारी", "IAS Officer") },
                  { label: t("कार्यकाळ", "Tenure"), value: t("2025 - वर्तमान", "2025 - Present") },
                  { label: t("संपर्क", "Contact"), value: "02167-220002" },
                ].map((i) => (
                  <div key={i.label} className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground">{i.label}</p>
                    <p className="font-bold text-sm">{i.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3 text-primary">{t("जबाबदाऱ्या", "Responsibilities")}</h2>
                <ul className="space-y-2">
                  {[
                    t("नगरपालिकेचे संपूर्ण प्रशासकीय व्यवस्थापन", "Complete administrative management of the municipality"),
                    t("विकास प्रकल्पांचे नियोजन व अंमलबजावणी", "Planning and implementation of development projects"),
                    t("कर वसुली व आर्थिक व्यवस्थापन", "Tax collection and financial management"),
                    t("नागरिक सेवांची गुणवत्ता सुनिश्चित करणे", "Ensuring quality of citizen services"),
                    t("शासकीय योजनांची अंमलबजावणी", "Implementation of government schemes"),
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export const Corporators = () => {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">{t("नगरसेवक", "Corporators")}</h1>
        <p className="text-center text-muted-foreground mb-10">{t("वाई नगर परिषदेचे निर्वाचित नगरसेवक", "Elected Corporators of Wai Municipal Council")}</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: t("श्री. विजय जाधव", "Shri. Vijay Jadhav"), ward: t("प्रभाग क्र. १", "Ward No. 1"), party: t("राष्ट्रवादी", "NCP"), phone: "98XX-XXXXXX" },
            { name: t("श्रीमती सुनीता शिंदे", "Smt. Sunita Shinde"), ward: t("प्रभाग क्र. २", "Ward No. 2"), party: t("शिवसेना", "Shiv Sena"), phone: "97XX-XXXXXX" },
            { name: t("श्री. अमोल कुलकर्णी", "Shri. Amol Kulkarni"), ward: t("प्रभाग क्र. ३", "Ward No. 3"), party: t("भाजपा", "BJP"), phone: "96XX-XXXXXX" },
            { name: t("श्रीमती माया पवार", "Smt. Maya Pawar"), ward: t("प्रभाग क्र. ४", "Ward No. 4"), party: t("काँग्रेस", "Congress"), phone: "95XX-XXXXXX" },
            { name: t("श्री. राजेश मोरे", "Shri. Rajesh More"), ward: t("प्रभाग क्र. ५", "Ward No. 5"), party: t("अपक्ष", "Independent"), phone: "94XX-XXXXXX" },
            { name: t("श्रीमती अंजली भोसले", "Smt. Anjali Bhosale"), ward: t("प्रभाग क्र. ६", "Ward No. 6"), party: t("राष्ट्रवादी", "NCP"), phone: "93XX-XXXXXX" },
            { name: t("श्री. प्रकाश गायकवाड", "Shri. Prakash Gaikwad"), ward: t("प्रभाग क्र. ७", "Ward No. 7"), party: t("भाजपा", "BJP"), phone: "92XX-XXXXXX" },
            { name: t("श्रीमती रेखा साळुंखे", "Smt. Rekha Salunkhe"), ward: t("प्रभाग क्र. ८", "Ward No. 8"), party: t("शिवसेना", "Shiv Sena"), phone: "91XX-XXXXXX" },
          ].map((c) => (
            <Card key={c.ward} className="hover:shadow-lg transition-all hover:-translate-y-1 group">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center text-3xl group-hover:bg-primary/20 transition-colors">
                  👤
                </div>
                <h3 className="font-bold">{c.name}</h3>
                <p className="text-primary text-sm font-medium">{c.ward}</p>
                <span className="inline-block bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full mt-1">{c.party}</span>
                <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                  <Phone className="w-3 h-3" /> {c.phone}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
