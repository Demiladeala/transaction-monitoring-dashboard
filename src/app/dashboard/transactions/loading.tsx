export default function TransactionsLoading() {
  return (
    <main className="mx-auto w-full space-y-4 bg-white">
      <section className="rounded-xl border border-stroke2 bg-panelSurface p-4 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-md">
            <p className="mb-1 block text-xs font-medium text-slate-500">
              Search transactions
            </p>
            <div className="h-11 w-full animate-pulse rounded-xl border border-stroke2 bg-white" />
          </div>
          <div className="flex flex-wrap gap-2">
            <div>
              <p className="mb-1 text-xs font-medium text-slate-500">Status</p>
              <div className="h-11 w-36 animate-pulse rounded-xl border border-stroke2 bg-white" />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-slate-500">Risk</p>
              <div className="h-11 w-36 animate-pulse rounded-xl border border-stroke2 bg-white" />
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-stroke2 bg-white">
        <div className="border-b border-stroke2 bg-panelSurface p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Customer Name
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Amount
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Risk Level
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Status
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Date
            </p>
          </div>
        </div>
        <div className="divide-y divide-stroke2">
          {["row-1", "row-2", "row-3", "row-4", "row-5", "row-6", "row-7"].map(
            (key) => (
              <div
                key={key}
                className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-5"
              >
                <div className="space-y-2">
                  <div className="h-4 w-36 animate-pulse rounded bg-slate-300/80" />
                  <div className="h-3 w-28 animate-pulse rounded bg-slate-200/90" />
                </div>
                <div className="h-4 w-24 animate-pulse rounded bg-slate-300/80" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-300/80" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-300/80" />
                <div className="h-4 w-24 animate-pulse rounded bg-slate-300/80" />
              </div>
            ),
          )}
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-stroke2 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="font-medium text-slate-700">Loading results...</span>
          <div className="h-2 w-2 rounded-full bg-slate-300" />
          <span>Results per page</span>
          <div className="h-9 w-16 animate-pulse rounded-lg border border-stroke2 bg-slate-200/80" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 animate-pulse rounded-lg border border-stroke2 bg-slate-200/80" />
          <div className="h-5 w-12 animate-pulse rounded bg-slate-200/80" />
          <div className="h-9 w-9 animate-pulse rounded-lg border border-stroke2 bg-slate-200/80" />
        </div>
      </section>
    </main>
  );
}
