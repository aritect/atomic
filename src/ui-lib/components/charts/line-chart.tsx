import React, { type FC, useCallback, useMemo } from "react";

import { format } from "date-fns";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from "recharts";

import scssImportsModule from "@/assets-ui-lib/styles/modules/imports.module.scss";
import { BarChartPeriod } from "@/components-ui-lib/charts/bar-chart.tsx";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  useChartHslDistribution,
} from "@/components-ui-lib/charts/chart";
import { useServer } from "@/hooks-ui-lib/use-server";
import { useTextWidth } from "@/hooks-ui-lib/use-text-width";
import { useTheme } from "@/hooks-ui-lib/use-theme";
import { cn } from "@/utils-ui-lib/classnames";
import { minorFormatChartValueLabel } from "@/utils-ui-lib/format";

enum LineChartPeriod {
  Day = "day",
  Month = "month",
  Year = "year",
}

interface LineChartProps {
  data: {
    date: string;
    group: Record<string, number>;
  }[];
  className?: string;
  meta: {
    knownLabels: string[];
    showTooltip?: boolean;
    withTooltip?: boolean;
    withGrid?: boolean;
    withYAxis?: boolean;
    withXAxis?: boolean;
    withDots?: boolean;
    height?: number;
    yLabel?: string;
    strokeWidth?: number;
    period?: LineChartPeriod,
  }
}

const LineChart: FC<LineChartProps> = ({ data, className, meta }) => {
  const [theme] = useTheme();

  const {
    knownLabels,
    height = 300,
    strokeWidth = 2,
    withTooltip = true,
    withXAxis = true,
    withYAxis = true,
    withDots = false,
    withGrid = true,
    yLabel,
    period = LineChartPeriod.Day,
  } = meta || {};
  const hslDistribution = useChartHslDistribution(knownLabels.length);

  const chartConfig: ChartConfig = useMemo(() => knownLabels.reduce<ChartConfig>((result, label) => ({
    ...result,
    [label]: {
      label: label.charAt(0).toUpperCase() + label.slice(1),
    },
  }), {}), [data]);

  const formatDateLabel = useCallback((date: string) => format(
    new Date(date),
    {
      [BarChartPeriod.Year]: "yyyy",
      [BarChartPeriod.Month]: "MMM",
      [BarChartPeriod.Day]: "MMM dd",
    }[period],
  ), [period]);

  const formatValueLabel = useCallback(
    (value: number) => minorFormatChartValueLabel(value, yLabel),
    [yLabel],
  );

  const longestYLabel = useMemo(() => {
    if (data.length === 0) {
      return "";
    }

    const combinedMaxValue = data.reduce((result, { group }, index) => {
      if (index === 0) {
        return result;
      }

      const combined = Object.values(group).reduce(
        (combinedResult, value) => combinedResult + value,
        0,
      );

      if (combined > result) {
        return combined;
      }

      return result;
    }, Object.values(data[0].group).reduce(
      (result, value) => result + value,
      0,
    ));

    return formatValueLabel(combinedMaxValue);
  }, [data, formatValueLabel]);

  const longestYLabelWidth = useTextWidth(longestYLabel, 16, "12px");

  return (
    <ChartContainer className={cn("w-[100%]", className)} config={chartConfig} style={{
      minHeight: height,
    }}>
      <RechartsLineChart data={data} accessibilityLayer>
        {withGrid && (
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            className="stroke-border"
          />
        )}

        {withXAxis && (
          <XAxis
            dataKey="date"
            tickFormatter={formatDateLabel}
            stroke={
              theme === "dark"
                ? scssImportsModule.darkBorder
                : scssImportsModule.lightBorder
            }
            fontSize={12}
            tickLine={false}
            axisLine={false}
            padding={{ left: 24, right: 24 }}
            tickMargin={15}
            tick={{
              fontSize: 12,
              fill:
                theme === "dark"
                  ? scssImportsModule.darkMutedForeground
                  : scssImportsModule.lightMutedForeground,
            }}
          />
        )}
        {withYAxis && (
          <YAxis
            stroke={
              theme === "dark"
                ? scssImportsModule.darkBorder
                : scssImportsModule.lightBorder
            }
            width={longestYLabelWidth}
            tickFormatter={formatValueLabel}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 12,
              fill:
                theme === "dark"
                  ? scssImportsModule.darkMutedForeground
                  : scssImportsModule.lightMutedForeground,
            }}
          />
        )}
        {withTooltip && (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent formatValueFn={(value) => formatValueLabel(value as number)} />}
          />
        )}
        {knownLabels.map((label, index) => (
          <Line
            key={label}
            name={label}
            type="monotone"
            isAnimationActive={false}
            dataKey={`group.${label}`}
            stroke={hslDistribution[index]}
            strokeWidth={strokeWidth}
            dot={withDots}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};

LineChart.displayName = "LineChart";

const LineChartUseServer: FC<LineChartProps> = (props) => {
  const isServer = useServer();

  if (isServer) {
    return null;
  }

  return <LineChart {...props} />;
};

LineChartUseServer.displayName = "LineChart";

export { LineChartUseServer as LineChart, LineChartPeriod };
