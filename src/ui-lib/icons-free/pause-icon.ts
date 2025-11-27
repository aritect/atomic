import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { PauseIcon as PauseIconH } from '@hugeicons/core-free-icons';

export const PauseIcon = createIconComponent("PauseIcon", {
  "stroke.rounded": PauseIconH,
} as Record<string, any>, "stroke");
