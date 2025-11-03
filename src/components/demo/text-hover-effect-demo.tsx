import React from "react";
import { TextHoverEffect } from "@/components-ui-lib/text-hover-effect";

export const TextHoverEffectDemo = () => {
  return (
    <div className="h-[20rem] xl:h-[40rem] flex items-center justify-center">
      <TextHoverEffect text="TEXT" className="text-7xl" />
    </div>
  );
};
