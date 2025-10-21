"use client";
import { useTheme as useNextTheme } from "next-themes";
import { getIsDarkMode } from "@/lib/utils";

export function useTheme() {
  const { theme } = useNextTheme();

  if (theme === "system") {
    if (getIsDarkMode()) {
      return "dark";
    }
    return "light";
  }

  return theme;
}
