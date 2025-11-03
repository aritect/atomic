import type { FC, RefAttributes } from "react";
import type { IconsProps } from "@/utils-ui-lib/create-icon-component";

type Icon = FC<Omit<IconsProps, "ref"> & RefAttributes<SVGSVGElement>>;

export type { Icon };
