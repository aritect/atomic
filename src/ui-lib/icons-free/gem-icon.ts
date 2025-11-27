import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { GemIcon as GemIconH } from '@hugeicons/core-free-icons';

export const GemIcon = createIconComponent("GemIcon", {
  "stroke.rounded": GemIconH,
} as Record<string, any>, "stroke");
