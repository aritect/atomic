import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { FilterIcon as FilterIconH } from '@hugeicons/core-free-icons';

export const FilterIcon = createIconComponent("FilterIcon", {
  "stroke.rounded": FilterIconH,
} as Record<string, any>, "stroke");
