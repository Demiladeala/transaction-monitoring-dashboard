"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Search,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/src/lib/utils";

const navItems = [
  { href: "/dashboard/home", label: "Home", icon: Home },
  { href: "/dashboard/transactions", label: "Transactions", icon: Wallet },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeItem = useMemo(
    () =>
      navItems.find(
        (item) =>
          pathname === item.href || pathname.startsWith(`${item.href}/`),
      )?.href,
    [pathname],
  );

  return (
    <aside
      className={cn(
        "hidden h-screen shrink-0 flex-col overflow-x-hidden bg-panelSurface p-4 transition-[width] duration-300 ease-in-out lg:flex",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <Link
            href="/dashboard/home"
            className={cn(
              "truncate text-2xl font-semibold uppercase tracking-wide text-primary transition-all duration-200",
              isCollapsed
                ? "max-w-0 -translate-x-1 opacity-0"
                : "max-w-40 translate-x-0 opacity-100",
            )}
          >
            LOGO
          </Link>
        </div>

        <button
          type="button"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="relative top-[-2] flex m-0 p-0 justify-center bg-transparent hover:bg-transparent cursor-pointer text-[#ADAAAA]"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="mt-2 mb-4">
        <button
          type="button"
          className={cn(
            "group relative flex h-10 w-full items-center rounded-lg border border-stroke bg-white px-3 text-slate-500 transition-all duration-300",
            isCollapsed ? "justify-center px-0" : "justify-start gap-2",
          )}
          aria-label="Search"
        >
          <Search className="h-4 w-4 text-[#939090]" />
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap text-sm transition-all duration-200",
              isCollapsed ? "max-w-0 opacity-0" : "max-w-30 opacity-100",
            )}
          >
            Search...
          </span>

          {!isCollapsed && (
            <span className="ml-auto flex items-center gap-1 text-xs text-[#939090]">
              <kbd className="h-6 rounded flex items-center justify-center border border-[#F4F0EF] bg-white px-1.5 py-0.5 font-medium tracking-[-0.1rem]">
                Ctrl
              </kbd>
              <kbd className="h-6 rounded flex items-center justify-center border border-[#F4F0EF] bg-white px-1.5 py-0.5 font-medium">
                ⌘
              </kbd>
              <kbd className="h-6 rounded flex items-center justify-center border border-[#F4F0EF] bg-white px-1.5 py-0.5 font-medium">
                K
              </kbd>
            </span>
          )}

          {isCollapsed && (
            <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-800 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              Search
            </span>
          )}
        </button>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center rounded-lg text-sm font-medium transition-all duration-300",
                isCollapsed
                  ? "justify-center p-2.5"
                  : "justify-start gap-2.5 p-2.5",
                isActive
                  ? "border border-[#D8E2FF] bg-white text-primary shadow-[0px_1px_2px_0px_#1018280D]"
                  : "text-slate-700 hover:bg-slate-100",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span
                className={cn(
                  "overflow-hidden whitespace-nowrap transition-all duration-200",
                  isCollapsed ? "max-w-0 opacity-0" : "max-w-35 opacity-100",
                )}
              >
                {item.label}
              </span>

              {isCollapsed && (
                <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-800 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-200 pt-3">
        <button
          className={cn(
            "group relative flex w-full items-center rounded-lg p-2.5 text-sm font-medium text-red-600 transition-all duration-300 hover:bg-red-50",
            isCollapsed ? "justify-center" : "justify-start gap-2.5",
          )}
          type="button"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all duration-200",
              isCollapsed ? "max-w-0 opacity-0" : "max-w-30 opacity-100",
            )}
          >
            Logout
          </span>

          {isCollapsed && (
            <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-800 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
