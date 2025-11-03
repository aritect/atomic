import React from "react";

import {
  BarChart as BarChartComponent,
  BarChartPeriod,
} from "@/components-ui-lib/charts/bar-chart";

const BarChartThinDemo = () => {
  const getRandomArbitrary = (min: number, max: number) => Math.round((Math.random() * (max - min)) + min);

  const data = {
    dataset: (() => new Array(90).fill(0).map((_, i) => ({
      date: new Date(new Date().setDate(new Date().getDate() + i)).toISOString(),
      group: {
        Pending: getRandomArbitrary(2, 10),
        Failed: getRandomArbitrary(2, 10),
        Success: getRandomArbitrary(2, 10),
      },
    })))(),
    meta: {
      yLabel: "BTC",
      height: 100,
      barSize: 1,
      showTrend: true,
      showTooltip: false,
      showGrid: false,
      showXAxis: false,
      showYAxis: false,
      showLegend: true,
      hoverColor: "hsl(var(--bright-pink))",
      useScrollArea: true,
      minWidth: 1040,
      scrollAreaClassName: "max-w-[400px] w-full pb-2",
      title: "Payments Flow",
      period: BarChartPeriod.Day,
      knownNames: ["Pending", "Failed", "Success"],
    },
  };

  return <BarChartComponent {...data} />;
};

export { BarChartThinDemo };
