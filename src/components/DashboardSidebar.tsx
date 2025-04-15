
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Settings, 
  HelpCircle, 
  Home,
  User,
  LogOut
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator
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
    { title: "Profile", icon: User, path: "/worker-dashboard/profile" },
    { title: "Settings", icon: Settings, path: "/worker-dashboard/settings" },
    { title: "Help", icon: HelpCircle, path: "/worker-dashboard/help" },
  ];

  const items = isAdmin ? adminItems : workerItems;

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 flex items-center">
          <div className="h-10 w-10 rounded-full bg-migii-primary flex items-center justify-center text-white font-bold text-xl">
            {isAdmin ? 'A' : 'W'}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold">{isAdmin ? "Admin" : "Worker"} Portal</h3>
            <p className="text-xs text-gray-500">Welcome back</p>
          </div>
        </div>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
              >
                {items.map((item) => (
                  <motion.div key={item.title} variants={itemVariants}>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link 
                          to={item.path}
                          className={`transition-all duration-300 ${location.pathname === item.path ? "bg-migii-primary text-white" : ""}`}
                        >
                          <item.icon size={18} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </motion.div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/"
                    className="text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
