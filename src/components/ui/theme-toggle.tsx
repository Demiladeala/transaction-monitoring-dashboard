"use client";
import { useThemeStore } from "@/src/features/theme/theme-store";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const nextThemeLabel =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={nextThemeLabel}
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-neutral50 dark:bg-black dark:text-white"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
