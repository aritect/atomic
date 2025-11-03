import React from "react";

import {
  BarChart as BarChartComponent,
  BarChartPeriod,
} from "@/components-ui-lib/charts/bar-chart";

const BarChartPositiveDemo = () => {
  const getRandomArbitrary = (min: number, max: number) => Math.round((Math.random() * (max - min)) + min);

  const data = {
    dataset: (() => new Array(8).fill(0).map((_, i) => {
      const sign = 1;

      return {
        date: new Date(2021, 5, i + 1).toISOString(),
        group: {
          Pending: getRandomArbitrary(2, 10) * sign,
          Failed: getRandomArbitrary(2, 10) * sign,
          Success: getRandomArbitrary(2, 10) * sign,
        },
      };
    }))(),
    meta: {
      yLabel: "SOL",
      height: 240,
      barSize: 4,
      showTrend: true,
      showTooltip: false,
      title: "Payments Flow",
      period: BarChartPeriod.Day,
      knownNames: ["Pending", "Failed", "Success"],
    },
  };

  return <BarChartComponent {...data} />;
};

export { BarChartPositiveDemo };
