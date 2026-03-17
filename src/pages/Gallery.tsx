import { useEffect, useState } from "react";
import { Play, ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import { subscribeToActiveGallery, type GalleryRecord } from "@/lib/gallery";

const Gallery = () => {
  const { lang, t } = useLanguage();
  const [items, setItems] = useState<GalleryRecord[]>([]);
  const [lightbox, setLightbox] = useState<{ index: number; list: GalleryRecord[] } | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return subscribeToActiveGallery(setItems);
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

  const active = lightbox ? lightbox.list[lightbox.index] : null;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10 space-y-6">
        <h1 className="text-3xl font-bold text-primary">{t("गॅलरी", "Gallery")}</h1>
        <Tabs defaultValue="photos">
          <TabsList>
            <TabsTrigger value="photos">{t("फोटो गॅलरी", "Photo Gallery")} ({photos.length})</TabsTrigger>
            <TabsTrigger value="videos">{t("व्हिडिओ गॅलरी", "Video Gallery")} ({videos.length})</TabsTrigger>
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
    </PageLayout>
  );
};

export default Gallery;
