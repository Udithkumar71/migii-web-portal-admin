
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  Database, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { name: "Dashboard", icon: BarChart3, path: "/admin" },
    { name: "Workers", icon: Users, path: "/admin/workers" },
    { name: "Database", icon: Database, path: "/admin/database" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
    { name: "Support", icon: HelpCircle, path: "/admin/support" },
  ];

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!collapsed && (
          <Link to="/admin" className="text-xl font-bold text-migii-primary">
            Migii Admin
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="p-1 rounded-full"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-migii-primary text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-migii-primary",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <item.icon size={20} className={cn(collapsed ? "mx-0" : "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Actions */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          className={cn(
            "w-full flex items-center justify-center text-gray-700",
            collapsed ? "p-2" : ""
          )}
          onClick={signOut}
        >
          <LogOut size={18} className={cn(collapsed ? "mx-0" : "mr-2")} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
