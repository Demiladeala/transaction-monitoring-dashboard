import { Filter, Loader2, Search, ShieldCheck } from "lucide-react";
import type { RiskLevel, TransactionStatus } from "@/src/lib/transactions-data";

interface TransactionsFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  statusFilter: "All" | TransactionStatus;
  onStatusChange: (value: "All" | TransactionStatus) => void;
  riskFilter: "All" | RiskLevel;
  onRiskChange: (value: "All" | RiskLevel) => void;
  isPolling: boolean;
  statusOptions: Array<"All" | TransactionStatus>;
  riskOptions: Array<"All" | RiskLevel>;
}

export function TransactionsFilters({
  query,
  onQueryChange,
  statusFilter,
  onStatusChange,
  riskFilter,
  onRiskChange,
  isPolling,
  statusOptions,
  riskOptions,
}: TransactionsFiltersProps) {
  return (
    <div className="border-b border-stroke2 bg-panelSurface p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-[#C9C6C5]" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search transactions"
            className="h-11 w-full rounded-xl border border-stroke2 bg-white dark:bg-[#1C1B1B] dark:placeholder:text-[#C9C6C5] pl-9 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 dark:text-[#C9C6C5] focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex h-11 items-center gap-2 rounded-xl border border-stroke2 bg-white dark:bg-[#1C1B1B] px-3 text-sm text-slate-500">
            <Filter className="h-4 w-4 text-slate-400 dark:text-[#C9C6C5]" />
            <select
              value={statusFilter}
              onChange={(event) =>
                onStatusChange(event.target.value as "All" | TransactionStatus)
              }
              className="bg-transparent text-slate-700 dark:text-[#C9C6C5] outline-none"
              aria-label="Filter by status"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  Status: {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex h-11 items-center gap-2 rounded-xl border border-stroke2 bg-white dark:bg-[#1C1B1B] px-3 text-sm text-slate-500">
            <ShieldCheck className="h-4 w-4 text-slate-400 dark:text-[#C9C6C5]" />
            <select
              value={riskFilter}
              onChange={(event) =>
                onRiskChange(event.target.value as "All" | RiskLevel)
              }
              className="bg-transparent text-slate-700 dark:text-[#C9C6C5] outline-none"
              aria-label="Filter by risk"
            >
              {riskOptions.map((option) => (
                <option key={option} value={option}>
                  Risk: {option}
                </option>
              ))}
            </select>
          </div>

          {isPolling && (
            <div className="flex h-11 items-center gap-2 rounded-xl border border-stroke2 bg-white dark:bg-[#1C1B1B] px-3 text-sm text-slate-600 dark:text-[#C9C6C5]">
              <Loader2 className="h-4 w-4 animate-spin text-primary dark:text-[#C9C6C5]" />
              Refreshing
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
