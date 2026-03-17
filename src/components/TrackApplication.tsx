import { useState } from "react";
import { Search, CheckCircle, Clock, AlertTriangle, LoaderCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import { getComplaintByTrackingId, formatComplaintDate, type ComplaintRecord } from "@/lib/complaints";

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-800",
  },
  "in-progress": {
    icon: AlertTriangle,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-800",
  },
  resolved: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-800",
  },
};

const TrackApplication = () => {
  const { t, lang } = useLanguage();
  const [trackingId, setTrackingId] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComplaintRecord | null | "not-found">(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const id = trackingId.trim().toUpperCase();
    if (!id.startsWith("TK-") || id.length < 5) {
      setError(t("कृपया वैध ट्रॅकिंग आयडी टाका (उदा. TK-XXXXXXXX)", "Enter a valid Tracking ID (e.g. TK-XXXXXXXX)"));
      return;
    }
    if (!/^[0-9]{10}$/.test(mobile.trim())) {
      setError(t("कृपया 10 अंकी मोबाइल नंबर टाका", "Enter a valid 10-digit mobile number"));
      return;
    }
    if (!isFirebaseConfigured) {
      setError(t("Firebase configure केलेले नाही.", "Firebase is not configured."));
      return;
    }

    try {
      setLoading(true);
      const record = await getComplaintByTrackingId(id, mobile.trim());
      setResult(record ?? "not-found");
    } catch (err) {
      console.error("Track complaint error:", err);
      setError(t("शोधताना त्रुटी आली. पुन्हा प्रयत्न करा.", "Error while searching. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const statusLabel: Record<string, string> = {
    pending: t("प्रलंबित", "Pending"),
    "in-progress": t("कार्यवाही सुरू", "In Progress"),
    resolved: t("निराकरण झाले", "Resolved"),
  };

  return (
    <section id="track" className="py-12 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-2">
          {t("अर्ज / तक्रार ट्रॅक करा", "Track Application / Complaint")}
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-8">
          {t(
            "ट्रॅकिंग आयडी आणि मोबाइल नंबर टाकून स्थिती तपासा",
            "Enter your Tracking ID and mobile number to check status"
          )}
        </p>

        <form
          onSubmit={handleSearch}
          className="max-w-xl mx-auto bg-muted rounded-2xl p-6 border shadow-sm space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("ट्रॅकिंग आयडी *", "Tracking ID *")}
            </label>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              placeholder="TK-XXXXXXXX"
              className="w-full border rounded-lg px-3 py-2 text-sm bg-background font-mono focus:ring-2 focus:ring-ring focus:outline-none uppercase"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("मोबाइल नंबर *", "Mobile Number *")}
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile"
              pattern="[0-9]{10}"
              className="w-full border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-ring focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="gov-gradient text-primary-foreground w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {loading ? t("शोधत आहे...", "Searching...") : t("स्थिती तपासा", "Check Status")}
          </button>
        </form>

        {/* Result */}
        {result === "not-found" && (
          <div className="max-w-xl mx-auto mt-6 text-center p-5 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 font-medium">
              {t("कोणतीही नोंद सापडली नाही.", "No record found.")}
            </p>
            <p className="text-sm text-red-500 mt-1">
              {t(
                "ट्रॅकिंग आयडी किंवा मोबाइल नंबर तपासा.",
                "Please verify your Tracking ID and mobile number."
              )}
            </p>
          </div>
        )}

        {result && result !== "not-found" && (() => {
          const cfg = statusConfig[result.status];
          const Icon = cfg.icon;
          return (
            <div className={`max-w-xl mx-auto mt-6 rounded-2xl border-2 p-6 ${cfg.bg} space-y-4`}>
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-6 w-6 ${cfg.color}`} />
                  <span className="font-mono font-bold text-lg">
                    TK-{result.id.slice(-6).toUpperCase()}
                  </span>
                </div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${cfg.badge}`}>
                  {statusLabel[result.status]}
                </span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">{t("नाव", "Name")}</p>
                  <p className="font-medium">{result.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">{t("वार्ड", "Ward")}</p>
                  <p className="font-medium">{result.ward ? t(`वार्ड ${result.ward}`, `Ward ${result.ward}`) : "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">{t("प्रकार", "Type")}</p>
                  <p className="font-medium">{result.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">{t("विभाग", "Department")}</p>
                  <p className="font-medium">{result.department}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground text-xs">{t("नोंदणी तारीख", "Submitted On")}</p>
                  <p className="font-medium">{formatComplaintDate(result.createdAt, lang)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground text-xs">{t("वर्णन", "Description")}</p>
                  <p className="font-medium">{result.description}</p>
                </div>
              </div>

              {/* Status timeline */}
              <div className="pt-2 border-t border-current/10">
                <p className="text-xs text-muted-foreground mb-3">{t("प्रगती", "Progress")}</p>
                <div className="flex items-center gap-0">
                  {(["pending", "in-progress", "resolved"] as const).map((s, i) => {
                    const steps = ["pending", "in-progress", "resolved"];
                    const currentIdx = steps.indexOf(result.status);
                    const done = i <= currentIdx;
                    return (
                      <div key={s} className="flex items-center flex-1">
                        <div className={`flex flex-col items-center flex-1`}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${done ? "bg-primary border-primary text-primary-foreground" : "bg-background border-muted-foreground/30 text-muted-foreground"}`}>
                            {i + 1}
                          </div>
                          <p className={`text-[10px] mt-1 text-center ${done ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                            {statusLabel[s]}
                          </p>
                        </div>
                        {i < 2 && (
                          <div className={`h-0.5 flex-1 -mt-4 ${i < currentIdx ? "bg-primary" : "bg-muted-foreground/20"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};

export default TrackApplication;
