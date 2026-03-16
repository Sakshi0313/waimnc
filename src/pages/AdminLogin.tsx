import { useEffect, useState } from "react";
import { Lock, Mail, ArrowLeft, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { t } = useLanguage();

  // Already logged in → go straight to dashboard
  useEffect(() => {
    if (user) navigate("/admin/dashboard", { replace: true });
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      toast({ title: t("त्रुटी", "Error"), description: t("Firebase configure केलेले नाही.", "Firebase is not configured."), variant: "destructive" });
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/admin/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      const messages: Record<string, string> = {
        "auth/user-not-found": t("हा ईमेल नोंदणीकृत नाही.", "This email is not registered."),
        "auth/wrong-password": t("चुकीचा पासवर्ड.", "Incorrect password."),
        "auth/invalid-credential": t("ईमेल किंवा पासवर्ड चुकीचा आहे.", "Email or password is incorrect."),
        "auth/too-many-requests": t("अनेक चुकीचे प्रयत्न. थोड्या वेळाने पुन्हा प्रयत्न करा.", "Too many failed attempts. Please try again later."),
      };
      toast({
        title: t("लॉगिन अयशस्वी", "Login Failed"),
        description: messages[code] ?? t("काहीतरी चुकले. पुन्हा प्रयत्न करा.", "Something went wrong. Please try again."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 font-devanagari">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
          {/* Header */}
          <div className="gov-gradient p-6 text-center">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full mx-auto flex items-center justify-center mb-3">
              <Lock className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary-foreground">{t("प्रशासन लॉगिन", "Admin Login")}</h1>
            <p className="text-primary-foreground/80 text-sm mt-1">{t("वाई नगर परिषद प्रशासकीय पॅनेल", "Wai Municipal Council Admin Panel")}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("ईमेल पत्ता", "Email Address")}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  maxLength={254}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("पासवर्ड", "Password")}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder={t("पासवर्ड टाका", "Enter password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  maxLength={100}
                />
              </div>
            </div>

            <Button type="submit" className="w-full gov-gradient text-primary-foreground font-semibold h-11" disabled={loading}>
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : t("लॉगिन करा", "Login")}
            </Button>

            <Link to="/" className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mt-4">
              <ArrowLeft className="h-4 w-4" /> {t("मुख्य पृष्ठावर परत जा", "Back to Home")}
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
