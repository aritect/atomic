import React from "react";

import { cn } from "@/utils-ui-lib/classnames";

interface StepsProps {
  className?: string;
  children: React.ReactNode;
}

const Steps = ({ className, children }: StepsProps) => (
    <div
      className={cn(
        "border-l-border ml-4 mt-5 border-l pl-8 [counter-reset:step] md:ml-0",
        className,
      )}
    >
      {children}
    </div>
);

interface StepTitleProps {
  className?: string;
  children: React.ReactNode;
}

const StepTitle = ({ className, children }: StepTitleProps) => (
    <h3
      className={cn(
        "step text-foreground -mb-1 mt-9 text-base font-medium leading-7 first:mt-0",
        className,
      )}
    >
      {children}
    </h3>
);

interface StepContentProps {
  className?: string;
  children: React.ReactNode;
}

const StepContent = ({ className, children }: StepContentProps) => (
  <div className={cn("mt-5", className)}>{children}</div>
);

export { Steps, StepTitle, StepContent };
