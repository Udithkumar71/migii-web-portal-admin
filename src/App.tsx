
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn,
  ClerkLoaded,
  ClerkLoading 
} from "@clerk/clerk-react";

// Pages
import HomePage from "./pages/Index";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/Register";
import WorkerLoginPage from "./pages/WorkerLogin";
import WorkerDashboardPage from "./pages/WorkerDashboard";
import AdminLoginPage from "./pages/AdminLogin";
import AdminDashboardPage from "./pages/AdminDashboard";
import WorkerDetailsPage from "./pages/WorkerDetails";
import RegistrationSuccess from "./pages/RegistrationSuccess";

// Components
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import WorkerDashboardLayout from "./components/WorkerDashboardLayout";
import { Loader } from "./components/Loader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="registration-success" element={<RegistrationSuccess />} />
            <Route path="worker-login" element={<WorkerLoginPage />} />
            <Route path="admin-login" element={<AdminLoginPage />} />
          </Route>
          
          {/* Protected worker routes */}
          <Route
            path="/worker-dashboard"
            element={<WorkerDashboardLayout />}
          >
            <Route index element={<WorkerDashboardPage />} />
            <Route path="profile" element={<div>Profile Page</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
            <Route path="help" element={<div>Help Page</div>} />
          </Route>
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route 
              index 
              element={
                <SignedIn>
                  <AdminDashboardPage />
                </SignedIn>
              } 
            />
            <Route 
              path="workers/:id" 
              element={
                <SignedIn>
                  <WorkerDetailsPage />
                </SignedIn>
              } 
            />
          </Route>
          
          {/* Not found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
