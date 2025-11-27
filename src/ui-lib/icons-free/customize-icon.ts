import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { CustomizeIcon as CustomizeIconH } from '@hugeicons/core-free-icons';

export const CustomizeIcon = createIconComponent("CustomizeIcon", {
  "stroke.rounded": CustomizeIconH,
} as Record<string, any>, "stroke");
