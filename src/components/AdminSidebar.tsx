import { 
  LayoutDashboard, FileText, Users, Megaphone, FolderOpen, 
  Settings, Video, Calendar, ImageIcon, MessageSquare, LogOut, Building2
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

const menuItems = [
  { title: "डॅशबोर्ड", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "सूचना व्यवस्थापन", url: "/admin/notices", icon: Megaphone },
  { title: "तक्रारी", url: "/admin/complaints", icon: MessageSquare },
  { title: "प्रकल्प", url: "/admin/projects", icon: FolderOpen },
  { title: "बातम्या", url: "/admin/news", icon: FileText },
  { title: "लाईव्ह सभा", url: "/admin/sabha", icon: Video },
  { title: "दिनक्रम", url: "/admin/routine", icon: Calendar },
  { title: "अधिकारी", url: "/admin/officials", icon: Users },
  { title: "गॅलरी", url: "/admin/gallery", icon: ImageIcon },
  { title: "सेटिंग्ज", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="p-4 flex items-center gap-3 border-b border-border">
        <div className="w-9 h-9 rounded-lg gov-gradient flex items-center justify-center flex-shrink-0">
          <Building2 className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-sm truncate">वाई नगर परिषद</p>
            <p className="text-xs text-muted-foreground truncate">प्रशासन पॅनेल</p>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>मुख्य मेनू</SidebarGroupLabel>
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
          onClick={() => navigate("/admin")}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {!collapsed && "लॉगआउट"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
