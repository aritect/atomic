import React from "react";

import { KpiCard, KpiCardChangeType } from "@/components-ui-lib/charts/kpi-card";

const KpiCardDemo = () => (
  <>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <KpiCard
        title="Revenue"
        value="1,000"
        change="-16%"
        changeType={KpiCardChangeType.Negative}
        description="Total revenue for the last 30 days."
      />
      <KpiCard
        title="Orders"
        value="100"
        change="+10%"
        changeType={KpiCardChangeType.Positive}
        description="Total number of orders for the last 30 days."
      />
      <KpiCard
        title="Customers"
        value="50"
        change="+25%"
        changeType={KpiCardChangeType.Positive}
        description="Total number of customers for the last 30 days."
      />
      <KpiCard
        title="Average Order Value"
        value="10"
        change="+10%"
        changeType={KpiCardChangeType.Positive}
        description="Average order value for the last 30 days."
      />
    </div>
  </>
);

export { KpiCardDemo };
