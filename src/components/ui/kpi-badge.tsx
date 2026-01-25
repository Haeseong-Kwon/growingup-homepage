import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface KpiBadgeProps {
  value: string | number;
  label: string;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "hot";
}

export function KpiBadge({ value, label, className, variant = "default" }: KpiBadgeProps) {
  const variantStyles = {
    default: "border-[var(--brand-muted)] text-[var(--brand-fg)]",
    primary: "border-[var(--brand-primary)]/30 text-[var(--brand-primary)] bg-[var(--brand-primary)]/5",
    secondary: "border-[var(--brand-secondary)]/30 text-[var(--brand-secondary)] bg-[var(--brand-secondary)]/5",
    hot: "border-[var(--brand-hot1)]/30 text-[var(--brand-hot1)] bg-[var(--brand-hot1)]/5",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-4 py-2 text-sm font-normal border transition-colors",
        variantStyles[variant],
        className
      )}
    >
      <span className="font-semibold mr-1.5">{value}</span>
      {label}
    </Badge>
  );
}
