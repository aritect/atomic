import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { DangerIcon as DangerIconH } from '@hugeicons/core-free-icons';

export const DangerIcon = createIconComponent("DangerIcon", {
  "stroke.rounded": DangerIconH,
} as Record<string, any>, "stroke");
