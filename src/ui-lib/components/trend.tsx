import React, { type FC, type HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { TrendingDownIcon } from "@/icons-ui-lib/trending-down-icon";
import { TrendingUpIcon } from "@/icons-ui-lib/trending-up-icon";
import { cn } from "@/utils-ui-lib/classnames";

const trendVariants = cva("flex items-center gap-[4px]", {
  variants: {
    variant: {
      positive: "text-positive-flashlight",
      negative: "text-destructive-flashlight",
      stable: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "stable",
  },
});

const trendIconVariants = cva("", {
  variants: {
    icon: {
      small: "w-4 h-4",
      medium: "w-6 h-6",
      large: "w-8 h-8",
    },
  },
  defaultVariants: {
    icon: "small",
  },
});

interface TrendProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof trendVariants>,
    VariantProps<typeof trendIconVariants> {
  value: number | string;
}

const Trend: FC<TrendProps> = ({ value, variant, icon, className }) => (
    <div className={cn(trendVariants({ variant, className }))}>
      {variant === "positive" && (
        <TrendingUpIcon className={cn(trendIconVariants({ icon }))} />
      )}
      {variant === "negative" && (
        <TrendingDownIcon className={cn(trendIconVariants({ icon }))} />
      )}
      {variant === "stable" && (
        <TrendingUpIcon className={cn(trendIconVariants({ icon }))} />
      )}
      {variant !== "stable" && value + "%"}
    </div>
);

Trend.displayName = "Trend";

export { Trend, type TrendProps };
