import { useState } from "react";
import { Lock, User, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "त्रुटी",
        description: "कृपया वापरकर्ता नाव आणि पासवर्ड टाका.",
      });
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
              <label className="text-sm font-medium">वापरकर्ता नाव</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="वापरकर्ता नाव टाका"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                  maxLength={50}
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

            <Button type="submit" className="w-full gov-gradient text-primary-foreground font-semibold h-11">
              लॉगिन करा
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
