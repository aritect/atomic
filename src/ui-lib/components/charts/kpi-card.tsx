import React, { type FC } from "react";

import { cn } from "@/utils-ui-lib/classnames";
import { Card, CardContent, CardHeader } from "@/components-ui-lib/card";

export enum KpiCardChangeType {
  Positive = "positive",
  Negative = "negative",
}

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: KpiCardChangeType;
  description?: string;
}

const KpiCard: FC<KpiCardProps> = ({
  change,
  changeType,
  title,
  value,
  description,
}) => (
  <Card className={cn("relative z-10 overflow-hidden")}>
      <CardHeader className="pb-1">
        <div className="text-muted-foreground font-medium">{title}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <div
              className={`ml-2 text-xs font-medium ${
                changeType === KpiCardChangeType.Positive
                  ? "text-positive"
                  : changeType === KpiCardChangeType.Negative
                    ? "text-destructive"
                    : "text-muted"
              }`}
            >
              {change}
            </div>
          )}
        </div>
        {description && (
          <div className="text-muted-foreground mt-2 text-sm">
            {description}
          </div>
        )}
      </CardContent>
    </Card>
);

KpiCard.displayName = "KpiCard";

export { KpiCard };
