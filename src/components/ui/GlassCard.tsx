import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  noPad?: boolean;
}

export function GlassCard({ className, noPad, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-card-h",
        !noPad && "p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
