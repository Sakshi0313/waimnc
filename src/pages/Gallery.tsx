import PageLayout from "@/components/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const photos = [
  { title: "स्वच्छता मोहीम उद्घाटन", titleEn: "Cleanliness Drive Inauguration", date: "10 मार्च 2026", dateEn: "10 March 2026" },
  { title: "पाणीपुरवठा योजना भूमिपूजन", titleEn: "Water Supply Scheme Groundbreaking", date: "05 मार्च 2026", dateEn: "05 March 2026" },
  { title: "प्रजासत्ताक दिन सोहळा", titleEn: "Republic Day Celebration", date: "26 जानेवारी 2026", dateEn: "26 January 2026" },
  { title: "वृक्षारोपण मोहीम", titleEn: "Tree Plantation Drive", date: "05 जून 2025", dateEn: "05 June 2025" },
  { title: "रस्ता उद्घाटन सोहळा", titleEn: "Road Inauguration Ceremony", date: "15 ऑगस्ट 2025", dateEn: "15 August 2025" },
  { title: "नगरपालिका वर्धापन दिन", titleEn: "Municipality Anniversary", date: "01 मे 2025", dateEn: "01 May 2025" },
  { title: "गणेशोत्सव मिरवणूक", titleEn: "Ganesh Festival Procession", date: "10 सप्टेंबर 2025", dateEn: "10 September 2025" },
  { title: "दिवाळी सजावट", titleEn: "Diwali Decoration", date: "01 नोव्हेंबर 2025", dateEn: "01 November 2025" },
];

const videos = [
  { title: "सर्वसाधारण सभा - मार्च 2026", titleEn: "General Meeting - March 2026", date: "12 मार्च 2026", dateEn: "12 March 2026" },
  { title: "स्वच्छता मोहीम व्हिडिओ", titleEn: "Cleanliness Drive Video", date: "10 मार्च 2026", dateEn: "10 March 2026" },
  { title: "नगराध्यक्ष संदेश", titleEn: "Mayor's Message", date: "26 जानेवारी 2026", dateEn: "26 January 2026" },
  { title: "विकास कामे प्रगती", titleEn: "Development Works Progress", date: "15 फेब्रुवारी 2026", dateEn: "15 February 2026" },
];

const Gallery = () => {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10 space-y-6">
        <h1 className="text-3xl font-bold text-primary">{t("गॅलरी", "Gallery")}</h1>
        <Tabs defaultValue="photos">
          <TabsList>
            <TabsTrigger value="photos">{t("फोटो गॅलरी", "Photo Gallery")}</TabsTrigger>
            <TabsTrigger value="videos">{t("व्हिडिओ गॅलरी", "Video Gallery")}</TabsTrigger>
          </TabsList>
          <TabsContent value="photos" className="mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((p, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-primary/10 flex items-center justify-center text-4xl">📷</div>
                  <CardContent className="p-3">
                    <p className="text-sm font-semibold truncate">{t(p.title, p.titleEn)}</p>
                    <p className="text-xs text-muted-foreground">{t(p.date, p.dateEn)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="videos" className="mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {videos.map((v, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-muted flex items-center justify-center relative">
                    <div className="w-14 h-14 rounded-full bg-primary/80 flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-semibold truncate">{t(v.title, v.titleEn)}</p>
                    <p className="text-xs text-muted-foreground">{t(v.date, v.dateEn)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Gallery;
