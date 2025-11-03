import React, { type FC, type ReactNode } from "react";

import { Typography } from "@/components-ui-lib/typography";
import { SearchListIcon } from "@/icons-ui-lib/search-list-icon";
import { cn } from "@/utils-ui-lib/classnames";

export interface EmptyStateProps {
  title?: string;
  className?: string;
  description?: string;
  icon?: () => ReactNode;
  actions?: ReactNode;
}

const EmptyState: FC<EmptyStateProps> = ({
  className,
  actions,
  title = "No results",
  icon: Icon = SearchListIcon,
  description = "Try another search, or adjusting the filters.",
}) => (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex flex-col items-center">
        <Icon className="mb-4" />
        <div className="mb-6 space-y-2 text-center">
          <Typography variant="h2" affects="large">
            {title}
          </Typography>
          <Typography variant="p" affects="muted">
            {description}
          </Typography>
        </div>
        {actions}
      </div>
    </div>
);

EmptyState.displayName = "EmptyState";

export { EmptyState };
