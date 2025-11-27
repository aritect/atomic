import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { AiSettingIcon as AiSettingIconH } from '@hugeicons/core-free-icons';

export const AiSettingIcon = createIconComponent("AiSettingIcon", {
  "stroke.rounded": AiSettingIconH,
} as Record<string, any>, "stroke");
