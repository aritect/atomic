import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { PlayIcon as PlayIconH } from '@hugeicons/core-free-icons';

export const PlayIcon = createIconComponent("PlayIcon", {
  "stroke.rounded": PlayIconH,
} as Record<string, any>);
