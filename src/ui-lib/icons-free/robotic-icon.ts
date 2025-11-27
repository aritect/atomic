import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { RoboticIcon as RoboticIconH } from '@hugeicons/core-free-icons';

export const RoboticIcon = createIconComponent("RoboticIcon", {
  "stroke.rounded": RoboticIconH,
} as Record<string, any>, "stroke");
