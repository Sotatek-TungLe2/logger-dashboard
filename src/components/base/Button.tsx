import { cn } from "@/utils/lib";
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "text" | "outline" | 'primary' | 'success' | 'danger';
  size?: "xs" | "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "sm", icon, iconPosition = "left", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none",
          variant === "default" && "bg-white text-black ",
          variant === "text" && "bg-transparent text-system-content ",
          variant === "outline" && "border border-neutral bg-neutral-900 text-system-content",
          variant === "primary" && "bg-primary text-system-content ",
          variant === "success" && "bg-success text-system-content ",
          variant === "danger" && "bg-error text-system-content ",
          size === "xs" && "h-6 text-xs",
          size === "sm" && "h-8 text-sm",
          size === "md" && "h-10 text-sm",
          size === "lg" && "h-12 text-lg",
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </button>
    );
  }
);

