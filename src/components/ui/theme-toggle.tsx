"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle color theme"
      suppressHydrationWarning
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-7 w-16 shrink-0 cursor-pointer items-center rounded-full border border-slate-200 bg-slate-100 px-0.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-slate-700 dark:bg-slate-800"
    >
      {/* track icons */}
      <Sun
        className="absolute left-1.5 h-3.5 w-3.5 text-amber-400 transition-opacity duration-200 dark:opacity-30"
        aria-hidden="true"
      />
      <Moon
        className="absolute right-1.5 h-3.5 w-3.5 text-slate-400 transition-opacity duration-200 opacity-30 dark:text-primary dark:opacity-100"
        aria-hidden="true"
      />

      {/* sliding thumb */}
      <span className="relative z-10 flex h-5.5 w-5.5 translate-x-0 items-center justify-center rounded-full bg-white shadow-sm ring-0 transition-transform duration-300 dark:translate-x-9 dark:bg-slate-950">
        <Sun
          className="h-3 w-3 text-amber-400 transition-opacity duration-200 dark:opacity-0"
          aria-hidden="true"
        />
        <Moon
          className="absolute h-3 w-3 text-primary opacity-0 transition-opacity duration-200 dark:opacity-100"
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
