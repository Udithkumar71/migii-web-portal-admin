
import { Worker } from "@/types";
import { generateQRCode } from "@/lib/qrcode";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface WorkerIdCardProps {
  worker: Worker;
}

const WorkerIdCard = ({ worker }: WorkerIdCardProps) => {
  const handleDownload = () => {
    // In a real app, we'd generate a PDF or image for download
    console.log("Downloading ID card for:", worker.uniqueId);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-migii-primary to-migii-secondary" />
      
      <CardContent className="pt-8 px-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Migii</h2>
            <p className="text-sm text-gray-500">Worker Identification Card</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Issued on</p>
            <p className="text-sm font-medium">{formatDate(worker.createdAt)}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center mt-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-migii-light mb-4">
            <img
              src={worker.photo || "https://via.placeholder.com/150"}
              alt={worker.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-xl font-bold text-gray-800">{worker.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{worker.skill}</p>
          
          <div className="bg-migii-light w-full p-4 rounded-lg mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-500">ID Number</span>
              <span className="text-xs text-gray-500">Age</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-sm">{worker.uniqueId}</span>
              <span className="font-bold text-sm">{worker.age} years</span>
            </div>
            
            <div className="mt-3 flex justify-between mb-1">
              <span className="text-xs text-gray-500">Phone</span>
              <span className="text-xs text-gray-500">Origin State</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-sm">{worker.phone}</span>
              <span className="font-bold text-sm">{worker.originState}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center mb-4">
            <p className="text-xs text-gray-500 mb-2">Scan QR code for verification</p>
            {generateQRCode(worker.uniqueId, 120)}
          </div>
          
          <Button
            variant="outline"
            className="w-full flex items-center justify-center border-migii-primary text-migii-primary hover:bg-migii-light hover:text-migii-primary"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download ID Card
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkerIdCard;
