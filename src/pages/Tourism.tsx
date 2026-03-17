import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Camera, Mountain, Clock } from "lucide-react";

const spots = [
  {
    image: "/wai-temple.jpg",
    nameMr: "वाई महागणपती मंदिर",
    nameEn: "Wai Mahaganpati Temple",
    tagMr: "धार्मिक स्थळ",
    tagEn: "Religious Site",
    icon: Camera,
    descMr:
      "वाई शहरातील प्रसिद्ध महागणपती मंदिर कृष्णा नदीच्या तीरावर वसलेले आहे. हे मंदिर अष्टविनायकांपैकी एक मानले जाते. दरवर्षी लाखो भाविक येथे दर्शनासाठी येतात. मंदिराची स्थापत्यकला अत्यंत सुंदर असून नदीकाठचे वातावरण मनाला शांती देते.",
    descEn:
      "The famous Mahaganpati Temple in Wai is situated on the banks of the Krishna River. This temple is considered one of the Ashtavinayak shrines. Lakhs of devotees visit here every year. The temple's architecture is beautiful and the riverside atmosphere brings peace of mind.",
    timeMr: "सकाळी ५:०० ते रात्री ९:३०",
    timeEn: "5:00 AM to 9:30 PM",
    locationMr: "कृष्णा नदी तीर, वाई, सातारा",
    locationEn: "Krishna River Bank, Wai, Satara",
  },
  {
    image: "/mandhardevi.jpg",
    nameMr: "मांढरदेवी देवस्थान",
    nameEn: "Mandhardevi Temple",
    tagMr: "धार्मिक / ट्रेकिंग",
    tagEn: "Religious / Trekking",
    icon: Mountain,
    descMr:
      "मांढरदेवी हे सातारा जिल्ह्यातील एक प्रसिद्ध देवस्थान आहे. डोंगरावर वसलेल्या या मंदिरापर्यंत पोहोचण्यासाठी ट्रेकिंग करावी लागते. नवरात्रीत येथे मोठी यात्रा भरते. उंचावरून दिसणारे सह्याद्रीचे विहंगम दृश्य पर्यटकांना मोहित करते.",
    descEn:
      "Mandhardevi is a famous temple in Satara district. Trekking is required to reach this hilltop temple. A grand fair is held here during Navratri. The panoramic view of the Sahyadri mountains from the top mesmerizes tourists.",
    timeMr: "सकाळी ६:०० ते संध्याकाळी ७:००",
    timeEn: "6:00 AM to 7:00 PM",
    locationMr: "मांढरदेवी डोंगर, वाई तालुका, सातारा",
    locationEn: "Mandhardevi Hill, Wai Taluka, Satara",
  },
  {
    image: "/Kamalgad.jpg",
    nameMr: "कमळगड किल्ला",
    nameEn: "Kamalgad Fort",
    tagMr: "ऐतिहासिक / ट्रेकिंग",
    tagEn: "Historical / Trekking",
    icon: Mountain,
    descMr:
      "कमळगड हा वाई परिसरातील एक ऐतिहासिक किल्ला आहे. छत्रपती शिवाजी महाराजांच्या काळातील या किल्ल्याला ऐतिहासिक महत्त्व आहे. किल्ल्यावरून सह्याद्रीच्या रांगा आणि कृष्णा खोऱ्याचे अप्रतिम दृश्य दिसते. ट्रेकर्ससाठी हे एक आवडते ठिकाण आहे.",
    descEn:
      "Kamalgad is a historic fort near Wai. This fort from the era of Chhatrapati Shivaji Maharaj holds great historical significance. From the fort, one can see stunning views of the Sahyadri ranges and Krishna valley. It is a favourite destination for trekkers.",
    timeMr: "सूर्योदय ते सूर्यास्त",
    timeEn: "Sunrise to Sunset",
    locationMr: "कमळगड, वाई तालुका, सातारा",
    locationEn: "Kamalgad, Wai Taluka, Satara",
  },
];

const Tourism = () => {
  const { t, lang } = useLanguage();

  return (
    <PageLayout>
      {/* Hero banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src="/wai-temple.jpg" alt="Wai Tourism" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
              {t("वाई पर्यटन", "Wai Tourism")}
            </h1>
            <p className="text-white/80 text-lg">
              {t("ऐतिहासिक, धार्मिक आणि निसर्गरम्य वाई शहर", "Historic, Religious & Scenic Wai City")}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t(
              "वाई हे महाराष्ट्रातील सातारा जिल्ह्यातील एक ऐतिहासिक शहर आहे. कृष्णा नदीच्या तीरावर वसलेले हे शहर आपल्या प्राचीन मंदिरे, किल्ले आणि निसर्गसौंदर्यासाठी प्रसिद्ध आहे.",
              "Wai is a historic city in Satara district of Maharashtra. Situated on the banks of the Krishna River, this city is famous for its ancient temples, forts and natural beauty."
            )}
          </p>
        </div>

        {/* Spots */}
        {spots.map((spot, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={spot.nameEn} className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}>
              {/* Image */}
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
                <img
                  src={spot.image}
                  alt={lang === "mr" ? spot.nameMr : spot.nameEn}
                  className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="w-full md:w-1/2 space-y-4">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {lang === "mr" ? spot.tagMr : spot.tagEn}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {lang === "mr" ? spot.nameMr : spot.nameEn}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {lang === "mr" ? spot.descMr : spot.descEn}
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{t("वेळ", "Timings")}:</span>
                    <span className="font-medium">{lang === "mr" ? spot.timeMr : spot.timeEn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{t("ठिकाण", "Location")}:</span>
                    <span className="font-medium">{lang === "mr" ? spot.locationMr : spot.locationEn}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* How to reach */}
        <div className="bg-muted rounded-2xl p-8 max-w-3xl mx-auto text-center space-y-3">
          <MapPin className="h-8 w-8 text-primary mx-auto" />
          <h3 className="text-xl font-bold">{t("कसे पोहोचाल?", "How to Reach?")}</h3>
          <p className="text-muted-foreground">
            {t(
              "वाई हे पुण्यापासून सुमारे ९५ किमी आणि सातारापासून ३५ किमी अंतरावर आहे. पुणे-बंगलोर महामार्गावरून वाईला सहज पोहोचता येते. बस, खाजगी वाहन आणि टॅक्सी सेवा उपलब्ध आहे.",
              "Wai is about 95 km from Pune and 35 km from Satara. It is easily accessible from the Pune-Bangalore highway. Bus, private vehicle and taxi services are available."
            )}
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Tourism;
