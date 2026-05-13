import { MOCK_METRICS } from "@/src/lib/mock-data";

export default function HomeLoading() {
  return (
    <main className="mx-auto w-full space-y-6 bg-white">
      <section className="rounded-xl p-4 sm:p-6 lg:border border-stroke2">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Metrics</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_METRICS.map((metric) => (
            <div
              key={metric.title}
              className="rounded-lg border border-stroke p-4 sm:p-6 lg:rounded-none lg:border-0 lg:border-r lg:border-gray-200 lg:p-0"
            >
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                {metric.title}
              </h3>
              <div
                className="h-8 w-24 animate-pulse rounded-md bg-slate-300/80 sm:h-9"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {["Transactions", "Flagged transactions"].map((title) => (
          <section
            key={title}
            className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <div className="h-75 w-full rounded-lg border border-stroke2 bg-panelSurface/20 p-4">
              <div
                className="h-full w-full animate-pulse rounded-md bg-slate-300/80"
                aria-hidden="true"
              />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
