import React, { type FC, useCallback, useMemo } from "react";

import { HslDistributionVariant, useChartHslDistribution } from "@/components-ui-lib/charts/chart";
import { useServer } from "@/hooks-ui-lib/use-server";
import { cn } from "@/utils-ui-lib/classnames";
import { hslIsMoreDark } from "@/utils-ui-lib/hsl";

interface HorizontalSegmentedChartProps {
  data: {
    value: number;
  }[],
  className?: string;
}

const HorizontalSegmentedChart: FC<HorizontalSegmentedChartProps> = ({ className, data }) => {
  const total = useMemo(() => data.reduce((result, { value }) => result + value, 0), [data]);
  const calcWidth = useCallback((value: number) => Math.ceil(((value / total) * 100) / 10) * 10, [total]);
  const hslDistribution = useChartHslDistribution(data.length, HslDistributionVariant.Neutral);

  return (
    <div className={cn("flex gap-x-1 w-[100%]", className)}>
      {data.map(({ value }, i) => {
        const width = calcWidth(value);

        if (width === 0) {
          return null;
        }

        return (
          <div
            key={i}
            className={"flex items-center justify-center h-[24px] flex-grow first:rounded-l-[4px] last:rounded-r-[4px]"}
            style={{
              width: `${width}%`,
              backgroundColor: hslDistribution[i],
            }}
          >
            {value > 0 && width > 15 && (
              <span className={cn("text-xs font-medium text-eerie-black", {
                "text-sea-salt": hslIsMoreDark(hslDistribution[i]),
              })}>
                {value}%
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

HorizontalSegmentedChart.displayName = "HorizontalSegmentedChart";

const HorizontalSegmentedChartUseServer: FC<HorizontalSegmentedChartProps> = (props) => {
  const isServer = useServer();

  if (isServer) {
    return null;
  }

  return <HorizontalSegmentedChart {...props} />;
};

HorizontalSegmentedChartUseServer.displayName = "HorizontalSegmentedChart";

export { HorizontalSegmentedChartUseServer as HorizontalSegmentedChart };
