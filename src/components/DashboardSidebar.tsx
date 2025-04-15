
import { useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Settings, 
  HelpCircle, 
  Home 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const DashboardSidebar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  const adminItems = [
    { title: "Dashboard", icon: BarChart3, path: "/admin" },
    { title: "Workers", icon: Users, path: "/admin/workers" },
    { title: "Settings", icon: Settings, path: "/admin/settings" },
    { title: "Support", icon: HelpCircle, path: "/admin/support" },
  ];

  const workerItems = [
    { title: "Home", icon: Home, path: "/worker-dashboard" },
    { title: "Profile", icon: Users, path: "/worker-dashboard/profile" },
    { title: "Settings", icon: Settings, path: "/worker-dashboard/settings" },
    { title: "Help", icon: HelpCircle, path: "/worker-dashboard/help" },
  ];

  const items = isAdmin ? adminItems : workerItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{isAdmin ? "Admin" : "Worker"} Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.path}
                      className={location.pathname === item.path ? "bg-migii-primary text-white" : ""}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
