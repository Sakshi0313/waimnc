import { useEffect, useState } from "react";
import {
  MessageSquare,
  FileText,
  FolderOpen,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import {
  subscribeToAllComplaints,
  formatComplaintDate,
  type ComplaintRecord,
} from "@/lib/complaints";
import { subscribeToActiveNotices, type NoticeRecord } from "@/lib/notices";
import { subscribeToActiveProjects, type ProjectRecord } from "@/lib/projects";

const statusColors: Record<"pending" | "in-progress" | "resolved", string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
};

const AdminDashboard = () => {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<ComplaintRecord[]>([]);
  const [notices, setNotices] = useState<NoticeRecord[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured || !user) return;
    const unsubComplaints = subscribeToAllComplaints(setComplaints);
    const unsubNotices = subscribeToActiveNotices(setNotices);
    const unsubProjects = subscribeToActiveProjects(setProjects);
    return () => {
      unsubComplaints();
      unsubNotices();
      unsubProjects();
    };
  }, [user]);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "pending").length;
  const inProgress = complaints.filter((c) => c.status === "in-progress").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  const stats = [
    { label: t("एकूण तक्रारी", "Total Complaints"), value: total, icon: MessageSquare, color: "text-primary" },
    { label: t("प्रलंबित", "Pending"), value: pending, icon: Clock, color: "text-yellow-600" },
    { label: t("कार्यवाही सुरू", "In Progress"), value: inProgress, icon: AlertTriangle, color: "text-blue-600" },
    { label: t("निराकरण झालेल्या", "Resolved"), value: resolved, icon: CheckCircle, color: "text-green-600" },
    { label: t("सक्रिय सूचना", "Active Notices"), value: notices.length, icon: FileText, color: "text-purple-600" },
    { label: t("चालू प्रकल्प", "Ongoing Projects"), value: projects.length, icon: FolderOpen, color: "text-teal-600" },
  ];

  const statusLabel: Record<"pending" | "in-progress" | "resolved", string> = {
    pending: t("प्रलंबित", "Pending"),
    "in-progress": t("कार्यवाही सुरू", "In Progress"),
    resolved: t("निराकरण", "Resolved"),
  };

  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("डॅशबोर्ड", "Dashboard")}</h1>
        <p className="text-muted-foreground">
          {t(
            "वाई नगर परिषद प्रशासकीय विहंगावलोकन",
            "Wai Municipal Council administrative overview"
          )}
        </p>
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
            {recentComplaints.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {t("सध्या कोणत्याही तक्रारी नाहीत.", "No complaints yet.")}
              </p>
            ) : (
              <div className="space-y-3">
                {recentComplaints.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{c.description}</p>
                      <p className="text-xs text-muted-foreground">
                        TK-{c.id.slice(-6).toUpperCase()} ·{" "}
                        {formatComplaintDate(c.createdAt, lang)}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${statusColors[c.status]}`}
                    >
                      {statusLabel[c.status]}
                    </span>
                  </div>
                ))}
              </div>
            )}
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
                { label: t("नवीन सूचना जोडा", "Add New Notice"), icon: FileText, href: "/admin/notices" },
                { label: t("तक्रारी पहा", "View Complaints"), icon: MessageSquare, href: "/admin/complaints" },
                { label: t("प्रकल्प व्यवस्थापन", "Manage Projects"), icon: FolderOpen, href: "/admin/projects" },
                { label: t("बातम्या जोडा", "Add News"), icon: FileText, href: "/admin/news" },
                { label: t("लाईव्ह सभा", "Live Sabha"), icon: Clock, href: "/admin/sabha" },
                { label: t("दिनक्रम", "Routine"), icon: AlertTriangle, href: "/admin/routine" },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  <action.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  {action.label}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
