import { DashboardHeader } from "@/src/components/layout/dashboard-header";

export default function Transactions() {
  return (
    <main className="mx-auto w-full bg-white p-4 sm:p-6 md:p-8">
      <DashboardHeader variant="transactions" />

      <section className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
        Transactions content goes here.
      </section>
    </main>
  );
}
