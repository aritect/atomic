import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { FactoryIcon as FactoryIconH } from '@hugeicons/core-free-icons';

export const FactoryIcon = createIconComponent("FactoryIcon", {
  "stroke.rounded": FactoryIconH,
} as Record<string, any>, "stroke");
