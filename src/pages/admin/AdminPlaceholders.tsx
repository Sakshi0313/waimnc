import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

const AdminPlaceholder = ({ title }: { title: string }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">{title}</h1>
    <Card>
      <CardContent className="p-12 flex flex-col items-center justify-center text-center">
        <Construction className="h-16 w-16 text-muted-foreground/40 mb-4" />
        <h2 className="text-lg font-semibold text-muted-foreground">हे वैशिष्ट्य लवकरच उपलब्ध होईल</h2>
        <p className="text-sm text-muted-foreground mt-1">या विभागावर काम सुरू आहे.</p>
      </CardContent>
    </Card>
  </div>
);

export const AdminProjects = () => <AdminPlaceholder title="प्रकल्प व्यवस्थापन" />;
export const AdminNews = () => <AdminPlaceholder title="बातम्या व्यवस्थापन" />;
export const AdminSabha = () => <AdminPlaceholder title="लाईव्ह सभा व्यवस्थापन" />;
export const AdminRoutine = () => <AdminPlaceholder title="दिनक्रम व्यवस्थापन" />;
export const AdminOfficials = () => <AdminPlaceholder title="अधिकारी व्यवस्थापन" />;
export const AdminGallery = () => <AdminPlaceholder title="गॅलरी व्यवस्थापन" />;
export const AdminSettings = () => <AdminPlaceholder title="सेटिंग्ज" />;
