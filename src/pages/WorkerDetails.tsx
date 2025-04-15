
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWorkerById, updateWorker } from "@/lib/mockApi";
import { Worker } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import WorkerIdCard from "@/components/WorkerIdCard";
import { ArrowLeft, Edit, Save } from "lucide-react";

const WorkerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<"active" | "inactive" | "pending">("active");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWorker = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const workerData = await fetchWorkerById(id);
        if (workerData) {
          setWorker(workerData);
          setStatus(workerData.status);
        } else {
          toast.error("Worker not found");
          navigate("/admin");
        }
      } catch (error) {
        toast.error("Failed to load worker details");
      } finally {
        setLoading(false);
      }
    };

    loadWorker();
  }, [id, navigate]);

  const handleStatusChange = async () => {
    if (!worker) return;

    setSaving(true);
    try {
      const updatedWorker = await updateWorker(worker.id, { status });
      if (updatedWorker) {
        setWorker(updatedWorker);
        toast.success("Worker status updated successfully");
        setEditMode(false);
      }
    } catch (error) {
      toast.error("Failed to update worker status");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Worker Not Found</h2>
        <p className="text-gray-600 mb-8">The worker you are looking for does not exist.</p>
        <Button onClick={() => navigate("/admin")}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate("/admin")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Worker Details</h1>
        </div>
        
        {!editMode ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={() => setEditMode(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <Button 
            size="sm" 
            className="flex items-center"
            onClick={handleStatusChange}
            disabled={saving}
          >
            {saving ? <Loader size="sm" className="mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <WorkerIdCard worker={worker} />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Worker Information</CardTitle>
              <CardDescription>Personal details and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{worker.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{worker.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{worker.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">State of Origin</p>
                  <p className="font-medium">{worker.originState}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Skill</p>
                  <p className="font-medium">{worker.skill}</p>
                </div>
                {worker.aadhaar && (
                  <div>
                    <p className="text-sm text-gray-500">Aadhaar Number</p>
                    <p className="font-medium">{worker.aadhaar}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Unique ID</p>
                  <p className="font-medium">{worker.uniqueId}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <p className="text-sm text-gray-500 mb-2">Status</p>
                {editMode ? (
                  <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div
                    className={`px-3 py-2 text-sm font-medium rounded-md inline-block ${
                      worker.status === "active"
                        ? "bg-green-100 text-green-800"
                        : worker.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registration Information</CardTitle>
              <CardDescription>Details about worker registration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Registration Date:</span>
                  <span className="font-medium">
                    {new Date(worker.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Registration Time:</span>
                  <span className="font-medium">
                    {new Date(worker.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;
