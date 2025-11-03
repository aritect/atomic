import React, { type FC, type HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils-ui-lib/classnames";

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      wrapReverse: "flex-wrap-reverse",
    },
    gap: {
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
      20: "gap-20",
      24: "gap-24",
      32: "gap-32",
      40: "gap-40",
      48: "gap-48",
      56: "gap-56",
      64: "gap-64",
    },
  },
  defaultVariants: {
    direction: "row",
    align: "start",
    justify: "start",
    wrap: "nowrap",
  },
});

interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

const Flex: FC<FlexProps> = ({
  className,
  direction,
  align,
  justify,
  wrap,
  gap,
  ...props
}) => (
  <div
    className={cn(flexVariants({
      direction, align, justify, wrap, className, gap,
    }),)}
    {...props}
  />
);

Flex.displayName = "Flex";

export { Flex };
