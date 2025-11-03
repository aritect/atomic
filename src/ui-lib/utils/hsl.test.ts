import { expect, test, describe } from "bun:test";

import { hslToRgb, rgbToHsl } from "./hsl";

describe("hsl: rgbToHsl", () => {
  test("converts black to HSL correctly", () => {
    expect(rgbToHsl(0, 0, 0)).toEqual([0, 0, 0]);
  });

  test("converts white to HSL correctly", () => {
    expect(rgbToHsl(255, 255, 255)).toEqual([0, 0, 100]);
  });

  test("converts red to HSL correctly", () => {
    expect(rgbToHsl(255, 0, 0)).toEqual([0, 100, 50]);
  });

  test("converts green to HSL correctly", () => {
    expect(rgbToHsl(0, 255, 0)).toEqual([120, 100, 50]);
  });

  test("converts blue to HSL correctly", () => {
    expect(rgbToHsl(0, 0, 255)).toEqual([240, 100, 50]);
  });

  test("handles maximum RGB values correctly", () => {
    expect(rgbToHsl(255, 255, 255)).toEqual([0, 0, 100]);
  });

  test("handles minimum RGB values correctly", () => {
    expect(rgbToHsl(0, 0, 0)).toEqual([0, 0, 0]);
  });
});

describe("hsl: hslToRgb", () => {
  test("converts HSL black to RGB correctly", () => {
    expect(hslToRgb(0, 0, 0)).toEqual([0, 0, 0]);
  });

  test("converts HSL whteste to RGB correctly", () => {
    expect(hslToRgb(0, 0, 100)).toEqual([255, 255, 255]);
  });

  test("converts HSL red to RGB correctly", () => {
    expect(hslToRgb(0, 100, 50)).toEqual([255, 0, 0]);
  });

  test("converts HSL green to RGB correctly", () => {
    expect(hslToRgb(120, 100, 50)).toEqual([0, 255, 0]);
  });

  test("converts HSL blue to RGB correctly", () => {
    expect(hslToRgb(240, 100, 50)).toEqual([0, 0, 255]);
  });

  test("handles HSL 0 saturation correctly", () => {
    expect(hslToRgb(0, 0, 50)).toEqual([128, 128, 128]);
  });

  test("handles HSL 100% lightness correctly", () => {
    expect(hslToRgb(0, 100, 100)).toEqual([255, 255, 255]);
  });

  test("handles HSL 0% lightness correctly", () => {
    expect(hslToRgb(0, 100, 0)).toEqual([0, 0, 0]);
  });
});
