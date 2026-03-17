import { useEffect, useState } from "react";
import {
  Building2,
  Droplets,
  FolderOpen,
  Hammer,
  Leaf,
  Lightbulb,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import { subscribeToActiveProjects, type ProjectRecord } from "@/lib/projects";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Droplets,
  Leaf,
  Lightbulb,
  Hammer,
  Zap,
  FolderOpen,
};

const Projects = () => {
  const { t, lang } = useLanguage();
  const [projects, setProjects] = useState<ProjectRecord[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsubscribe = subscribeToActiveProjects(setProjects);
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">{t("प्रकल्प", "Projects")}</h2>

        {!isFirebaseConfigured || projects.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            {!isFirebaseConfigured
              ? t(
                  "प्रकल्प दाखवण्यासाठी Firebase configure करा.",
                  "Configure Firebase to load projects."
                )
              : t(
                  "सध्या कोणतेही प्रकल्प उपलब्ध नाहीत.",
                  "No projects available right now."
                )}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((p) => {
              const Icon = iconMap[p.iconName] ?? Building2;
              return (
                <div key={p.id} className="border rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-sm mb-1">
                    {lang === "mr" ? p.titleMr : p.titleEn}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {lang === "mr" ? p.descMr : p.descEn}
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="gov-gradient h-2 rounded-full transition-all"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {p.progress}% {t("पूर्ण", "Complete")}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
