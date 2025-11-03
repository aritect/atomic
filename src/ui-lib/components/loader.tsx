import React, { type FC } from "react";

import { LoaderIcon } from "@/icons-ui-lib/loader-icon";
import { cn } from "@/utils-ui-lib/classnames";

interface LoaderProps {
  className?: string;
}

const Loader: FC<LoaderProps> = ({ className }) => <LoaderIcon className={cn("animate-spin", className)} />;

Loader.displayName = "Loader";

export { Loader };
