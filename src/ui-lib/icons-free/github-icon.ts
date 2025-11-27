import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { GithubIcon as GithubIconH } from '@hugeicons/core-free-icons';

export const GithubIcon = createIconComponent("GithubIcon", {
  "stroke.rounded": GithubIconH,
} as Record<string, any>, "stroke");
