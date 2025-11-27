import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { MoleculesIcon as MoleculesIconH } from '@hugeicons/core-free-icons';

export const MoleculesIcon = createIconComponent("MoleculesIcon", {
  "stroke.rounded": MoleculesIconH,
} as Record<string, any>, "stroke");
