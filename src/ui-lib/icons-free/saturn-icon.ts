import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { SaturnIcon as SaturnIconH } from '@hugeicons/core-free-icons';

export const SaturnIcon = createIconComponent("SaturnIcon", {
  "stroke.rounded": SaturnIconH,
} as Record<string, any>, "stroke");
