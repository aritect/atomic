import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { VolumeHighIcon as VolumeHighIconH } from '@hugeicons/core-free-icons';

export const VolumeHighIcon = createIconComponent("VolumeHighIcon", {
  "stroke.rounded": VolumeHighIconH,
} as Record<string, any>, "stroke");
