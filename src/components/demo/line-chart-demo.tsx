import React from "react";

import { LineChart, LineChartPeriod } from "@/components-ui-lib/charts/line-chart";

const LineChartDemo = () => {
  const getRandomArbitrary = (min: number, max: number) => Math.round((Math.random() * (max - min)) + min);

  const data = {
    meta: {
      height: 240,
      yLabel: "USD",
      period: LineChartPeriod.Day,
      knownLabels: ["Pending", "Failed", "Success", "In Progress"],
    },
    data: new Array(9).fill(0).map((_, i) => {
      const sign = 1;

      return {
        date: new Date(2021, 5, i + 1).toISOString(),
        group: {
          Pending: getRandomArbitrary(1 + i, 10) * sign,
          Failed: getRandomArbitrary(20 + i, 30) * sign,
          Success: getRandomArbitrary(40 + i, 50) * sign,
          "In Progress": getRandomArbitrary(60 + i, 70) * sign,
        },
      };
    }),
  };

  return <LineChart {...data} />;
};

export { LineChartDemo };
