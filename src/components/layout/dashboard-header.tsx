"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";
import {
  Bell,
  CheckCheck,
  Home,
  LogOut,
  Menu,
  UserRound,
  Wallet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useAuthStore } from "@/src/lib/stores/auth";

type HeaderVariant = "dashboard" | "transactions";

interface DashboardHeaderProps {
  variant: HeaderVariant;
  onMenuClick?: () => void;
}

const headerConfig: Record<
  HeaderVariant,
  { title: string; Icon: typeof Home }
> = {
  dashboard: {
    title: "Dashboard",
    Icon: Home,
  },
  transactions: {
    title: "Transactions",
    Icon: Wallet,
  },
};

export function DashboardHeader({
  variant,
  onMenuClick,
}: DashboardHeaderProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { title, Icon } = headerConfig[variant];

  const notifications = useMemo(
    () => [
      {
        id: "n1",
        title: "High-risk transfer flagged",
        description: "$8,420 transfer from Apex Logistics is awaiting review.",
        time: "2m ago",
        unread: true,
      },
      {
        id: "n2",
        title: "Daily scan completed",
        description: "412 transactions scanned with 6 anomalies detected.",
        time: "35m ago",
        unread: true,
      },
      {
        id: "n3",
        title: "Weekly report ready",
        description: "Compliance summary for this week has been generated.",
        time: "1h ago",
        unread: false,
      },
    ],
    [],
  );

  const unreadCount = notifications.filter((item) => item.unread).length;

  const initials = useMemo(() => {
    const name = user?.name?.trim();
    if (!name) return "OD";

    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }, [user?.name]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="mb-4 w-full border-b border-stroke2 bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            onClick={onMenuClick}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Icon className="h-5 w-5" strokeWidth={1} />
          <h1 className="text-base font-normal text-[#262526] ">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open notifications"
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent"
                >
                  <Bell size={20} />
                  {unreadCount > 0 ? (
                    <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-error text-[10px] font-semibold leading-none text-white">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  ) : null}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[320px] p-2">
                <DropdownMenuLabel className="flex items-center justify-between text-slate-900">
                  Notifications
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {unreadCount} unread
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    className="items-start gap-3 rounded-lg px-3 py-2"
                  >
                    <span
                      className={
                        item.unread
                          ? "mt-1.5 h-2 w-2 rounded-full bg-primary"
                          : "mt-1.5 h-2 w-2 rounded-full bg-slate-300"
                      }
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                        {item.description}
                      </p>
                      <p className="mt-1 text-[11px] font-medium text-slate-400">
                        {item.time}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center gap-2 font-medium text-primary">
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open profile menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 px-3 text-sm font-semibold uppercase text-white"
                >
                  {initials}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-1">
                <DropdownMenuLabel className="pb-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {user?.name ?? "Dashboard User"}
                  </p>
                  <p className="truncate text-xs font-normal text-slate-500">
                    {user?.email ?? "user@example.com"}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserRound className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
