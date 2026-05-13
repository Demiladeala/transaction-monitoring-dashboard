"use client";
import { useThemeStore } from "@/src/features/theme/theme-store";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const nextThemeLabel =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={nextThemeLabel}
      onClick={toggleTheme}
      className="group relative grid h-10 w-10 place-items-center rounded-full border border-transparent transition-all duration-200 hover:bg-slate-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
    >
      <Sun
        aria-hidden="true"
        className={`absolute h-4.5 w-4.5 transition-all duration-300 ${
          isDark
            ? "scale-50 -rotate-45 opacity-0 text-amber-400"
            : "scale-100 rotate-0 opacity-100 text-amber-400"
        }`}
      />
      <Moon
        aria-hidden="true"
        className={`absolute h-4.5 w-4.5 transition-all duration-300 ${
          isDark
            ? "scale-100 rotate-0 opacity-100 text-primary"
            : "scale-50 rotate-45 opacity-0 text-primary"
        }`}
      />
    </button>
  );
}
