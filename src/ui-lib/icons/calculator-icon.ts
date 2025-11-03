import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { CalculatorIcon as CalculatorIconH } from '@hugeicons/core-free-icons';

export const CalculatorIcon = createIconComponent("CalculatorIcon", {
  "stroke.rounded": CalculatorIconH,
} as Record<string, any>);
