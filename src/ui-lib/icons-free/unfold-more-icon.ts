import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { UnfoldMoreIcon as UnfoldMoreIconH } from '@hugeicons/core-free-icons';

export const UnfoldMoreIcon = createIconComponent("UnfoldMoreIcon", {
  "stroke.rounded": UnfoldMoreIconH,
} as Record<string, any>, "stroke");
