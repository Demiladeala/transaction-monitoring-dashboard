import type { ReactNode } from "react";
import Link from "next/link";

const navItems = [
  { href: "/dashboard/home", label: "Home" },
  { href: "/transactions", label: "Transactions" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 rounded-xl border border-slate-200 bg-white p-4 lg:block">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Dashboard
          </p>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <h1 className="text-2xl font-semibold text-slate-900">
              Dashboard Home
            </h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
