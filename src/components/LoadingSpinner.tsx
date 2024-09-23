import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function LoadingSpinner({
  className,
  size,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        `w-8 h-8 rounded-full animate-spin border-2 border-solid border-muted border-t-primary ${className}`
      )}
    ></div>
  );
}

