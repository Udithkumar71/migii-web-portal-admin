
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Worker } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WorkerCardProps {
  worker: Worker;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

const WorkerCard = ({ worker, onDelete, isAdmin = false }: WorkerCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  const handleDelete = () => {
    onDelete?.(worker.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300 animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{worker.name}</CardTitle>
            <CardDescription>{worker.skill}</CardDescription>
          </div>
          <Badge className={cn(statusColors[worker.status])}>
            {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={worker.photo || "https://via.placeholder.com/150"}
              alt={worker.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Age: {worker.age} | Origin: {worker.originState}
            </p>
            <p className="text-sm font-medium">ID: {worker.uniqueId}</p>
            <p className="text-sm text-gray-600">
              Phone: {worker.phone}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isAdmin ? (
          <div className="flex space-x-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <Link to={`/admin/workers/${worker.id}`}>
                <Eye className="h-4 w-4 mr-1" /> View
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <Link to={`/admin/workers/${worker.id}/edit`}>
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Link>
            </Button>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    worker record for {worker.name}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <Button asChild className="w-full">
            <Link to={`/worker/${worker.id}`}>
              View Details
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkerCard;
