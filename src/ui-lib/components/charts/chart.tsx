import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
} from "react";

import * as RechartsPrimitive from "recharts";

import scssImportsModule from "@/assets-ui-lib/styles/modules/imports.module.scss";
import { useTheme } from "@/hooks-ui-lib/use-theme";
import { cn } from "@/utils-ui-lib/classnames";
import { hslAddDarkness, hslAddLightness } from "@/utils-ui-lib/hsl";
import { round } from "@/utils-ui-lib/round";

const {
  lightChartNeutralBase: lightChartNeutralBaseHsl,
  lightChartDestructiveBase: lightChartDestructiveBaseHsl,
  darkChartNeutralBase: darkChartNeutralBaseHsl,
  darkChartDestructiveBase: darkChartDestructiveBaseHsl,
} = scssImportsModule;

type ChartConfig = {
  [k in string]: {
  label?: React.ReactNode
}}

type ChartContextProps = {
  config: ChartConfig
}

enum HslDistributionVariant {
  Destructive = "destructive",
  Neutral = "neutral",
}

const DISTRIBUTED_HSL_MAGIC_NUMBER = 70;

const useChartHslDistribution = (
  length: number,
  variant: HslDistributionVariant = HslDistributionVariant.Neutral
) => {
  const [theme] = useTheme();

  const distributeHslFormula = useCallback(
    (index: number) => round((length - index) * (DISTRIBUTED_HSL_MAGIC_NUMBER / length), 2),
    [length],
  );

  return useMemo(() => {
    const getDestructiveHsl = (index: number) => (theme === "dark" ? hslAddDarkness(
      darkChartDestructiveBaseHsl,
      distributeHslFormula(index),
    ) : hslAddLightness(
      lightChartDestructiveBaseHsl,
      distributeHslFormula(index),
    ));

    const getNeutralHsl = (index: number) => (theme === "dark" ? hslAddDarkness(
      darkChartNeutralBaseHsl,
      distributeHslFormula(index),
    ) : hslAddLightness(
      lightChartNeutralBaseHsl,
      distributeHslFormula(index),
    ));

    return Array.from({ length }, (_, index) => {
      switch (variant) {
        case HslDistributionVariant.Destructive:
          return getDestructiveHsl(index);
        case HslDistributionVariant.Neutral:
        default:
          return getNeutralHsl(index);
      }
    });
  }, [length, variant, theme, distributeHslFormula]);
};

const ChartContext = createContext<ChartContextProps | null>(null);

const useChart = () => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
};

const getPayloadConfigFromPayload = (
  config: ChartConfig,
  payload: unknown,
  key: string
) => {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload = "payload" in payload
  && typeof payload.payload === "object"
  && payload.payload !== null
    ? payload.payload
    : undefined;

  let configLabelKey: string = key;

  if (
    key in payload
    && typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload
    && key in payloadPayload
    && typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
};

const ChartContainer = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}
>(({
  id, className, children, config, ...props
}, ref) => {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line-line]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = "Chart";

const ChartTooltip = RechartsPrimitive.Tooltip;

type ChartTooltipContentFormatValueFn = (value: unknown) => string;

const ChartTooltipContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
  nameKey?: string
  labelKey?: string
  formatValueFn?: ChartTooltipContentFormatValueFn
}
>((
  {
    active,
    payload,
    className,
    formatter,
    formatValueFn,
    color,
    nameKey,
  },
  ref
) => {
  const { config } = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 border bg-background px-4 py-3 text-xs shadow-sm",
          {
            "px-2.5 py-1.5": payload.length === 1,
          },
          className
        )}
      >
        <div className="grid gap-2">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={"flex w-full items-center space-x-2"}
              >
                {formatter && item?.value !== undefined && item.name
                  ? formatter(item.value, item.name, item, index, item.payload)
                  : (
                    <>
                      <div
                        className={"shrink-0 h-[8px] w-[8px]"}
                        style={{ backgroundColor: indicatorColor }}
                      />
                      <div
                        className={"flex flex-1 justify-between leading-none gap-6"}
                      >
                        <div className="grid gap-1.5">
                          <span className="text-xs font-medium">
                            {itemConfig?.label || item.name}
                          </span>
                        </div>
                        {item.value && (
                          <span className="text-xs text-muted-foreground">
                            {formatValueFn
                              ? formatValueFn(item.value)
                              : item.value.toLocaleString()
                            }
                          </span>
                        )}
                      </div>
                  </>
                  )}
              </div>
            );
          })}
        </div>
      </div>
  );
});

ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
  nameKey?: string
}
>((
  {
    className, payload, verticalAlign = "bottom", nameKey,
  },
  ref
) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={"flex items-center gap-1.5 text-xs"}
            >
              <div
                className="h-[8px] w-[8px] shrink-0"
                style={{
                  backgroundColor: item.color,
                }}
              />
              {itemConfig?.label}
            </div>
          );
        })}
      </div>
  );
});

ChartLegendContent.displayName = "ChartLegend";

export {
  type ChartConfig,
  HslDistributionVariant,
  useChartHslDistribution,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};
