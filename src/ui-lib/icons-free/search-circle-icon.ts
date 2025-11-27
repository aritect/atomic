import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { SearchCircleIcon as SearchCircleIconH } from '@hugeicons/core-free-icons';

export const SearchCircleIcon = createIconComponent("SearchCircleIcon", {
  "stroke.rounded": SearchCircleIconH,
} as Record<string, any>, "stroke");
