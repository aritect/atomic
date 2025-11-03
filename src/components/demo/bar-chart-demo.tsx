import React from "react";

import {
  BarChart as BarChartComponent,
  BarChartPeriod,
} from "@/components-ui-lib/charts/bar-chart";

const BarChartDemo = () => {
  const getRandomArbitrary = (min: number, max: number) => Math.round((Math.random() * (max - min)) + min);

  const data = {
    dataset: (() => new Array(6).fill(0).map((_, i) => {
      const sign = Math.random() < 0.5 ? -1 : 1;

      return {
        date: new Date(2021, 5, i + 1).toISOString(),
        group: {
          "In Progress": getRandomArbitrary(10, 100) * sign,
          Pending: getRandomArbitrary(10, 100) * sign,
          Failed: getRandomArbitrary(10, 100) * sign,
          Success: getRandomArbitrary(10, 100) * sign,
        },
      };
    }))(),
    meta: {
      yLabel: "BTC",
      height: 360,
      barSize: 16,
      showTrend: true,
      title: "Payments Flow",
      period: BarChartPeriod.Day,
      knownNames: ["In Progress", "Pending", "Failed", "Success"],
    },
  };

  return <BarChartComponent {...data} />;
};

export { BarChartDemo };
