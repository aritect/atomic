import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils-ui-lib/classnames";

const badgeVariants = cva(
  "inline-flex items-center rounded-full whitespace-nowrap px-3 py-1 text-xs font-medium transition-colors duration-global focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        "outline-default":
          "border border-border bg-transparent text-foreground",
        "outline-neutral":
          "border border-neutral-highlight bg-transparent text-neutral",
        "outline-warning":
          "border border-warning-highlight bg-transparent text-warning",
        "outline-destructive":
          "border border-destructive-highlight bg-transparent text-destructive",
        "outline-positive":
          "border border-positive-highlight bg-transparent text-positive",
        "outline-default-rounded":
          "border border-border bg-transparent text-foreground rounded-full",
        "outline-neutral-rounded":
          "border border-neutral-highlight bg-transparent text-neutral rounded-full",
        "outline-warning-rounded":
          "border border-warning-highlight bg-transparent text-warning rounded-full",
        "outline-destructive-rounded":
          "border border-destructive-highlight bg-transparent text-destructive rounded-full",
        "outline-positive-rounded":
          "border border-positive-highlight bg-transparent text-positive rounded-full",
        "default":
          "bg-foreground text-background",
        neutral:
          "bg-neutral text-neutral-foreground",
        warning:
          "bg-warning text-warning-foreground",
        destructive:
          "bg-destructive text-destructive-foreground",
        positive:
          "bg-positive text-positive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
);

type BadgeVariant = BadgeProps["variant"];

export { Badge, badgeVariants, type BadgeVariant };
