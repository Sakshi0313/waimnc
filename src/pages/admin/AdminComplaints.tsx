import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertTriangle, Eye } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Complaint {
  id: string;
  nameMr: string;
  nameEn: string;
  mobile: string;
  typeMr: string;
  typeEn: string;
  departmentMr: string;
  departmentEn: string;
  descriptionMr: string;
  descriptionEn: string;
  dateMr: string;
  dateEn: string;
  status: "pending" | "in-progress" | "resolved";
}

const initialComplaints: Complaint[] = [
  { id: "TK-284", nameMr: "राजेश पाटील", nameEn: "Rajesh Patil", mobile: "98765xxxxx", typeMr: "रस्ता", typeEn: "Road", departmentMr: "बांधकाम", departmentEn: "Construction", descriptionMr: "वार्ड ३ मधील रस्ता खूप खराब आहे.", descriptionEn: "Road condition is very poor in Ward 3.", dateMr: "12 मार्च 2026", dateEn: "12 March 2026", status: "pending" },
  { id: "TK-283", nameMr: "सुनीता जाधव", nameEn: "Sunita Jadhav", mobile: "98234xxxxx", typeMr: "पाणी", typeEn: "Water", departmentMr: "पाणी पुरवठा", departmentEn: "Water Supply", descriptionMr: "गेल्या 3 दिवसांपासून पाणी येत नाही.", descriptionEn: "No water supply for the last 3 days.", dateMr: "11 मार्च 2026", dateEn: "11 March 2026", status: "in-progress" },
  { id: "TK-282", nameMr: "अमित शिंदे", nameEn: "Amit Shinde", mobile: "97654xxxxx", typeMr: "दिवाबत्ती", typeEn: "Streetlight", departmentMr: "दिवाबत्ती", departmentEn: "Lighting", descriptionMr: "गणपती पेठ स्ट्रीटलाइट बंद.", descriptionEn: "Streetlight in Ganpati Peth is not working.", dateMr: "11 मार्च 2026", dateEn: "11 March 2026", status: "resolved" },
  { id: "TK-281", nameMr: "प्रिया कुलकर्णी", nameEn: "Priya Kulkarni", mobile: "99876xxxxx", typeMr: "कचरा", typeEn: "Garbage", departmentMr: "आरोग्य", departmentEn: "Health", descriptionMr: "कचरा 4 दिवसांपासून उचलला नाही.", descriptionEn: "Garbage has not been collected for 4 days.", dateMr: "10 मार्च 2026", dateEn: "10 March 2026", status: "pending" },
];

const statusColors: Record<Complaint["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
};

const statusIcons: Record<Complaint["status"], typeof Clock> = {
  pending: Clock,
  "in-progress": AlertTriangle,
  resolved: CheckCircle,
};

const AdminComplaints = () => {
  const { t, lang } = useLanguage();
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [selected, setSelected] = useState<Complaint | null>(null);

  const statusLabel: Record<Complaint["status"], string> = {
    pending: t("प्रलंबित", "Pending"),
    "in-progress": t("कार्यवाही सुरू", "In Progress"),
    resolved: t("निराकरण", "Resolved"),
  };

  const updateStatus = (id: string, status: Complaint["status"]) => {
    setComplaints(complaints.map((c) => (c.id === id ? { ...c, status } : c)));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("तक्रार व्यवस्थापन", "Complaint Management")}</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {(["pending", "in-progress", "resolved"] as const).map((status) => {
          const count = complaints.filter((c) => c.status === status).length;
          const Icon = statusIcons[status];
          return (
            <Card key={status}>
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`h-8 w-8 ${status === "pending" ? "text-yellow-600" : status === "in-progress" ? "text-blue-600" : "text-green-600"}`} />
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{statusLabel[status]}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {complaints.map((c) => (
            <Card key={c.id} className={`cursor-pointer transition-all ${selected?.id === c.id ? "ring-2 ring-primary" : "hover:shadow-md"}`} onClick={() => setSelected(c)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-muted-foreground">{c.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[c.status]}`}>{statusLabel[c.status]}</span>
                </div>
                <p className="font-medium text-sm">{lang === "mr" ? c.descriptionMr : c.descriptionEn}</p>
                <p className="text-xs text-muted-foreground mt-1">{lang === "mr" ? c.nameMr : c.nameEn} · {lang === "mr" ? c.dateMr : c.dateEn}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selected && (
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" /> {t("तक्रार तपशील", "Complaint Details")} — {selected.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">{t("नाव", "Name")}:</span> <br/>{lang === "mr" ? selected.nameMr : selected.nameEn}</div>
                <div><span className="text-muted-foreground">{t("मोबाइल", "Mobile")}:</span> <br/>{selected.mobile}</div>
                <div><span className="text-muted-foreground">{t("प्रकार", "Type")}:</span> <br/>{lang === "mr" ? selected.typeMr : selected.typeEn}</div>
                <div><span className="text-muted-foreground">{t("विभाग", "Department")}:</span> <br/>{lang === "mr" ? selected.departmentMr : selected.departmentEn}</div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">{t("वर्णन", "Description")}:</span>
                <p className="mt-1">{lang === "mr" ? selected.descriptionMr : selected.descriptionEn}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700" onClick={() => updateStatus(selected.id, "pending")}>{t("प्रलंबित", "Pending")}</Button>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700" onClick={() => updateStatus(selected.id, "in-progress")}>{t("कार्यवाही सुरू", "In Progress")}</Button>
                <Button size="sm" className="bg-green-600 text-primary-foreground hover:bg-green-700" onClick={() => updateStatus(selected.id, "resolved")}>{t("निराकरण", "Resolved")}</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminComplaints;
