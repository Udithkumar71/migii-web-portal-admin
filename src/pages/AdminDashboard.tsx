
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchWorkers,
  fetchSupportRequests,
  deleteWorker,
  updateSupportRequest,
  searchWorkers,
} from "@/lib/mockApi";
import { Worker, SupportRequest } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "@/components/Loader";
import WorkerCard from "@/components/WorkerCard";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Search, Users, HelpCircle, Inbox } from "lucide-react";

const AdminDashboard = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [workersData, requestsData] = await Promise.all([
          fetchWorkers(),
          fetchSupportRequests(),
        ]);
        
        setWorkers(workersData);
        setSupportRequests(requestsData);
        
        // Generate chart data based on registration dates
        const registrationsByMonth: Record<string, number> = {};
        
        workersData.forEach(worker => {
          const date = new Date(worker.createdAt);
          const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
          
          registrationsByMonth[monthYear] = (registrationsByMonth[monthYear] || 0) + 1;
        });
        
        const chartData = Object.entries(registrationsByMonth).map(([month, count]) => ({
          month,
          registrations: count,
        }));
        
        setChartData(chartData);
        
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If search is empty, reset to full list
      const workersData = await fetchWorkers();
      setWorkers(workersData);
      return;
    }

    setLoading(true);
    try {
      const results = await searchWorkers(searchQuery);
      setWorkers(results);
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorker = async (id: string) => {
    try {
      await deleteWorker(id);
      setWorkers(workers.filter(worker => worker.id !== id));
      toast.success("Worker deleted successfully");
    } catch (error) {
      toast.error("Failed to delete worker");
    }
  };

  const handleResolveRequest = async (id: string) => {
    try {
      await updateSupportRequest(id, { 
        status: 'resolved',
        resolvedAt: new Date()
      });
      setSupportRequests(
        supportRequests.map(req =>
          req.id === id ? { ...req, status: 'resolved', resolvedAt: new Date() } : req
        )
      );
      toast.success("Support request resolved");
    } catch (error) {
      toast.error("Failed to update support request");
    }
  };

  if (loading && workers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  // Dashboard stats
  const activeWorkers = workers.filter(w => w.status === "active").length;
  const pendingWorkers = workers.filter(w => w.status === "pending").length;
  const pendingRequests = supportRequests.filter(r => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{workers.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Active Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-6 w-6 text-green-500 mr-2" />
              <div className="text-2xl font-bold">{activeWorkers}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Inbox className="h-6 w-6 text-yellow-500 mr-2" />
              <div className="text-2xl font-bold">{pendingWorkers}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Support Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <HelpCircle className="h-6 w-6 text-red-500 mr-2" />
              <div className="text-2xl font-bold">{pendingRequests}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registrations Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Worker Registrations</CardTitle>
          <CardDescription>Monthly registration trend</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="registrations"
                stroke="#6366f1"
                fill="#c7d2fe"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabs for Workers and Support */}
      <Tabs defaultValue="workers">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="workers">Workers</TabsTrigger>
          <TabsTrigger value="support">Support Requests</TabsTrigger>
        </TabsList>
        
        {/* Workers Tab */}
        <TabsContent value="workers" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name, ID, skill, state..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
          
          {loading ? (
            <div className="py-8 flex justify-center">
              <Loader size="lg" />
            </div>
          ) : workers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No workers found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workers.map(worker => (
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  onDelete={handleDeleteWorker}
                  isAdmin={true}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Support Requests Tab */}
        <TabsContent value="support">
          {supportRequests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No support requests found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {supportRequests.map(request => {
                const worker = workers.find(w => w.id === request.workerId);
                
                return (
                  <Card key={request.id} className="animate-fade-in">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {worker ? worker.name : "Worker"}
                            <span className="ml-2 text-sm font-normal text-gray-500">
                              (ID: {worker?.uniqueId || "Unknown"})
                            </span>
                          </CardTitle>
                          <CardDescription>
                            {new Date(request.createdAt).toLocaleString()}
                          </CardDescription>
                        </div>
                        <div
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{request.message}</p>
                      
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link to={`/admin/workers/${request.workerId}`}>
                            View Worker
                          </Link>
                        </Button>
                        
                        {request.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => handleResolveRequest(request.id)}
                          >
                            Mark as Resolved
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
