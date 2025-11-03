import React from "react";
import { MaskContainer } from "@/components-ui-lib/svg-mask-effect";

export const SVGMaskEffectDemo = () => {
  return (
    <MaskContainer
      revealText={
        <p className="max-w-4xl mx-auto h-[30rem] flex items-center text-muted-foreground text-center text-5xl font-black">
          Making the invisible
        </p>
      }
      className="h-[30rem] w-full"
    >
      <p className="max-w-4xl h-[30rem] flex items-center mx-auto text-center text-5xl font-black">
        <span>Making the in<span className="text-neutral">visible</span></span>
      </p>
    </MaskContainer>
  );
};
