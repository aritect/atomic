import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { EarthIcon } from '@hugeicons/core-free-icons';

export const GlobeIcon = createIconComponent("EarthIcon", {
  "stroke.rounded": EarthIcon,
} as Record<string, any>, "stroke");
