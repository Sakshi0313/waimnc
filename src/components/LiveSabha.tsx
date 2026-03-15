import { Video, Calendar, FileText, Download } from "lucide-react";

const upcomingSabha = [
  { date: "15 मार्च 2026", time: "सकाळी 11:00", topic: "अर्थसंकल्प सभा" },
  { date: "22 मार्च 2026", time: "दुपारी 2:00", topic: "विशेष सर्वसाधारण सभा" },
];

const previousSabha = [
  { date: "8 मार्च 2026", topic: "सर्वसाधारण सभा", minutes: true },
  { date: "1 मार्च 2026", topic: "स्थायी समिती सभा", minutes: true },
  { date: "20 फेब्रुवारी 2026", topic: "विशेष सभा", minutes: true },
];

const LiveSabha = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">🎥 लाईव्ह सभा प्रसारण</h2>
        <p className="text-center text-muted-foreground mb-8">नगरपालिका सभांचे थेट प्रसारण पहा</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Live Stream */}
          <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
            <div className="relative aspect-video bg-foreground/90 flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold">आजची सभा</p>
                <p className="text-sm opacity-75">दिनांक: 12 मार्च 2026 | वेळ: सकाळी 11:00</p>
                <button className="mt-4 gov-gradient px-6 py-2 rounded-lg text-primary-foreground font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                  LIVE पहा
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">📅 आगामी सभा</h3>
              <div className="space-y-2">
                {upcomingSabha.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-muted rounded-lg text-sm">
                    <div>
                      <span className="font-medium">{s.date}</span> — {s.topic}
                    </div>
                    <span className="text-muted-foreground">{s.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Previous recordings & minutes */}
          <div className="bg-card rounded-xl shadow-md border border-border p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              मागील सभांचे रेकॉर्डिंग
            </h3>
            <div className="space-y-3">
              {previousSabha.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{s.topic}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {s.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md hover:bg-secondary/80 transition-colors flex items-center gap-1">
                      <Video className="h-3 w-3" /> पहा
                    </button>
                    {s.minutes && (
                      <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1">
                        <Download className="h-3 w-3" /> इतिवृत्त
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-accent rounded-lg">
              <h4 className="font-semibold text-accent-foreground mb-2">📄 सभेचा कार्यक्रम पत्रिका</h4>
              <p className="text-sm text-muted-foreground mb-3">पुढील सभेची कार्यक्रम पत्रिका डाउनलोड करा</p>
              <button className="text-sm gov-gradient text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center gap-1">
                <Download className="h-4 w-4" /> डाउनलोड करा
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveSabha;
