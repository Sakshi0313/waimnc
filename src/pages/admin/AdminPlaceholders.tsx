import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminPlaceholder = ({ titleMr, titleEn }: { titleMr: string; titleEn: string }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t(titleMr, titleEn)}</h1>
      <Card>
        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
          <Construction className="h-16 w-16 text-muted-foreground/40 mb-4" />
          <h2 className="text-lg font-semibold text-muted-foreground">{t("हे वैशिष्ट्य लवकरच उपलब्ध होईल", "This feature will be available soon")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("या विभागावर काम सुरू आहे.", "Work on this section is in progress.")}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export const AdminSabha = () => <AdminPlaceholder titleMr="लाईव्ह सभा व्यवस्थापन" titleEn="Live Sabha Management" />;
export const AdminRoutine = () => <AdminPlaceholder titleMr="दिनक्रम व्यवस्थापन" titleEn="Routine Management" />;
export const AdminOfficials = () => <AdminPlaceholder titleMr="अधिकारी व्यवस्थापन" titleEn="Officials Management" />;
export const AdminGallery = () => <AdminPlaceholder titleMr="गॅलरी व्यवस्थापन" titleEn="Gallery Management" />;
export const AdminSettings = () => <AdminPlaceholder titleMr="सेटिंग्ज" titleEn="Settings" />;
