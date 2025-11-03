import { useMemo } from "react";

import { isServer } from "@/utils-ui-lib/is-server";
import { getOffscreenCanvasContext } from "@/utils-ui-lib/offscreen-canvas";

const useTextWidth = (
  text: string,
  correctionParam?: number,
  fontSizeParam?: string,
  fontFamilyParam?: string,
) => {
  const correction = correctionParam || 0;

  return useMemo(() => {
    if (isServer) {
      return 0;
    }

    const style = getComputedStyle(document.body);
    const fontFamily = fontFamilyParam || style.fontFamily;
    const fontSize = fontSizeParam || style.fontSize;

    const context = getOffscreenCanvasContext();
    context.font = `${fontSize} ${fontFamily}`;
    const metrics = context.measureText(text);
    return metrics.width + correction;
  }, [text]);
};

export { useTextWidth };
