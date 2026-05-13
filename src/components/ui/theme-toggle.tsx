"use client";
import { useThemeStore } from "@/src/features/theme/theme-store";

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="rounded px-3 py-1 border border-gray-300 dark:border-neutral50 bg-white dark:bg-black text-black dark:text-white transition-colors"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
