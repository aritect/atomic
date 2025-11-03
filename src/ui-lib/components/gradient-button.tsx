import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { Button, buttonVariants, buttonSizes } from "@/components-ui-lib/button";
import { cn } from "@/utils-ui-lib/classnames";

const gradientButtonBodyVariants = cva(
  "button-with-gradient-body",
  {
    variants: {
      size: buttonSizes,
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(({
  children, className, size, asChild = false,
}, ref) => {
  return (
    <Button
      ref={ref}
      size={size}
      variant="outline"
      asChild={asChild}
      className={cn("button-with-gradient", className)}
    >
      <div className="button-with-gradient-border" />
      <div
        className={cn(gradientButtonBodyVariants({ size, className }))}
      >
        {children}
      </div>
    </Button>
  );
},);

GradientButton.displayName = "GradientButton";

export { GradientButton };
