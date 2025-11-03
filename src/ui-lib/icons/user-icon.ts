import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { UserIcon as UserIconH } from '@hugeicons/core-free-icons';

export const UserIcon = createIconComponent("UserIcon", {
  "stroke.rounded": UserIconH,
} as Record<string, any>);
