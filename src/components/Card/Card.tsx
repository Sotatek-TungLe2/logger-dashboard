import { cn } from "@/utils/lib";
import React from "react";



type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl bg-white/5 shadow p-2", className)} {...props} />
));
Card.displayName = "Card";

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-2", className)} {...props} />
));
CardContent.displayName = "CardContent";
