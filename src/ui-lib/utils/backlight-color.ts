import { rgbToHsl } from "./hsl";
import { getOffscreenCanvasContext } from "./offscreen-canvas";

const lightnessRange = [50, 60];
const additionalSaturation = 0;

const getBacklightColor = async (image: HTMLImageElement, alpha?: number) => {
  const getColor = (img: HTMLImageElement) => {
    const canvas = getOffscreenCanvasContext();
    canvas.imageSmoothingEnabled = true;
    canvas.drawImage(img, 0, 0, 10, 10);

    const data = canvas.getImageData(0, 0, 10, 10).data;

    let c = 0;
    let r = 0;
    let g = 0;
    let b = 0;

    for (let i = 0; i < data.length; i += 4) {
      c += 1;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    r = Math.round(r / c);
    g = Math.round(g / c);
    b = Math.round(b / c);

    const [h, s, l] = rgbToHsl(r, g, b);
    canvas.clearRect(0, 0, 10, 10);
    canvas.imageSmoothingEnabled = false;

    if (l > lightnessRange[0] && l < lightnessRange[1]) {
      return `hsla(${h}, ${s + additionalSaturation}%, ${l}%, ${alpha || 1})`;
    } else if (l >= lightnessRange[1]) {
      return `hsla(${h}, ${s + additionalSaturation}%, ${lightnessRange[1]}%, ${alpha || 1})`;
    } else {
      return `hsla(${h}, ${s + additionalSaturation}%, ${lightnessRange[0]}%, ${alpha || 1})`;
    }
  };

  return new Promise<string>((resolve) => {
    if (image.complete) {
      resolve(getColor(image));
    }

    image.addEventListener("load", () => {
      resolve(getColor(image));
    });
  });
};

export { getBacklightColor };
