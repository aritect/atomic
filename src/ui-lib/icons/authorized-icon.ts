import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { AuthorizedIcon as AuthorizedIconH } from '@hugeicons/core-free-icons';

export const AuthorizedIcon = createIconComponent("AuthorizedIcon", {
  "stroke.rounded": AuthorizedIconH,
} as Record<string, any>);
