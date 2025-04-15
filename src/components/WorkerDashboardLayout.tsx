
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const WorkerDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-gray-50">
        {/* Animated Sidebar */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ width: sidebarOpen ? "250px" : "0px", opacity: sidebarOpen ? 1 : 0 }}
            animate={{ width: sidebarOpen ? "250px" : "0px", opacity: sidebarOpen ? 1 : 0 }}
            exit={{ width: "0px", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 left-0 bottom-0 z-20 bg-white shadow-lg overflow-hidden`}
          >
            <DashboardSidebar />
          </motion.div>
        </AnimatePresence>
        
        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-[250px]' : 'ml-0'}`}>
          <Navbar 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
            sidebarOpen={sidebarOpen} 
          />
          <main className="flex-1 p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default WorkerDashboardLayout;
