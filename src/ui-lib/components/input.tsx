import React from "react";

import { cn } from "@/utils-ui-lib/classnames";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full border bg-transparent px-3 py-1 text-sm transition-colors duration-global file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&:-webkit-autofill]:!bg-transparent [&:-webkit-autofill]:!bg-none [&:-webkit-autofill]:!shadow-none",
          props["aria-invalid"]
            && "border-destructive-flashlight placeholder:text-destructive-flashlight text-destructive-flashlight focus-visible:border-destructive-ring focus-visible:ring-destructive-ring",
          className,
        )}
        ref={ref}
        {...props}
      />
),);

Input.displayName = "Input";

export { Input };
