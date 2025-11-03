import React, { type FC } from "react";

import { Slider } from "@/components-ui-lib/slider";
import { cn } from "@/utils-ui-lib/classnames";

type SliderProps = React.ComponentProps<typeof Slider>;

const SliderDemo: FC<SliderProps> = ({ className, ...props }) => (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%]", className)}
      {...props}
    />
);

export { SliderDemo };
