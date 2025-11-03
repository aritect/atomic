import React from "react";

import { cn } from "@/utils-ui-lib/classnames";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn("bg-primary/10 animate-pulse rounded-lg", className)}
      {...props}
    />
);

export { Skeleton };
