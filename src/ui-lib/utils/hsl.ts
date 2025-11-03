import { round } from "./round";

const hslAddLightness = (hsl: string, lightness: number) => {
  const [hue, saturation, currentLightness] = hsl
    .replace(/hsl\(|\)|%/g, "")
    .split(",")
    .map((value) => parseInt(value, 10));

  return `hsl(${hue}, ${saturation}%, ${currentLightness + lightness}%)`;
};

const hslAddDarkness = (hsl: string, darkness: number) => hslAddLightness(hsl, -darkness);

const rgbToHsl = (r: number, g: number, b: number) => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  let hue = 0;
  let saturation = 0;
  const lightness = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    saturation = lightness > 0.5 ? delta / (2.0 - max - min) : delta / (max + min);

    switch (max) {
      case red:
        hue = (((green - blue) / delta) + (green < blue ? 6 : 0)) / 6;
        break;
      case green:
        hue = (((blue - red) / delta) + 2) / 6;
        break;
      case blue:
        hue = (((red - green) / delta) + 4) / 6;
        break;
      default:
    }
  }

  return [round(hue * 360), round(saturation * 100), round(lightness * 100)];
};

const hueToRgb = (p: number, q: number, t: number) => {
  let tCalc = t;

  if (tCalc < 0) {
    tCalc += 1;
  }

  if (tCalc > 1) {
    tCalc -= 1;
  }

  if (tCalc < 1 / 6) {
    return p + ((q - p) * (6 * tCalc));
  }

  if (tCalc < 1 / 2) {
    return q;
  }

  if (tCalc < 2 / 3) {
    return p + ((q - p) * (((2 / 3) - tCalc) * 6));
  }

  return p;
};

const hslToRgb = (h: number, s: number, l: number) => {
  const hue = h / 360;
  const saturation = s / 100;
  const lightness = l / 100;

  let red = lightness;
  let green = lightness;
  let blue = lightness;

  if (saturation !== 0) {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - (lightness * saturation);
    const p = (2 * lightness) - q;

    red = hueToRgb(p, q, hue + (1 / 3));
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - (1 / 3));
  }

  return [round(red * 255), round(green * 255), round(blue * 255)];
};

const hslIsMoreDark = (hsl: string) => {
  const [, , lightness] = hsl
    .replace(/hsl\(|\)|%/g, "")
    .split(",")
    .map((value) => parseInt(value, 10));

  return lightness < 50;
};

const hslMix = (foregroundHsla: string, backgroundHsl: string) => {
  const foregroundMatch = foregroundHsla.match(/hsla?\(([^)]+)\)/);
  if (!foregroundMatch) throw new Error("Invalid HSLA format");
  
  const foregroundValues = foregroundMatch[1].split(",").map(v => parseFloat(v.trim().replace("%", "")));
  const fH = foregroundValues[0] || 0;
  const fS = foregroundValues[1] || 0;
  const fL = foregroundValues[2] || 0;
  const fA = foregroundValues[3] ?? 1;
  
  const backgroundMatch = backgroundHsl.match(/hsl?\(([^)]+)\)/);
  if (!backgroundMatch) throw new Error("Invalid HSL format");
  
  const backgroundValues = backgroundMatch[1].split(",").map(v => parseFloat(v.trim().replace("%", "")));
  const bH = backgroundValues[0] || 0;
  const bS = backgroundValues[1] || 0;
  const bL = backgroundValues[2] || 0;

  const [fR, fG, fB] = hslToRgb(fH, fS, fL);
  const [bR, bG, bB] = hslToRgb(bH, bS, bL);
  
  const alpha = fA;
  const resultR = round(fR * alpha + bR * (1 - alpha));
  const resultG = round(fG * alpha + bG * (1 - alpha));
  const resultB = round(fB * alpha + bB * (1 - alpha));
  
  const [resultH, resultS, resultL] = rgbToHsl(resultR, resultG, resultB);
  
  return `hsl(${resultH}, ${resultS}%, ${resultL}%)`;
};

export { hslAddLightness, hslAddDarkness, rgbToHsl, hslToRgb, hslIsMoreDark, hslMix };
