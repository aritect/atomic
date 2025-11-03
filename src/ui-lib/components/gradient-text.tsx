import React, { type FC, type ReactNode } from "react";

import { cn } from "@/utils-ui-lib/classnames";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

const GradientText: FC<GradientTextProps> = ({ children, className }) => (
    <span
      className={cn(
        "bg-gradient-main-dark dark:bg-gradient-main-light inline-block bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
);

export { GradientText };
