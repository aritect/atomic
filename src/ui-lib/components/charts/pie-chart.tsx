import React, { type FC, useMemo } from "react";

import { Label, Pie, PieChart as PieChartRecharts } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  useChartHslDistribution,
} from "@/components-ui-lib/charts/chart";
import { useServer } from "@/hooks-ui-lib/use-server";
import { cn } from "@/utils-ui-lib/classnames";

interface PieChartProps {
  data: {
    label: string;
    value: number;
  }[];
  meta: {
    height?: number;
    totalLabel?: string;
    showTotal?: boolean;
    showLegend?: boolean;
  }
  className?: string;
}

const PieChart: FC<PieChartProps> = ({ className, data, meta }) => {
  const {
    height = 300,
    totalLabel = "Total",
    showTotal = false,
    showLegend = false,
  } = meta;

  const hslDistribution = useChartHslDistribution(data.length);
  const { total, chartDataWithFill } = useMemo(
    () => data.reduce<{
      total: number;
      chartDataWithFill: typeof data;
    }>(
      (result, { value }, index) => (
        {
          total: result.total + value,
          chartDataWithFill: [
            ...result.chartDataWithFill,
            {
              ...data[index],
              fill: hslDistribution[index],
            },
          ],
        }
      ),
      { total: 0, chartDataWithFill: [] },
    ),
    [data, hslDistribution],
  );

  const chartConfig: ChartConfig = useMemo(() => data.reduce<ChartConfig>((result, { label }) => ({
    ...result,
    [label]: {
      label: label.charAt(0).toUpperCase() + label.slice(1),
    },
  }), {}), [data]);

  return (
    <ChartContainer
      config={chartConfig}
      style={{ minHeight: height }}
      className={cn("mx-auto aspect-square", className)}
    >
      <PieChartRecharts>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />
        <Pie
          data={chartDataWithFill}
          isAnimationActive={false}
          dataKey="value"
          nameKey="label"
          innerRadius={60}
          strokeWidth={10}
        >
          {showTotal && (
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {total.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        {totalLabel}
                      </tspan>
                    </text>
                  );
                }

                return null;
              }}
            />
          )}
        </Pie>
        {showLegend && (
          <ChartLegend
            content={<ChartLegendContent nameKey="label" />}
            className="flex-wrap space-x-2 [&>*]:justify-center"
          />
        )}
      </PieChartRecharts>
    </ChartContainer>
  );
};

PieChart.displayName = "PieChart";

const PieChartUseServer: FC<PieChartProps> = (props) => {
  const isServer = useServer();

  if (isServer) {
    return null;
  }

  return <PieChart {...props} />;
};

PieChartUseServer.displayName = "PieChart";

export { PieChartUseServer as PieChart };
