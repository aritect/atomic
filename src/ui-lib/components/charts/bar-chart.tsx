import React, { type FC, useCallback, useMemo, useState } from "react";

import { format } from "date-fns";
import {
  Bar,
  BarChart as BaseBarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

import scssImportsModule from "@/assets-ui-lib/styles/modules/imports.module.scss";
import {
  HslDistributionVariant,
  useChartHslDistribution,
} from "@/components-ui-lib/charts/chart";
import { Trend, type TrendProps } from "@/components-ui-lib/trend";
import { ScrollArea } from "@/components-ui-lib/scroll-area";
import { useTheme } from "@/hooks-ui-lib/use-theme";
import { useTextWidth } from "@/hooks-ui-lib/use-text-width";
import { minorFormatChartValueLabel } from "@/utils-ui-lib/format";
import { round } from "@/utils-ui-lib/round";

enum BarChartPeriod {
  Day = "day",
  Month = "month",
  Year = "year",
}

enum BarChartTrend {
  Positive = "positive",
  Negative = "negative",
  Stable = "stable",
}

interface BarChartProps {
  dataset: {
    date: string;
    group: Record<string, number>;
  }[];
  meta: {
    title: string;
    yLabel: string;
    height: number;
    knownNames: string[];
    period: BarChartPeriod;
    showXAxis?: boolean;
    showYAxis?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showTrend?: boolean;
    showLegend?: boolean;
    barSize?: number;
    minWidth?: number;
    useScrollArea?: boolean;
    scrollAreaClassName?: string;
  };
}

type BarChartFormattedDataset = {
  date: string;
  trend?: TrendProps;
  group: Record<string, number>;
  meta: BarChartProps["meta"] & {
    neutralHSLDistribution: string[];
    negativeHSLDistribution: string[];
  };
}[];

interface BarChartTooltipProps
  extends TooltipProps<
    number | string | Array<number | string>,
    number | string
  > {}

const BarChartTooltip: FC<BarChartTooltipProps> = ({ payload, active }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const [{ payload: dataset }] = payload;
  const { trend, date, group, meta } = dataset as BarChartFormattedDataset[0];

  const getLabel = useCallback(
    (value: number) => minorFormatChartValueLabel(value, meta.yLabel),
    [meta.yLabel],
  );

  return (
    <div className="bg-background w-[270px] border shadow-sm">
      <div className="flex items-center justify-between border-b-[1px] px-4 py-2">
        <p className="text-xs font-medium">{meta.title}</p>
        {meta.showTrend && trend && trend.variant !== BarChartTrend.Stable && (
          <p className="text-muted-foreground text-xs font-medium">
            <Trend {...trend} />
          </p>
        )}
        <p className="text-xs text-muted-foreground text-xs">{date}</p>
      </div>

      <div className="space-y-2 p-4">
        {Object.entries(group).map(([key, value], index) => (
          <div key={key} className="flex justify-between">
            <div className="flex items-center justify-center space-x-2">
              <div
                className="h-[8px] w-[8px]"
                style={
                  value < 0
                    ? { backgroundColor: meta.negativeHSLDistribution[index] }
                    : { backgroundColor: meta.neutralHSLDistribution[index] }
                }
              />
              <p className="text-xs font-medium">{key}</p>
            </div>
            <p className="text-muted-foreground text-xs">{getLabel(value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

BarChartTooltip.displayName = "BarChartTooltip";

interface BarChartLegendProps {
  items: string[];
  colors: string[];
  hoveredGroup: string | null;
  onHover: (group: string | null) => void;
}

const BarChartLegend: FC<BarChartLegendProps> = ({
  items,
  colors,
  hoveredGroup,
  onHover,
}) => {
  return (
    <div className="flex flex-wrap items-start justify-start gap-0 md:gap-1 pt-2">
      {items.map((item, index) => {
        const isAnyHovered = hoveredGroup && hoveredGroup !== item;
        const isHovered = hoveredGroup === item;
        return (
          <div
            key={item}
            className="flex cursor-pointer items-center space-x-2 px-3 py-1 md:py-2"
            onMouseEnter={() => onHover(item)}
            onMouseLeave={() => onHover(null)}
          >
            <div
              className="h-[10px] w-[10px]"
              style={{
                backgroundColor: isHovered ? colors[colors.length - 1] : isAnyHovered ? colors[0] : colors[index],
              }}
            />
            <p className="text-xs">{item}</p>
          </div>
        );
      })}
    </div>
  );
};

BarChartLegend.displayName = "BarChartLegend";

const BarChart: FC<BarChartProps> = ({
  dataset,
  meta: {
    showTooltip = true,
    showYAxis = true,
    showXAxis = true,
    showGrid = true,
    showLegend = false,
    useScrollArea = false,
    scrollAreaClassName,
    ...meta
  },
}) => {
  const [theme] = useTheme();
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const getLabel = useCallback(
    (value: number) => minorFormatChartValueLabel(value, meta.yLabel),
    [meta.yLabel],
  );

  const longestYLabel = useMemo(() => {
    if (!dataset.length) {
      return "";
    }

    const combinedMaxValue = dataset.reduce(
      (result, { group }, index) => {
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
      },
      Object.values(dataset[0].group).reduce(
        (result, value) => result + value,
        0,
      ),
    );

    return getLabel(combinedMaxValue);
  }, [dataset, getLabel]);

  const longestYLabelWidth = useTextWidth(longestYLabel, 16, "12px");

  const neutralHSLDistribution = useChartHslDistribution(meta.knownNames.length, HslDistributionVariant.Neutral);
  const negativeHSLDistribution = useChartHslDistribution(meta.knownNames.length, HslDistributionVariant.Destructive);

  const formattedDataset: BarChartFormattedDataset = useMemo(() => {
    let previousTotalAmount: number;
    let trendVariant: BarChartTrend;
    let trendValue: number;

    return dataset.map((item) => {
      const totalAmount = Object.values(item.group).reduce(
        (result, value) => result + value,
        0,
      );

      if (meta.showTrend && previousTotalAmount !== undefined) {
        trendVariant = totalAmount > previousTotalAmount
          ? BarChartTrend.Positive
          : BarChartTrend.Negative;
        trendValue = round(
          Math.abs(((totalAmount - previousTotalAmount) / totalAmount) * 100),
          2,
        );
      } else {
        trendValue = 0;
        trendVariant = BarChartTrend.Stable;
      }

      const result = {
        ...item,
        meta: {
          ...meta,
          neutralHSLDistribution,
          negativeHSLDistribution,
        },
        trend: meta.showTrend
          ? {
            value: trendValue,
            variant: trendVariant,
          }
          : undefined,
        date: format(
          new Date(item.date),
          {
            [BarChartPeriod.Year]: "yyyy",
            [BarChartPeriod.Month]: "MMM",
            [BarChartPeriod.Day]: "MMM dd",
          }[meta.period],
        ),
      };

      previousTotalAmount = totalAmount;

      return result;
    });
  }, [dataset, meta]);

  const chartContent = (
    <ResponsiveContainer
      width="100%"
      className="w-[100%]"
      height={meta.height}
      minWidth={meta.minWidth}
    >
        <BaseBarChart data={formattedDataset} barGap={16}>

        {showXAxis && (
          <XAxis
            dataKey="date"
            stroke={
              theme === "dark"
                ? scssImportsModule.darkBorder
                : scssImportsModule.lightBorder
            }
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

        {showYAxis && (
          <YAxis
            stroke={
              theme === "dark"
                ? scssImportsModule.darkBorder
                : scssImportsModule.lightBorder
            }
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => getLabel(value)}
            width={longestYLabelWidth}
            tick={{
              fontSize: 12,
              fill:
                theme === "dark"
                  ? scssImportsModule.darkMutedForeground
                  : scssImportsModule.lightMutedForeground,
            }}
          />
        )}

        {showGrid && (
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            className="stroke-border"
          />
        )}

        {showTooltip && <Tooltip content={BarChartTooltip} cursor={false} />}

        {meta.knownNames.map((name, index) => (
          <Bar
            key={name}
            stackId="stack"
            barSize={meta.barSize || 16}
            isAnimationActive={false}
            dataKey={`group.${name}`}
          >
            {formattedDataset.map((entry, entryIndex) => {
              const baseColor = entry.group[name] > 0
                ? neutralHSLDistribution[index]
                : negativeHSLDistribution[index];

              const isHovered = hoveredGroup === name;
              const isAnyHovered = hoveredGroup && hoveredGroup !== name;

              let fillColor = baseColor;
              let strokeColor = baseColor;

              if (isAnyHovered) {
                fillColor = neutralHSLDistribution[0];
                strokeColor = neutralHSLDistribution[0];
              }

              if (isHovered) {
                fillColor = neutralHSLDistribution[neutralHSLDistribution.length - 1];
                strokeColor = neutralHSLDistribution[neutralHSLDistribution.length - 1];
              }

              return (
                <Cell
                  key={entryIndex}
                  strokeWidth={1}
                  stroke={strokeColor}
                  fill={fillColor}
                />
              );
            })}
          </Bar>
        ))}
        </BaseBarChart>
      </ResponsiveContainer>
  );

  return (
    <div className="flex flex-col w-full items-center">
      {useScrollArea ? (
        <ScrollArea orientation="horizontal" className={scrollAreaClassName}>
          {chartContent}
        </ScrollArea>
      ) : (
          chartContent
      )}
      {showLegend && (
        <BarChartLegend
          items={meta.knownNames}
          colors={neutralHSLDistribution}
          hoveredGroup={hoveredGroup}
          onHover={setHoveredGroup}
        />
      )}
    </div>
  );
};

BarChart.displayName = "BarChart";

export { BarChart, BarChartPeriod };
