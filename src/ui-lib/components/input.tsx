import React from "react";

import { cn } from "@/utils-ui-lib/classnames";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
      <input
        type={type}
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:ring-ring duration-global flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50",
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
