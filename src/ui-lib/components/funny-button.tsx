import React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils-ui-lib/classnames";

const funnyButtonSizes = {
  "default": "h-9 px-4 py-2",
  "sm": "h-8 px-3 text-xs",
  "lg": "h-10 px-8",
  "xl": "h-14 px-10 text-base",
  "lg-xl": "h-12 px-8 text-sm lg:h-14 lg:px-10 lg:text-base",
  "icon": "h-9 w-9",
};

const funnyButtonVariants = cva(
  "funny-button",
  {
    variants: {
      size: funnyButtonSizes,
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface FunnyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof funnyButtonVariants> {
  asChild?: boolean;
}

const FunnyButton = React.forwardRef<HTMLButtonElement, FunnyButtonProps>(({
  className, size, asChild = false, ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
      <Comp
        className="funny-button-wrapper"
        ref={ref}
        {...props}
      >
        <span className={cn(funnyButtonVariants({ size, className }))}>
          {props.children}
        </span>
      </Comp>
  );
},)

FunnyButton.displayName = "FunnyButton";

export { FunnyButton, funnyButtonVariants, funnyButtonSizes };
