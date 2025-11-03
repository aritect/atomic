import React from "react";

import { KpiCard, KpiCardChangeType } from "@/components-ui-lib/charts/kpi-card";

const KpiCardSimpleDemo = () => (
  <KpiCard
    title="Total Revenue"
    value="$ 7,600"
    change="+16%"
    changeType={KpiCardChangeType.Positive}
    description="Total revenue for the last 30 days."
  />
);

export { KpiCardSimpleDemo };
