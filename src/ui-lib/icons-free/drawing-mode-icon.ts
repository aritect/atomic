import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { DrawingModeIcon as DrawingModeIconH } from '@hugeicons/core-free-icons';

export const DrawingModeIcon = createIconComponent("DrawingModeIcon", {
  "stroke.rounded": DrawingModeIconH,
} as Record<string, any>, "stroke");
