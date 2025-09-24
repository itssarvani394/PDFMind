import { motion } from "framer-motion";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EnhancedButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "glow";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

export function EnhancedButton({ 
  children, 
  className, 
  variant = "default",
  size = "md",
  disabled = false,
  onClick 
}: EnhancedButtonProps) {
  const baseClasses = "font-semibold transition-all duration-300";
  
  const variantClasses = {
    default: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    gradient: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl",
    glow: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl btn-glow"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </motion.div>
  );
}
