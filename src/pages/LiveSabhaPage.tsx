import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Calendar, FileText, Download, Play, Clock, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import { subscribeToActiveSabha, type SabhaRecord } from "@/lib/sabha";

/** Convert any YouTube / youtu.be URL to an embeddable URL */
function toEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    // already an embed URL
    if (u.pathname.startsWith("/embed/")) return url;
    // youtu.be/VIDEO_ID
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      return `https://www.youtube.com/embed/${id}`;
    }
    // youtube.com/watch?v=VIDEO_ID
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;
    // youtube.com/live/VIDEO_ID
    const liveMatch = u.pathname.match(/\/live\/([^/?]+)/);
    if (liveMatch) return `https://www.youtube.com/embed/${liveMatch[1]}`;
    // youtube.com/shorts/VIDEO_ID
    const shortsMatch = u.pathname.match(/\/shorts\/([^/?]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  } catch {
    // not a valid URL — return null
  }
  return null;
}

const VideoEmbed = ({ url, title }: { url: string; title: string }) => {
  const embedUrl = toEmbedUrl(url);
  if (!embedUrl) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm">
          <ExternalLink className="w-4 h-4 mr-1" /> {title}
        </Button>
      </a>
    );
  }
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

const LiveSabhaPage = () => {
  const { lang, t } = useLanguage();
  const [items, setItems] = useState<SabhaRecord[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return subscribeToActiveSabha(setItems);
  }, []);

  const upcoming = items.filter((i) => i.type === "upcoming");
  const previous = items.filter((i) => i.type === "previous");
  const liveNow = upcoming.find((i) => i.videoUrl);

  const title = (item: SabhaRecord) => lang === "mr" ? item.titleMr : (item.titleEn || item.titleMr);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10 space-y-8">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
          <Video className="w-8 h-8" /> {t("लाईव्ह सभा प्रसारण", "Live Sabha Broadcast")}
        </h1>

        {/* Live player */}
        <Card className="border-2 border-destructive bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
              <Badge variant="destructive">LIVE</Badge>
              <span className="font-bold">
                {liveNow ? title(liveNow) : t("सध्या कोणतीही सभा सुरू नाही", "No meeting currently in progress")}
              </span>
            </div>
            {liveNow?.videoUrl ? (
              <VideoEmbed url={liveNow.videoUrl} title={title(liveNow)} />
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Video className="w-16 h-16 text-muted-foreground/40 mx-auto" />
                  <p className="text-muted-foreground text-sm">
                    {t("पुढील सभा सुरू झाल्यावर येथे लाईव्ह प्रसारण पाहता येईल", "Live broadcast will appear here when the next meeting starts")}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">{t("आगामी सभा", "Upcoming Meetings")}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {upcoming.map((s) => (
                <Card key={s.id}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge>{title(s)}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" /> {s.date}
                      </div>
                    </div>
                    {s.time && (
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4 text-primary" /> {t("वेळ", "Time")}: {s.time}
                      </div>
                    )}
                    {s.minutesBase64 && (
                      <a href={s.minutesBase64} download={s.minutesName || "agenda.pdf"}>
                        <Button variant="outline" size="sm" className="w-full">
                          <FileText className="w-4 h-4 mr-1" /> {t("विषयपत्रिका डाउनलोड", "Download Agenda")}
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Previous */}
        {previous.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">{t("मागील सभा रेकॉर्डिंग", "Past Meeting Recordings")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {previous.map((s) => (
                <Card key={s.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {s.videoUrl && <VideoEmbed url={s.videoUrl} title={title(s)} />}
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-sm">{title(s)}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" /> {s.date}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        {s.videoUrl && !toEmbedUrl(s.videoUrl) && (
                          <a href={s.videoUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline">
                              <Play className="w-4 h-4 mr-1" /> {t("पहा", "Watch")}
                            </Button>
                          </a>
                        )}
                        {s.minutesBase64 && (
                          <a href={s.minutesBase64} download={s.minutesName || "minutes.pdf"}>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" /> {t("इतिवृत्त", "Minutes")}
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {items.length === 0 && isFirebaseConfigured && (
          <p className="text-sm text-muted-foreground">{t("कोणतीही सभा माहिती उपलब्ध नाही.", "No sabha information available.")}</p>
        )}
      </div>
    </PageLayout>
  );
};

export default LiveSabhaPage;
