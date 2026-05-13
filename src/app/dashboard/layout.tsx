"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { DashboardHeader } from "@/src/components/layout/dashboard-header";
import { Sidebar } from "@/src/components/layout/sidebar";
import { useAuthStore } from "@/src/lib/stores/auth";
import { useLocalStorage } from "@/src/hooks/use-local-storage";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isLogin] = useLocalStorage<boolean>("isLogin", false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    setIsAuthChecked(true);
  }, []);

  useEffect(() => {
    if (isAuthChecked && !isLoggedIn && !isLogin) {
      router.replace("/");
    }
  }, [isAuthChecked, isLoggedIn, isLogin, router]);

  const headerVariant = pathname.startsWith("/dashboard/transactions")
    ? "transactions"
    : "dashboard";

  if (!isAuthChecked || (!isLoggedIn && !isLogin)) {
    return null;
  }

  return (
    <div>
      <div className="mx-auto flex w-full bg-white">
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <main className="min-w-0 h-screen overflow-y-auto flex-1 border-l border-stroke bg-white dark:bg-[#1C1B1B]">
          <DashboardHeader
            variant={headerVariant}
            onMenuClick={() => setMobileOpen(true)}
          />
          <div className="px-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
