import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { ColorsIcon as ColorsIconH } from '@hugeicons/core-free-icons';

export const ColorsIcon = createIconComponent("ColorsIcon", {
  "stroke.rounded": ColorsIconH,
} as Record<string, any>, "stroke");
