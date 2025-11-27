import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { ZapIcon as ZapIconH } from '@hugeicons/core-free-icons';

export const ZapIcon = createIconComponent("ZapIcon", {
  "stroke.rounded": ZapIconH,
} as Record<string, any>, "stroke");
