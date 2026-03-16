import { 
  MessageSquare, FileText, Users, FolderOpen, TrendingUp, 
  AlertTriangle, CheckCircle, Clock 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const recentComplaints = [
  {
    id: "TK-284",
    subjectMr: "रस्ता खराब - वार्ड ३",
    subjectEn: "Damaged road - Ward 3",
    status: "pending" as const,
    dateMr: "12 मार्च",
    dateEn: "12 March",
  },
  {
    id: "TK-283",
    subjectMr: "पाणी पुरवठा बंद",
    subjectEn: "Water supply stopped",
    status: "in-progress" as const,
    dateMr: "11 मार्च",
    dateEn: "11 March",
  },
  {
    id: "TK-282",
    subjectMr: "स्ट्रीटलाइट बंद - गणपती पेठ",
    subjectEn: "Streetlight off - Ganpati Peth",
    status: "resolved" as const,
    dateMr: "11 मार्च",
    dateEn: "11 March",
  },
  {
    id: "TK-281",
    subjectMr: "कचरा उचलला नाही",
    subjectEn: "Garbage not collected",
    status: "pending" as const,
    dateMr: "10 मार्च",
    dateEn: "10 March",
  },
  {
    id: "TK-280",
    subjectMr: "गटार तुंबलेले",
    subjectEn: "Drainage blockage",
    status: "in-progress" as const,
    dateMr: "10 मार्च",
    dateEn: "10 March",
  },
];

const statusColors: Record<"pending" | "in-progress" | "resolved", string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
};

const AdminDashboard = () => {
  const { t, lang } = useLanguage();

  const stats = [
    { label: t("एकूण तक्रारी", "Total Complaints"), value: "284", icon: MessageSquare, color: "text-primary" },
    { label: t("प्रलंबित तक्रारी", "Pending Complaints"), value: "42", icon: Clock, color: "text-yellow-600" },
    { label: t("निराकरण झालेल्या", "Resolved Complaints"), value: "230", icon: CheckCircle, color: "text-green-600" },
    { label: t("चालू प्रकल्प", "Ongoing Projects"), value: "8", icon: FolderOpen, color: "text-blue-600" },
    { label: t("सक्रिय सूचना", "Active Notices"), value: "15", icon: FileText, color: "text-purple-600" },
    { label: t("नोंदणीकृत नागरिक", "Registered Citizens"), value: "1,240", icon: Users, color: "text-teal-600" },
  ];

  const statusLabel: Record<"pending" | "in-progress" | "resolved", string> = {
    pending: t("प्रलंबित", "Pending"),
    "in-progress": t("कार्यवाही सुरू", "In Progress"),
    resolved: t("निराकरण", "Resolved"),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("डॅशबोर्ड", "Dashboard")}</h1>
        <p className="text-muted-foreground">{t("वाई नगर परिषद प्रशासकीय विहंगावलोकन", "Wai Municipal Council administrative overview")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <stat.icon className={`h-8 w-8 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              {t("अलीकडील तक्रारी", "Recent Complaints")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentComplaints.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{lang === "mr" ? c.subjectMr : c.subjectEn}</p>
                    <p className="text-xs text-muted-foreground">{c.id} · {lang === "mr" ? c.dateMr : c.dateEn}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[c.status]}`}>
                    {statusLabel[c.status]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t("जलद कार्यवाही", "Quick Actions")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t("नवीन सूचना जोडा", "Add New Notice"), icon: FileText },
                { label: t("तक्रार निराकरण", "Resolve Complaint"), icon: CheckCircle },
                { label: t("प्रकल्प अपडेट", "Update Project"), icon: FolderOpen },
                { label: t("बातमी प्रकाशित", "Publish News"), icon: FileText },
                { label: t("सभा शेड्यूल", "Schedule Sabha"), icon: Clock },
                { label: t("दिनक्रम अपडेट", "Update Routine"), icon: Users },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors text-left text-sm"
                >
                  <action.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  {action.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
