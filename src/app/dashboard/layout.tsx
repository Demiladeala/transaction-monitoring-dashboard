import type { ReactNode } from "react";
import { DashboardHeader } from "@/src/components/layout/dashboard-header";
import { Sidebar } from "@/src/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="mx-auto flex w-full bg-white ">
        <Sidebar />

        <main className="min-w-0 flex-1 border border-slate-200 bg-white">
          <DashboardHeader variant="dashboard" />
          <div className="px-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
