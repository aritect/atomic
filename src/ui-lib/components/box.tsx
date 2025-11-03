import React, { type FC } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils-ui-lib/classnames";

const boxVariants = cva("", {
  variants: {
    padding: {
      none: "p-0",
      xs: "p-1",
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
      xl: "p-5",
      "2xl": "p-6",
      "3xl": "p-8",
      "4xl": "p-10",
      "5xl": "p-12",
    },
    margin: {
      none: "m-0",
      xs: "m-1",
      sm: "m-2",
      md: "m-3",
      lg: "m-4",
      xl: "m-5",
      "2xl": "m-6",
      "3xl": "m-8",
      "4xl": "m-10",
      "5xl": "m-12",
    },
  },
  defaultVariants: {
    padding: "none",
    margin: "none",
  },
});

interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {}

const Box: FC<BoxProps> = ({ className, padding, margin, ...props }) => (
  <div className={cn(boxVariants({ padding, margin, className }))} {...props} />
);

Box.displayName = "Box";

export { Box, boxVariants, type BoxProps };
