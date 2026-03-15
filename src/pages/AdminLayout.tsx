import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full font-devanagari">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <span className="font-semibold text-sm text-muted-foreground">प्रशासकीय पॅनेल</span>
            </div>
            <div className="flex items-center gap-3">
              {user && <span className="text-xs text-muted-foreground hidden sm:block">{user.email}</span>}
              <Button size="sm" variant="ghost" onClick={handleLogout} className="gap-1">
                <LogOut className="h-4 w-4" /> बाहेर पडा
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 bg-muted/30 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
