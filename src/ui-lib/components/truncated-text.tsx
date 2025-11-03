import React, { type FC, type PropsWithChildren, useRef } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components-ui-lib/tooltip";
import { useIsOverflown } from "@/hooks-ui-lib/use-overflown";
import { cn } from "@/utils-ui-lib/classnames";

interface TruncatedTextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PropsWithChildren<{}> {
  withTooltip?: boolean;
  tooltipContentClassName?: string;
}

const TruncatedText: FC<TruncatedTextProps> = ({
  children,
  className,
  withTooltip,
  tooltipContentClassName = "max-w-[300px] break-words overflow-hidden",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isOverflown = useIsOverflown(ref, children);

  if (!withTooltip || !isOverflown) {
    return (
      <div ref={ref} className={cn("truncate", className)}>
        {children}
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger className={cn("truncate", className)}>
        {children}
      </TooltipTrigger>
      <TooltipContent className={tooltipContentClassName}>
        {children}
      </TooltipContent>
    </Tooltip>
  );
};

TruncatedText.displayName = "TruncatedText";

export { TruncatedText };
