import React from "react";

import { PieChart } from "@/components-ui-lib/charts/pie-chart";

const PieChartLegendDemo = () => (
  <PieChart
    meta={{
      height: 300,
      showTotal: true,
      showLegend: true,
      totalLabel: "Visitors",
    }}
    data={[
      { label: "chrome", value: 275 },
      { label: "safari", value: 200 },
      { label: "firefox", value: 287 },
      { label: "edge", value: 173 },
      { label: "other", value: 190 },
    ]}
  />
);

export { PieChartLegendDemo };
