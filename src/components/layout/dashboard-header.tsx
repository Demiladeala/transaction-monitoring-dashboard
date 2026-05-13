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
    <header className="w-full bg-white border-b border-stroke2 mb-4">
      <header className="flex items-center justify-between py-2 px-4">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5" strokeWidth={1} />
          <h1 className="text-base font-normal text-[#262526]">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div className="flex items-center gap-3 ">
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent"
            >
              <Bell size={20} />
              {notificationCount > 0 ? (
                <span className="absolute right-1 top-1 rounded-full flex items-center justify-center bg-error w-3.5 h-3.5 text-[10px] font-semibold leading-none text-white">
                  {notificationCount > 99 ? "99+" : notificationCount}
                </span>
              ) : null}
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 px-3 text-sm font-semibold uppercase text-white">
              {initials}
            </div>
          </div>
        </div>
      </header>
    </header>
  );
}
