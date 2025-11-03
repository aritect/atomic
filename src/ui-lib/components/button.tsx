import React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils-ui-lib/classnames";

const buttonSizes = {
  "default": "h-9 px-4 py-3",
  "sm": "h-8 rounded-md px-3 text-xs",
  "lg": "h-10 rounded-md px-8",
  "xl": "h-14 rounded-md px-10 text-base",
  "lg-xl": "h-12 rounded-md px-8 text-sm lg:h-14 lg:rounded-md lg:px-10 lg:text-base",
  "icon": "h-9 w-9",
};

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md text-sm font-medium transition-colors duration-global focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        "default":
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        positive:
          "bg-positive text-positive-foreground shadow-sm hover:bg-positive/90",
        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning/90",
        neutral:
          "bg-neutral text-neutral-foreground shadow-sm hover:bg-neutral/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      rounded: {
        "default": "rounded-md",
        "full": "rounded-full",
      },
      size: buttonSizes,
    },
    defaultVariants: {
      variant: "default",
      rounded: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className, variant, size, rounded, asChild = false, ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
  );
},);

Button.displayName = "Button";

export { Button, buttonVariants, buttonSizes };
