import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { CircleIcon as CircleIconH } from '@hugeicons/core-free-icons';

export const CircleIcon = createIconComponent("CircleIcon", {
  "stroke.rounded": CircleIconH,
} as Record<string, any>, "stroke");
