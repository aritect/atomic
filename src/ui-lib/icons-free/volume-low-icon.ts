import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { VolumeLowIcon as VolumeLowIconH } from '@hugeicons/core-free-icons';

export const VolumeLowIcon = createIconComponent("VolumeLowIcon", {
  "stroke.rounded": VolumeLowIconH,
} as Record<string, any>, "stroke");
