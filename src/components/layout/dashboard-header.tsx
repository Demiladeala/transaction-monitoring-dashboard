import { ThemeToggle } from "@/src/components/ui/theme-toggle";
import { Bell, Home, Wallet } from "lucide-react";

type HeaderVariant = "dashboard" | "transactions";

interface DashboardHeaderProps {
  variant: HeaderVariant;
  notificationCount?: number;
  initials?: string;
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
  notificationCount = 3,
  initials = "OD",
}: DashboardHeaderProps) {
  const { title, Icon } = headerConfig[variant];

  return (
    <header className="mb-6 flex items-center justify-between border-b border-slate-200 border-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="flex items-center gap-3 rounded-xl bg-primary px-3 py-2 text-white">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            ) : null}
          </button>

          <div className="flex h-9 min-w-9 items-center justify-center rounded-full bg-primary-500 px-3 text-sm font-semibold uppercase text-white">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
