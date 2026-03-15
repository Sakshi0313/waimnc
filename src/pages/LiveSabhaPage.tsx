import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Calendar, FileText, Download, Play, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LiveSabhaPage = () => {
  const { t } = useLanguage();

  const upcomingSabhas = [
    { date: t("20 मार्च 2026", "20 March 2026"), time: t("सकाळी 11:00", "11:00 AM"), type: t("सर्वसाधारण सभा", "General Meeting"), agenda: t("अर्थसंकल्प मंजुरी, विकास कामे", "Budget approval, development works") },
    { date: t("05 एप्रिल 2026", "05 April 2026"), time: t("सकाळी 11:00", "11:00 AM"), type: t("विशेष सभा", "Special Meeting"), agenda: t("पाणीपुरवठा योजना चर्चा", "Water supply scheme discussion") },
  ];

  const pastSabhas = [
    { date: t("12 मार्च 2026", "12 March 2026"), type: t("सर्वसाधारण सभा", "General Meeting"), duration: t("2 तास 15 मिनिटे", "2 hours 15 minutes"), agenda: t("स्वच्छता मोहीम, रस्ता प्रकल्प, कर वसुली", "Cleanliness drive, road project, tax collection") },
    { date: t("25 फेब्रुवारी 2026", "25 February 2026"), type: t("विशेष सभा", "Special Meeting"), duration: t("1 तास 30 मिनिटे", "1 hour 30 minutes"), agenda: t("LED पथदिवे प्रकल्प, कचरा व्यवस्थापन", "LED street light project, waste management") },
    { date: t("10 फेब्रुवारी 2026", "10 February 2026"), type: t("सर्वसाधारण सभा", "General Meeting"), duration: t("3 तास", "3 hours"), agenda: t("वार्षिक लेखापरीक्षण, नवीन प्रकल्प मंजुरी", "Annual audit, new project approval") },
    { date: t("28 जानेवारी 2026", "28 January 2026"), type: t("सर्वसाधारण सभा", "General Meeting"), duration: t("2 तास", "2 hours"), agenda: t("प्रजासत्ताक दिन तयारी, अंदाजपत्रक", "Republic Day preparation, budget") },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10 space-y-8">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
          <Video className="w-8 h-8" /> {t("लाईव्ह सभा प्रसारण", "Live Sabha Broadcast")}
        </h1>

        <Card className="border-2 border-destructive bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
              <Badge variant="destructive">LIVE</Badge>
              <span className="font-bold">{t("सध्या कोणतीही सभा सुरू नाही", "No meeting is currently in progress")}</span>
            </div>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Video className="w-16 h-16 text-muted-foreground/40 mx-auto" />
                <p className="text-muted-foreground">{t("पुढील सभा सुरू झाल्यावर येथे लाईव्ह प्रसारण पाहता येईल", "Live broadcast will be available here when the next meeting starts")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{t("आगामी सभा", "Upcoming Meetings")}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingSabhas.map((s, i) => (
              <Card key={i}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge>{s.type}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" /> {s.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-4 h-4 text-primary" /> {t("वेळ", "Time")}: {s.time}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t("विषयपत्रिका", "Agenda")}:</p>
                    <p className="text-sm">{s.agenda}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="w-4 h-4 mr-1" /> {t("विषयपत्रिका डाउनलोड", "Download Agenda")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{t("मागील सभा रेकॉर्डिंग", "Past Meeting Recordings")}</h2>
          <div className="space-y-3">
            {pastSabhas.map((s, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-primary ml-0.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{s.type}</span>
                        <Badge variant="secondary">{s.date}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{t("विषय", "Topics")}: {s.agenda}</p>
                      <p className="text-xs text-muted-foreground">{t("कालावधी", "Duration")}: {s.duration}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-1" /> {t("पहा", "Watch")}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" /> {t("इतिवृत्त", "Minutes")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default LiveSabhaPage;
