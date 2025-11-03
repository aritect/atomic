import React from "react";

import { PieChart } from "@/components-ui-lib/charts/pie-chart";

const PieChartDemo = () => (
  <PieChart
    meta={{
      height: 300,
      showTotal: true,
      totalLabel: "Transactions",
    }}
    data={[
      { label: "Trade", value: 1400 },
      { label: "Transfer", value: 2330 },
      { label: "Deposit", value: 3050 },
      { label: "Withdraw", value: 4000 },
    ]}
  />
);

export { PieChartDemo };
