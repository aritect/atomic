import {
  createElement,
  type FC,
  forwardRef,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type ReactSVG,
  type RefAttributes,
  type SVGProps,
} from "react";

export type IconSvgElement = [elementName: keyof ReactSVG, attrs: Record<string, string>][];

export type IconSvgObject = IconSvgElement;

export type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export interface IconsProps extends ComponentAttributes {
  type?: "rounded" | "sharp";
  variant?: "stroke" | "solid";
  size?: string | number;
}

export type IconsIcon = ForwardRefExoticComponent<IconsProps>;

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const createIconComponent = (
  iconName: string,
  svgObjects: {[ variant: string ]: IconSvgObject},
): FC<PropsWithoutRef<IconsProps> & RefAttributes<SVGSVGElement>> => {
  const Component = forwardRef<SVGSVGElement, IconsProps>((
    {
      color = "currentColor",
      size = 24,
      strokeWidth = 1.5,
      variant = "stroke",
      type = "rounded",
      className = "",
      children,
      ...rest
    },
    ref,
  ) => {
    const elementProps = {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      strokeWidth: strokeWidth,
      color,
      className,
      ...rest,
    };

    return createElement(
      "svg",
      elementProps,
      svgObjects[`${variant}.${type}`]?.map(([tag, attrs]) => createElement(tag, { key: attrs.id, ...attrs })) ?? [],
      ...Array.isArray(children) ? children : [children],
    );
  },);

  Component.displayName = `${iconName}Icon`;

  return Component;
};

export { createIconComponent };
