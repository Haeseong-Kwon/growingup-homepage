import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "fluid" | "offset" | "narrow";
}

export function Container({ children, className, variant = "default" }: ContainerProps) {
  return (
    <div
      className={cn(
        // Base styles always applied? Using CSS classes from globals for logic
        variant === "default" && "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8", // Updated max-width
        variant === "fluid" && "container-fluid",
        variant === "offset" && "container-offset",
        variant === "narrow" && "mx-auto w-full max-w-[1000px] px-4 sm:px-6",
        className
      )}
    >
      {children}
    </div>
  );
}
