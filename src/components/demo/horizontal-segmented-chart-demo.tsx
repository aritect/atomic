import React, { type FC } from "react";

import { HorizontalSegmentedChart } from "@/components-ui-lib/charts/horizontal-segmented-chart";

const HorizontalSegmentedChartDemo: FC = () => (
  <HorizontalSegmentedChart
    data={[
      { value: 23 },
      { value: 33 },
      { value: 15 },
      { value: 11 },
      { value: 44 },
    ]}
  />
);

export { HorizontalSegmentedChartDemo };
