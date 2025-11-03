import React, { type FC } from "react";

import { round } from "@/utils-ui-lib/round";
import { cn } from "@/utils-ui-lib/classnames";

interface MoneyValueProps {
  value: number;
  sign: string;
  type: "fiat" | "crypto";
  cryptoDecimals?: number;
  cryptoTrimZeros?: boolean;
  maxAbbreviation?: "B" | "M" | "K";
  className?: string;
}

const MoneyValue: FC<MoneyValueProps> = ({
  cryptoDecimals = 8, value, sign, type, className, maxAbbreviation = "B", cryptoTrimZeros = false,
}) => {
  if (type === "crypto") {
    return (
      <span className={cn("nowrap", className)}>
        {cryptoTrimZeros ?
          value.toFixed(cryptoDecimals).replace(/\.?0+$/, "") :
          value.toFixed(cryptoDecimals)
        } {sign}
      </span>
    );
  }

  let fiatAbr = null;
  let fiatDecimals = 2;
  let fiatValue = value;

  if (maxAbbreviation === "B" && (value >= 1_000_000_000)) {
    fiatValue /= 1_000_000_000;
    fiatAbr = "B";
    fiatDecimals = 1;
  } else if ((maxAbbreviation === "B" || maxAbbreviation === "M") && (value >= 1_000_000)) {
    fiatValue /= 1_000_000;
    fiatAbr = "M";
    fiatDecimals = 1;
  } else if ((maxAbbreviation === "K" || maxAbbreviation === "M" || maxAbbreviation === "B") && (value >= 1_000)) {
    fiatValue /= 1_000;
    fiatAbr = "K";
    fiatDecimals = 1;
  }

  return (
    <span className={cn("nowrap", className)}>
      {sign}
      {round(fiatValue, fiatDecimals)}{fiatAbr && <span className={cn(
        "ml-[0.1rem]",
        {
          "text-money-value-b": fiatAbr === "B",
          "text-money-value-m": fiatAbr === "M",
          "text-money-value-k": fiatAbr === "K",
        }
      )}>{fiatAbr}</span>}
    </span>
  );
};

MoneyValue.displayName = "MoneyValue";

export { MoneyValue };
