
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWorkerById, createSupportRequest } from "@/lib/mockApi";
import { Worker } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import WorkerIdCard from "@/components/WorkerIdCard";

const WorkerDashboard = () => {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [supportMessage, setSupportMessage] = useState("");
  const [submittingSupport, setSubmittingSupport] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWorkerData = async () => {
      try {
        // In a real app, we'd get the worker ID from auth context
        // For demo purposes, we're using a hardcoded ID
        const workerData = await fetchWorkerById("1");
        if (workerData) {
          setWorker(workerData);
        } else {
          toast.error("Could not find worker data");
          navigate("/worker-login");
        }
      } catch (error) {
        toast.error("Error loading worker data");
      } finally {
        setLoading(false);
      }
    };

    loadWorkerData();
  }, [navigate]);

  const handleSupportRequest = async () => {
    if (!supportMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    if (!worker) return;

    setSubmittingSupport(true);
    try {
      await createSupportRequest(worker.id, supportMessage);
      toast.success("Support request submitted successfully");
      setSupportMessage("");
    } catch (error) {
      toast.error("Failed to submit support request");
    } finally {
      setSubmittingSupport(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Worker Not Found</h2>
        <p className="text-gray-600 mb-8">We couldn't find your worker details. Please try logging in again.</p>
        <Button onClick={() => navigate("/worker-login")}>Back to Login</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Worker Dashboard</h1>
          <p className="text-gray-600">Welcome back, {worker.name}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Worker ID Card */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your ID Card</h2>
            <WorkerIdCard worker={worker} />
          </div>

          {/* Worker Information & Support */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
                <CardDescription>Your current account status and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium">
                      {worker.status === "active" ? (
                        <span className="text-green-600">Active</span>
                      ) : worker.status === "pending" ? (
                        <span className="text-yellow-600">Pending</span>
                      ) : (
                        <span className="text-red-600">Inactive</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Registered On:</span>
                    <span className="font-medium">
                      {new Date(worker.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Primary Skill:</span>
                    <span className="font-medium">{worker.skill}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Request Card */}
            <Card>
              <CardHeader>
                <CardTitle>Need Assistance?</CardTitle>
                <CardDescription>Submit a support request for any issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe your issue here..."
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  className="min-h-[120px]"
                />
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSupportRequest}
                  disabled={submittingSupport || !supportMessage.trim()}
                  className="w-full"
                >
                  {submittingSupport ? <Loader size="sm" className="mr-2" /> : null}
                  Submit Request
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
