
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

// Components
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import { Loader } from "./components/Loader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ClerkLoading>
        <div className="h-screen w-full flex items-center justify-center">
          <Loader size="lg" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="worker-login" element={<WorkerLoginPage />} />
              <Route path="admin-login" element={<AdminLoginPage />} />
            </Route>
            
            {/* Protected worker routes */}
            <Route
              path="/worker-dashboard"
              element={
                <SignedIn>
                  <Layout>
                    <WorkerDashboardPage />
                  </Layout>
                </SignedIn>
              }
            />
            
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
      </ClerkLoaded>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
