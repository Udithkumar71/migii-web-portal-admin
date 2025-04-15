
import { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DashboardSidebar from "./DashboardSidebar";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const showSidebar = location.pathname.includes("/admin") || location.pathname.includes("/worker-dashboard");

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full">
        {showSidebar && <DashboardSidebar />}
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pt-16">
            {children || <Outlet />}
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
