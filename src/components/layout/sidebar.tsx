"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Search,
  Wallet,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/src/lib/utils";
import { useAuthStore } from "@/src/lib/stores/auth";

const navItems = [
  { href: "/dashboard/home", label: "Home", icon: Home },
  { href: "/dashboard/transactions", label: "Transactions", icon: Wallet },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

function LogoutDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mb-1 text-lg font-semibold text-slate-900">
            Log out?
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Are you sure you want to log out? You&apos;ll need to sign in again
            to access your dashboard.
          </p>
          <div className="flex w-full gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarInner({
  isCollapsed,
  setIsCollapsed,
  activeItem,
  onNavClick,
  isMobile,
}: {
  isCollapsed: boolean;
  setIsCollapsed?: (v: boolean) => void;
  activeItem: string | undefined;
  onNavClick?: () => void;
  isMobile?: boolean;
}) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {showLogoutDialog && (
        <LogoutDialog
          onCancel={() => setShowLogoutDialog(false)}
          onConfirm={handleLogout}
        />
      )}

      {/* Logo + collapse toggle */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <Link
            href="/dashboard/home"
            onClick={onNavClick}
            className={cn(
              "truncate text-2xl font-semibold uppercase tracking-wide text-primary transition-all duration-200",
              isCollapsed && !isMobile
                ? "max-w-0 -translate-x-1 opacity-0"
                : "max-w-40 translate-x-0 opacity-100",
            )}
          >
            LOGO
          </Link>
        </div>

        {!isMobile && setIsCollapsed && (
          <button
            type="button"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="relative top-[-2] flex m-0 p-0 justify-center bg-transparent hover:bg-transparent cursor-pointer text-[#ADAAAA]"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mt-2 mb-4">
        <button
          type="button"
          className={cn(
            "group relative flex h-10 w-full items-center rounded-lg border border-stroke bg-white px-3 text-slate-500 transition-all duration-300",
            isCollapsed && !isMobile
              ? "justify-center px-0"
              : "justify-start gap-2",
          )}
          aria-label="Search"
        >
          <Search className="h-4 w-4 text-[#939090]" />
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap text-sm transition-all duration-200",
              isCollapsed && !isMobile
                ? "max-w-0 opacity-0"
                : "max-w-30 opacity-100",
            )}
          >
            Search...
          </span>

          {(!isCollapsed || isMobile) && (
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

          {isCollapsed && !isMobile && (
            <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-800 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              Search
            </span>
          )}
        </button>
      </div>

      {/* Nav items */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={cn(
                "group relative flex items-center rounded-lg text-sm font-medium transition-all duration-300",
                isCollapsed && !isMobile
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
                  isCollapsed && !isMobile
                    ? "max-w-0 opacity-0"
                    : "max-w-35 opacity-100",
                )}
              >
                {item.label}
              </span>

              {isCollapsed && !isMobile && (
                <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-800 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto border-t border-slate-200 pt-3">
        <button
          type="button"
          onClick={() => setShowLogoutDialog(true)}
          className={cn(
            "group relative flex w-full items-center rounded-lg p-2.5 text-sm font-medium text-red-600 transition-all duration-300 hover:bg-red-50",
            isCollapsed && !isMobile
              ? "justify-center"
              : "justify-start gap-2.5",
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all duration-200",
              isCollapsed && !isMobile
                ? "max-w-0 opacity-0"
                : "max-w-30 opacity-100",
            )}
          >
            Logout
          </span>

          {isCollapsed && !isMobile && (
            <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-800 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              Logout
            </span>
          )}
        </button>
      </div>
    </>
  );
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
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
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className={cn(
          "hidden h-screen shrink-0 flex-col overflow-x-hidden bg-panelSurface p-4 transition-[width] duration-300 ease-in-out lg:flex",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <SidebarInner
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          activeItem={activeItem}
        />
      </aside>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* ── Mobile drawer panel ── */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-72 flex-col overflow-y-auto bg-panelSurface p-4 shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={onMobileClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200"
        >
          <X className="h-4 w-4" />
        </button>

        <SidebarInner
          isCollapsed={false}
          activeItem={activeItem}
          onNavClick={onMobileClose}
          isMobile
        />
      </div>
    </>
  );
}
