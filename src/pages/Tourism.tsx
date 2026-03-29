import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Camera, Mountain, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  { src: "/wai-temple.jpg", labelMr: "वाई महागणपती मंदिर", labelEn: "Wai Mahaganpati Temple" },
  { src: "/mandhardevi.jpg", labelMr: "मांढरदेवी देवस्थान", labelEn: "Mandhardevi Temple" },
  { src: "/Kamalgad.jpg", labelMr: "कमळगड किल्ला", labelEn: "Kamalgad Fort" },
];

const spots = [
  {
    image: "/wai-temple.jpg",
    nameMr: "वाई महागणपती मंदिर",
    nameEn: "Wai Mahaganpati Temple",
    tagMr: "धार्मिक स्थळ",
    tagEn: "Religious Site",
    icon: Camera,
    descMr:
      "वाईची मुख्य ओळख असलेले हे मंदिर १७६२ मध्ये सरदार गणपतराव भिकाजी रास्ते यांनी कृष्णा घाटावर बांधले. हे वाईतील सर्वात भव्य मंदिर असून येथील गणेशाची मूर्ती ६ फूट उंच आणि ७ फूट लांब आहे. एकाच अखंड दगडातून घडवलेली ही 'बैठी' पाषाणमूर्ती आणि मंदिराचा विस्तीर्ण कमानीयुक्त सभामंडप पर्यटकांचे मुख्य आकर्षण आहे.",
    descEn:
      "A landmark of Wai’s heritage, this temple was built in 1762 by Sardar Ganpatrao Bhikaji Raste on the banks of the Krishna River. It is the largest and most magnificent temple in the region, featuring a massive seated stone idol of Lord Ganesha, measuring 6 feet in height and 7 feet in width. The temple is renowned for its grand hall with elegant arches and its impressive Peshwa-era architecture.",
    timeMr: "सकाळी ५:०० ते रात्री ९:३०",
    timeEn: "5:00 AM to 9:30 PM",
    locationMr: "कृष्णा नदी तीर, वाई, सातारा",
    locationEn: "Krishna River Bank, Wai, Satara",
    locationUrl: "https://maps.app.goo.gl/YmfqZVH5grFNiaxX6",
  },
  {
    image: "/mandhardevi.jpg",
    nameMr: "मांढरदेवी देवस्थान",
    nameEn: "Mandhardevi Temple",
    tagMr: "धार्मिक / ट्रेकिंग",
    tagEn: "Religious / Trekking",
    icon: Mountain,
    descMr:
      "वाई तालुक्यातील मांढरदेव येथे समुद्रसपाटीपासून सुमारे ४,६५० फूट उंचीवर आई काळुबाईचे प्राचीन मंदिर वसलेले आहे. लाखो भाविकांचे श्रद्धास्थान आणि कुलदैवत असलेल्या या देवीचे मंदिर साधारण ३५० ते ४०० वर्षे जुने आहे. निसर्गरम्य डोंगरमाथ्यावर असलेले हे मंदिर त्याच्या ऐतिहासिक आणि धार्मिक महत्त्वासाठी प्रसिद्ध असून, दरवर्षी पौष पौर्णिमेला येथे मोठी 'काळुबाईची जत्रा' भरते. या ठिकाणाहून पांडवगड आणि पुरंदर किल्ल्यांचे विलोभनीय दर्शन घडते.",
    descEn:
      "Perched at an altitude of approximately 4,650 feet above sea level in Mandhardeo village, this ancient temple is dedicated to Goddess Kalubai, the revered family deity of millions. The temple is nearly 350 to 400 years old and holds immense historical and religious significance. Located atop a scenic hill, it offers breathtaking views of the Pandavgad and Purandar forts. The temple is best known for its grand annual fair, the 'Kalubai Jatra,' held during Paush Purnima.",
    timeMr: "सकाळी ६:०० ते संध्याकाळी ७:००",
    timeEn: "6:00 AM to 7:00 PM",
    locationMr: "मांढरदेवी डोंगर, वाई तालुका, सातारा",
    locationEn: "Mandhardevi Hill, Wai Taluka, Satara",
    locationUrl: "https://maps.app.goo.gl/sqKxq4hqU1fwmFbM8",
  },
  {
    image: "/Kamalgad.jpg",
    nameMr: "कमळगड किल्ला (कत्तलगड)",
    nameEn: "Kamalgad Fort (Kattalgad)",
    tagMr: "ऐतिहासिक / ट्रेकिंग",
    tagEn: "Historical / Trekking",
    icon: Mountain,
    descMr:
      "समुद्रसपाटीपासून ४,५११ फूट उंचीवर असलेला कमळगड हा त्याच्या नैसर्गिक रचनेसाठी प्रसिद्ध आहे. या किल्ल्याला इतर किल्ल्यांसारखी तटबंदी किंवा दरवाजे नसून, चहूबाजूंच्या अवाढव्य नैसर्गिक कड्यांमुळेच याला अभेद्यपणा प्राप्त झाला आहे. याला 'कत्तलगड' म्हणूनही ओळखले जाते, कारण ब्रिटिश काळात याचा उपयोग कैद्यांना फाशी देण्यासाठी केला जात असे. येथील मुख्य आकर्षण म्हणजे खडकात खोदलेली 'कावेची विहीर' (Geruchi Vihir). गडाच्या माथ्यावरून धोम धरण, पसरणी घाट आणि महाबळेश्वरच्या डोंगररांगांचे विहंगम दृश्य दिसते.",
    descEn:
      "Standing at an altitude of 4,511 feet, Kamalgad is unique because it lacks traditional man-made walls or gateways; its steep, natural rock faces provided sufficient defense. Also known as Kattalgad (Death Fort), it was historically used by the British to execute prisoners. The fort's most intriguing feature is the 'Geruchi Vihir' (Red Stone Well)—a deep, rectangular shaft carved directly into the rock. From the top, visitors can enjoy a breathtaking 360-degree view of the Dhom Dam, Pasarni Ghat, and the peaks of Mahabaleshwar.",
    timeMr: "सूर्योदय ते सूर्यास्त",
    timeEn: "Sunrise to Sunset",
    locationMr: "कमळगड, वाई तालुका, सातारा",
    locationEn: "Kamalgad, Wai Taluka, Satara",
    locationUrl: "https://maps.app.goo.gl/ckPoVewYZ3yWss2M7",
  },
  {
    image: "/mandhardevi.jpg",
    nameMr: "काशी विश्वेश्वर मंदिर",
    nameEn: "Kashi Vishweshwar Temple",
    tagMr: "धार्मिक",
    tagEn: "Religious / Trekking",
    icon: Mountain,
    descMr:
      "वाईच्या गणपती आळी घाटावर, ढोल्या गणपती मंदिराच्या अगदी शेजारीच काशी विश्वेश्वर मंदिर वसलेले आहे. भगवान शंकराला समर्पित असलेल्या या मंदिराला त्यावरील शेकडो वैशिष्ट्यपूर्ण कोरीव कामांमुळे 'शिल्पमंदिर' असेही म्हटले जाते. या मंदिराचे मुख्य आकर्षण म्हणजे एकाच अखंड काळ्या पाषाणात कोरलेला भव्य नंदी, जो ढोल्या गणपतीच्या मूर्तीसाठी वापरलेल्या पाषाणातूनच बनवण्यात आला आहे. मंदिराच्या शिखरावर सुमारे ११० देवड्या असून त्यामध्ये विविध देवदेवतांच्या सुबक मूर्ती कोरलेल्या आहेत.",
    descEn:
      "Located on the Ganpati Aali Ghat, right next to the Dholya Ganpati, the Kashi Vishweshwar Temple is a masterpiece of stone architecture. Dedicated to Lord Shiva, it is often called a 'Shilp-mandir' due to the hundreds of intricate carvings on its walls and spire (shikhara). The main attraction is the monolithic Nandi, carved from the same black stone as the Mahaganpati idol. The temple’s unique spire features nearly 110 small niches containing various deities, showcasing the finesse of Peshwa-era craftsmanship.",
    timeMr: "सकाळी ६:०० ते संध्याकाळी ७:००",
    timeEn: "6:00 AM to 7:00 PM",
    locationMr: "गणपती आळी, वाई तालुका, सातारा.",
    locationEn: "Ganpati Ali, Wai Taluka, Satara",
    locationUrl: "https://maps.app.goo.gl/KCzi7pYGnri4Di9H8",
  },
];

const Tourism = () => {
  const { t, lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 3500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent((index + heroImages.length) % heroImages.length);
    startTimer();
  };

  return (
    <PageLayout>
      {/* Hero Slider */}
      <div className="relative h-64 md:h-80 overflow-hidden group">
        {heroImages.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <img src={img.src} alt={lang === "mr" ? img.labelMr : img.labelEn} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
              {t("वाई पर्यटन", "Wai Tourism")}
            </h1>
            <p className="text-white/80 text-lg">
              {lang === "mr" ? heroImages[current].labelMr : heroImages[current].labelEn}
            </p>
          </div>
        </div>

        {/* Prev / Next */}
        <button
          onClick={() => goTo(current - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => goTo(current + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/50"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
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
                    <a
                      href={spot.locationUrl ? spot.locationUrl : `https://www.google.com/maps/search/${encodeURIComponent(lang === "mr" ? spot.locationMr : spot.locationEn)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline hover:opacity-80"
                    >
                      {lang === "mr" ? spot.locationMr : spot.locationEn}
                    </a>
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