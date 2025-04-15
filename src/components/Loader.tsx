
import { cn } from "@/lib/utils";

type LoaderProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const Loader = ({ size = "md", className }: LoaderProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div
        className={cn(
          "border-t-4 border-primary border-solid rounded-full animate-spin",
          sizeClasses[size]
        )}
      />
    </div>
  );
};
