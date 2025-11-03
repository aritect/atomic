import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { CanvasIcon as CanvasIconH } from '@hugeicons/core-free-icons';

export const CanvasIcon = createIconComponent("CanvasIcon", {
  "stroke.rounded": CanvasIconH,
} as Record<string, any>);
