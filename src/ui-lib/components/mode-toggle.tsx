import React from "react";

import { cn } from "@/utils-ui-lib/classnames";
import { useTheme } from "@/hooks-ui-lib/use-theme";
import { MoonIcon } from "@/icons-ui-lib/moon-icon";
import { SunIcon } from "@/icons-ui-lib/sun-icon";

import { Button } from "./button";

type ModeToggleProps = {
  key?: string;
  iconClassName?: string;
  onToggleTheme?: () => void;
};

const ModeToggle = ({ key = "atomic::theme", onToggleTheme, iconClassName }: ModeToggleProps) => {
  const [, toggleTheme] = useTheme({ key, onToggleTheme });

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <SunIcon className={cn("size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0", iconClassName)}  />
      <MoonIcon className={cn("absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100", iconClassName)} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export { ModeToggle };
