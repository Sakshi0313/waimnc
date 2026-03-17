import { useEffect, useState } from "react";
import { ExternalLink, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { subscribeToActiveSchemes, type SchemeRecord, type SchemeCategory } from "@/lib/schemes";

const CATEGORIES: { value: SchemeCategory; labelMr: string; labelEn: string; color: string }[] = [
  { value: "central", labelMr: "केंद्र सरकार योजना", labelEn: "Central Govt Schemes", color: "bg-blue-600" },
  { value: "state", labelMr: "राज्य सरकार योजना", labelEn: "State Govt Schemes", color: "bg-orange-500" },
  { value: "local", labelMr: "स्थानिक योजना", labelEn: "Local Schemes", color: "bg-green-600" },
  { value: "other", labelMr: "इतर योजना", labelEn: "Other Schemes", color: "bg-gray-500" },
];

const SchemesPage = () => {
  const { t, language } = useLanguage();
  const [schemes, setSchemes] = useState<SchemeRecord[]>([]);

  useEffect(() => subscribeToActiveSchemes(setSchemes), []);

  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: schemes.filter((s) => s.category === cat.value),
  })).filter((g) => g.items.length > 0);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{t("सरकारी योजना", "Government Schemes")}</h1>
        <p className="text-muted-foreground mb-8">{t("केंद्र, राज्य व स्थानिक सरकारच्या योजना", "Central, State & Local Government Schemes")}</p>

        {grouped.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>{t("कोणत्याही योजना उपलब्ध नाहीत.", "No schemes available yet.")}</p>
          </div>
        )}

        {grouped.map((group) => (
          <div key={group.value} className="mb-10">
            <div className={`inline-block px-4 py-1.5 rounded-full text-white text-sm font-semibold mb-4 ${group.color}`}>
              {t(group.labelMr, group.labelEn)}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.items.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} language={language} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

function SchemeCard({ scheme, language, t }: { scheme: SchemeRecord; language: string; t: (mr: string, en: string) => string }) {
  const [expanded, setExpanded] = useState(false);
  const title = language === "mr" ? scheme.titleMr : (scheme.titleEn || scheme.titleMr);
  const desc = language === "mr" ? scheme.descMr : (scheme.descEn || scheme.descMr);
  const eligibility = language === "mr" ? scheme.eligibilityMr : (scheme.eligibilityEn || scheme.eligibilityMr);
  const benefits = language === "mr" ? scheme.benefitsMr : (scheme.benefitsEn || scheme.benefitsMr);

  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow">
      {scheme.imageBase64 && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img src={scheme.imageBase64} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <CardContent className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-base mb-2">{title}</h3>
        {desc && <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{desc}</p>}

        {expanded && (
          <div className="space-y-3 mb-3">
            {eligibility && (
              <div>
                <p className="text-xs font-semibold text-primary mb-1">{t("पात्रता", "Eligibility")}</p>
                <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                  {eligibility.split("\n").filter(Boolean).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
            {benefits && (
              <div>
                <p className="text-xs font-semibold text-primary mb-1">{t("फायदे", "Benefits")}</p>
                <p className="text-xs text-muted-foreground">{benefits}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-2">
          {(eligibility || benefits) && (
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={() => setExpanded((v) => !v)}>
              {expanded ? t("कमी दाखवा", "Show less") : t("अधिक माहिती", "More info")}
            </Button>
          )}
          {scheme.externalUrl && (
            <a href={scheme.externalUrl} target="_blank" rel="noopener noreferrer" className="ml-auto">
              <Button size="sm" className="h-7 text-xs gap-1">
                <ExternalLink className="h-3 w-3" />
                {t("अर्ज करा", "Apply")}
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SchemesPage;
