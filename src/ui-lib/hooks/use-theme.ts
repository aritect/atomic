import { useCallback, useEffect } from "react";

import { useLocalStorage } from "@alxshelepenok/react-hooks";

import { debounce } from "@/utils-ui-lib/debounce";

const useTheme = ({ key = "atomic::theme", onToggleTheme }: { key?: string, onToggleTheme?: () => void } = {}): ["dark" | "light", () => void, (theme: "dark" | "light") => void] => {
  const isSystemDarkTheme = typeof window !== "undefined"
    && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialTheme = isSystemDarkTheme ? "dark" : "light";

  const [theme, setTheme] = useLocalStorage<"dark" | "light" | undefined>(
    key,
    initialTheme,
    { raw: true },
  );

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    onToggleTheme?.();
  };

  const handleAddTransitionProperty = useCallback(() => {
    document.documentElement.style.setProperty("--transition-duration", "0");
  }, []);

  const handleRemoveTransitionProperty = useCallback(
    debounce(() => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => document.documentElement.style.removeProperty("--transition-duration"));
      } else {
        document.documentElement.style.removeProperty("--transition-duration");
      }
    }),
    [],
  );

  const handleSetTheme = useCallback((theme: "dark" | "light") => {
    setTheme(theme);
  }, [setTheme]);

  useEffect(() => {
    if (theme) {
      handleAddTransitionProperty();
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      handleRemoveTransitionProperty();
    }
  }, [theme, handleRemoveTransitionProperty]);

  return [theme || initialTheme, toggleTheme, handleSetTheme];
};

export { useTheme };
