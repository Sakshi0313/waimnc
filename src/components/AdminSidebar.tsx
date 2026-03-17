import { 
  LayoutDashboard, FileText, Users, Megaphone, FolderOpen, 
  Settings, Video, Calendar, ImageIcon, MessageSquare, LogOut, Building2, BookOpen
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  const menuItems = [
    { title: t("डॅशबोर्ड", "Dashboard"), url: "/admin/dashboard", icon: LayoutDashboard },
    { title: t("सूचना व्यवस्थापन", "Notice Management"), url: "/admin/notices", icon: Megaphone },
    { title: t("तक्रारी", "Complaints"), url: "/admin/complaints", icon: MessageSquare },
    { title: t("प्रकल्प", "Projects"), url: "/admin/projects", icon: FolderOpen },
    { title: t("बातम्या", "News"), url: "/admin/news", icon: FileText },
    { title: t("लाईव्ह सभा", "Live Sabha"), url: "/admin/sabha", icon: Video },
    { title: t("दिनक्रम", "Routine"), url: "/admin/routine", icon: Calendar },
    { title: t("अधिकारी", "Officials"), url: "/admin/officials", icon: Users },
    { title: t("गॅलरी", "Gallery"), url: "/admin/gallery", icon: ImageIcon },
    { title: t("योजना", "Schemes"), url: "/admin/schemes", icon: BookOpen },
    { title: t("सेटिंग्ज", "Settings"), url: "/admin/settings", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="p-4 flex items-center gap-3 border-b border-border">
        <div className="w-9 h-9 rounded-lg gov-gradient flex items-center justify-center flex-shrink-0">
          <Building2 className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-sm truncate">{t("वाई नगर परिषद", "Wai Municipal Council")}</p>
            <p className="text-xs text-muted-foreground truncate">{t("प्रशासन पॅनेल", "Admin Panel")}</p>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("मुख्य मेनू", "Main Menu")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {!collapsed && t("लॉगआउट", "Logout")}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
