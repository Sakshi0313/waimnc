import { useEffect, useState } from "react";
import { Play, ImageIcon, X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import { subscribeToActiveGallery, type GalleryRecord } from "@/lib/gallery";
import { subscribeToActiveRoutine, type RoutineRecord } from "@/lib/routine";
import { useLocation } from "react-router-dom";

const Gallery = () => {
  const { lang, t } = useLanguage();
  const location = useLocation();
  const defaultTab = (location.state as { tab?: string } | null)?.tab === "routine" ? "routine" : "photos";
  const [items, setItems] = useState<GalleryRecord[]>([]);
  const [routines, setRoutines] = useState<RoutineRecord[]>([]);
  const [lightbox, setLightbox] = useState<{ index: number; list: GalleryRecord[] } | null>(null);
  const [routineLightbox, setRoutineLightbox] = useState<{ index: number } | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const u1 = subscribeToActiveGallery(setItems);
    const u2 = subscribeToActiveRoutine(setRoutines);
    return () => { u1(); u2(); };
  }, []);

  const photos = items.filter((i) => i.type === "photo");
  const videos = items.filter((i) => i.type === "video");

  const openLightbox = (index: number, list: GalleryRecord[]) => setLightbox({ index, list });
  const closeLightbox = () => setLightbox(null);

  const prev = () => lightbox && setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.list.length) % lightbox.list.length });
  const next = () => lightbox && setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.list.length });

  // keyboard nav
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  // routine lightbox keyboard
  useEffect(() => {
    if (!routineLightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setRoutineLightbox((r) => r ? { index: (r.index - 1 + routines.length) % routines.length } : null);
      else if (e.key === "ArrowRight") setRoutineLightbox((r) => r ? { index: (r.index + 1) % routines.length } : null);
      else if (e.key === "Escape") setRoutineLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [routineLightbox, routines.length]);

  const active = lightbox ? lightbox.list[lightbox.index] : null;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10 space-y-6">
        <h1 className="text-3xl font-bold text-primary">{t("गॅलरी", "Gallery")}</h1>
        <Tabs defaultValue={defaultTab}>
          <TabsList>
            <TabsTrigger value="photos">{t("फोटो गॅलरी", "Photo Gallery")} ({photos.length})</TabsTrigger>
            <TabsTrigger value="videos">{t("व्हिडिओ गॅलरी", "Video Gallery")} ({videos.length})</TabsTrigger>
            <TabsTrigger value="routine">📅 {t("दैनंदिन दिनक्रम", "Daily Routines")} ({routines.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="mt-4">
            {photos.length === 0 && (
              <p className="text-sm text-muted-foreground">{t("कोणतेही फोटो उपलब्ध नाहीत.", "No photos available.")}</p>
            )}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((p, i) => (
                <Card key={p.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => openLightbox(i, photos)}>
                  <div className="aspect-video bg-primary/10 flex items-center justify-center overflow-hidden relative">
                    {p.imageBase64
                      ? <img src={p.imageBase64} alt={p.titleMr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      : <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    }
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-3 py-1 rounded-full">
                        {t("पहा", "View")}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-semibold truncate">{lang === "mr" ? p.titleMr : (p.titleEn || p.titleMr)}</p>
                    <p className="text-xs text-muted-foreground">{p.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-4">
            {videos.length === 0 && (
              <p className="text-sm text-muted-foreground">{t("कोणतेही व्हिडिओ उपलब्ध नाहीत.", "No videos available.")}</p>
            )}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {videos.map((v) => (
                <Card key={v.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => v.videoUrl && window.open(v.videoUrl, "_blank", "noopener,noreferrer")}>
                  <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                    {v.imageBase64 && <img src={v.imageBase64} alt={v.titleMr} className="w-full h-full object-cover" />}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-14 h-14 rounded-full bg-primary/80 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-semibold truncate">{lang === "mr" ? v.titleMr : (v.titleEn || v.titleMr)}</p>
                    <p className="text-xs text-muted-foreground">{v.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Daily Routines tab */}
          <TabsContent value="routine" className="mt-4">
            {routines.length === 0 && (
              <p className="text-sm text-muted-foreground">{t("कोणतेही दिनक्रम उपलब्ध नाहीत.", "No routine entries available.")}</p>
            )}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {routines.map((r, i) => (
                <Card key={r.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setRoutineLightbox({ index: i })}>
                  <div className="aspect-video bg-primary/10 flex items-center justify-center overflow-hidden relative">
                    {r.imageBase64
                      ? <img src={r.imageBase64} alt={r.titleMr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      : <Calendar className="h-10 w-10 text-muted-foreground" />
                    }
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {r.date}
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-semibold truncate">{lang === "mr" ? r.titleMr : (r.titleEn || r.titleMr)}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{lang === "mr" ? r.descMr : (r.descEn || r.descMr)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Lightbox */}
      {lightbox && active && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center" onClick={closeLightbox}>
          {/* Close */}
          <button className="absolute top-4 right-4 text-white hover:text-gray-300 z-10" onClick={closeLightbox}>
            <X className="w-8 h-8" />
          </button>

          {/* Prev */}
          {lightbox.list.length > 1 && (
            <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/40 rounded-full p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}>
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-4xl w-full px-16 flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            {active.imageBase64 && (
              <img src={active.imageBase64} alt={active.titleMr} className="max-h-[70vh] w-auto rounded-lg object-contain shadow-2xl" />
            )}
            <div className="text-center">
              <p className="text-white font-semibold text-lg">
                {lang === "mr" ? active.titleMr : (active.titleEn || active.titleMr)}
              </p>
              {active.date && <p className="text-gray-400 text-sm mt-1">{active.date}</p>}
              <p className="text-gray-500 text-xs mt-1">{lightbox.index + 1} / {lightbox.list.length}</p>
            </div>
          </div>

          {/* Next */}
          {lightbox.list.length > 1 && (
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/40 rounded-full p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}>
              <ChevronRight className="w-7 h-7" />
            </button>
          )}
        </div>
      )}
      {/* Routine Lightbox */}
      {routineLightbox && (() => {
        const r = routines[routineLightbox.index];
        const title = lang === "mr" ? r.titleMr : (r.titleEn || r.titleMr);
        const desc = lang === "mr" ? r.descMr : (r.descEn || r.descMr);
        return (
          <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4" onClick={() => setRoutineLightbox(null)}>
            <button className="absolute top-4 right-4 text-white z-10" onClick={() => setRoutineLightbox(null)}><X className="w-8 h-8" /></button>
            {routines.length > 1 && (
              <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 z-10"
                onClick={(e) => { e.stopPropagation(); setRoutineLightbox({ index: (routineLightbox.index - 1 + routines.length) % routines.length }); }}>
                <ChevronLeft className="w-7 h-7" />
              </button>
            )}
            <div className="max-w-2xl w-full flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
              {r.imageBase64 && <img src={r.imageBase64} alt={title} className="max-h-[55vh] w-auto rounded-xl object-contain shadow-2xl" />}
              <div className="text-center space-y-2 bg-black/50 rounded-xl px-6 py-4 max-w-lg w-full">
                <span className="text-xs text-primary font-semibold bg-primary/20 px-3 py-0.5 rounded-full">{r.date}</span>
                <p className="text-white font-bold text-lg">{title}</p>
                {desc && <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{desc}</p>}
                <p className="text-gray-500 text-xs">{routineLightbox.index + 1} / {routines.length}</p>
              </div>
            </div>
            {routines.length > 1 && (
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 z-10"
                onClick={(e) => { e.stopPropagation(); setRoutineLightbox({ index: (routineLightbox.index + 1) % routines.length }); }}>
                <ChevronRight className="w-7 h-7" />
              </button>
            )}
          </div>
        );
      })()}
    </PageLayout>
  );
};

export default Gallery;
