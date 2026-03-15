import { useEffect, useState } from "react";
import { Lock, Mail, ArrowLeft, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  // Already logged in → go straight to dashboard
  useEffect(() => {
    if (user) navigate("/admin/dashboard", { replace: true });
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      toast({ title: "त्रुटी", description: "Firebase configure केलेले नाही.", variant: "destructive" });
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/admin/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      const messages: Record<string, string> = {
        "auth/user-not-found": "हा ईमेल नोंदणीकृत नाही.",
        "auth/wrong-password": "चुकीचा पासवर्ड.",
        "auth/invalid-credential": "ईमेल किंवा पासवर्ड चुकीचा आहे.",
        "auth/too-many-requests": "अनेक चुकीचे प्रयत्न. थोड्या वेळाने पुन्हा प्रयत्न करा.",
      };
      toast({
        title: "लॉगिन अयशस्वी",
        description: messages[code] ?? "काहीतरी चुकले. पुन्हा प्रयत्न करा.",
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
            <h1 className="text-2xl font-bold text-primary-foreground">प्रशासन लॉगिन</h1>
            <p className="text-primary-foreground/80 text-sm mt-1">वाई नगर परिषद प्रशासकीय पॅनेल</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">ईमेल पत्ता</label>
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
              <label className="text-sm font-medium">पासवर्ड</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="पासवर्ड टाका"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  maxLength={100}
                />
              </div>
            </div>

            <Button type="submit" className="w-full gov-gradient text-primary-foreground font-semibold h-11" disabled={loading}>
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : "लॉगिन करा"}
            </Button>

            <Link to="/" className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mt-4">
              <ArrowLeft className="h-4 w-4" /> मुख्य पृष्ठावर परत जा
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
