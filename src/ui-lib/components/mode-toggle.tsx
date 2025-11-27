import React from "react";

import { cn } from "@/utils-ui-lib/classnames";
import { useTheme } from "@/hooks-ui-lib/use-theme";
import { MoonIcon } from "@/icons-ui-lib/moon-icon";
import { BeachIcon } from "@/icons-ui-lib/beach-icon";

import { Button } from "./button";

type ModeToggleProps = {
  key?: string;
  iconClassName?: string;
  onToggleTheme?: () => void;
};

const ModeToggle = ({ key = "atomic::theme", onToggleTheme, iconClassName }: ModeToggleProps) => {
  const [, toggleTheme] = useTheme({ key, onToggleTheme });

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="h-7 w-7">
      <BeachIcon className={cn("size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0", iconClassName)}  />
      <MoonIcon className={cn("absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100", iconClassName)} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export { ModeToggle };
