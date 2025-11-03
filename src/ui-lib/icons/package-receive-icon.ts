import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { PackageReceiveIcon as PackageReceiveIconH } from '@hugeicons/core-free-icons';

export const PackageReceiveIcon = createIconComponent("PackageReceiveIcon", {
  "stroke.rounded": PackageReceiveIconH,
} as Record<string, any>);
