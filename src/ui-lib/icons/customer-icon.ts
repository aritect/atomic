import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { UserAccountIcon } from '@hugeicons/core-free-icons';

export const CustomerIcon = createIconComponent("UserAccountIcon", {
  "stroke.rounded": UserAccountIcon,
} as Record<string, any>);
