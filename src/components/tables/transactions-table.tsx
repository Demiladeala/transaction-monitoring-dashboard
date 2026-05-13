import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TransactionRecord } from "@/src/lib/transactions-data";
import {
  riskStyles,
  statusStyles,
  currencyFormatter,
} from "@/src/lib/transactions-data";
import { cn } from "@/src/lib/utils";

interface TransactionsTableProps {
  transactions: TransactionRecord[];
  selectedId: string | null;
  onSelectRow: (id: string) => void;
  isPolling: boolean;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  pageStart: number;
  pageEnd: number;
  totalCount: number;
}

function PaginationArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled?: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg border border-stroke2 bg-white dark:bg-[#262526] text-slate-700 dark:text-[#C9C6C5] transition-colors hover:bg-slate-50 dark:hover:bg-[#2C2B2B] disabled:cursor-not-allowed disabled:opacity-40",
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export function TransactionsTable({
  transactions,
  selectedId,
  onSelectRow,
  isPolling,
  pageSize,
  onPageSizeChange,
  currentPage,
  onPageChange,
  totalPages,
  pageStart,
  pageEnd,
  totalCount,
}: TransactionsTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stroke">
          <thead className="bg-panelSurface text-left text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-[#C9C6C5]">
            <tr>
              <th className="px-5 py-4">Customer Name</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Risk Level</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody className={cn(isPolling && "opacity-90")}>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                tabIndex={0}
                onClick={() => onSelectRow(transaction.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelectRow(transaction.id);
                  }
                }}
                className={cn(
                  "group cursor-pointer border-b border-stroke2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-[#2C2B2B]",
                  selectedId === transaction.id &&
                    "bg-slate-50 dark:bg-[#2C2B2B]",
                )}
              >
                <td className="px-5 py-4">
                  <div className="font-medium text-slate-900 dark:text-[#C9C6C5]">
                    {transaction.customerName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-[#C9C6C5]">
                    {transaction.merchant}
                  </div>
                </td>
                <td className="px-5 py-4 font-semibold text-slate-900 dark:text-[#C9C6C5]">
                  {currencyFormatter.format(transaction.amount)}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                      riskStyles[transaction.riskLevel],
                    )}
                  >
                    {transaction.riskLevel}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                      statusStyles[transaction.status],
                    )}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-[#C9C6C5]">
                  {transaction.date}
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors group-hover:bg-slate-100 dark:group-hover:bg-[#2C2B2B] group-hover:text-slate-600 dark:group-hover:text-[#C9C6C5]">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </td>
              </tr>
            ))}

            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-16 text-center text-sm text-slate-500 dark:text-[#C9C6C5]"
                >
                  No transactions match the current search and filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-stroke p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-[#C9C6C5]">
          <span className="font-medium text-slate-700 dark:text-[#C9C6C5]">
            {pageStart}-{pageEnd} of {totalCount}
          </span>
          <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-gray-500" />
          <div className="flex items-center gap-2">
            <span>Results per page</span>
            <select
              value={pageSize}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
              className="h-9 rounded-lg border border-stroke2 bg-white dark:bg-[#262526] px-3 text-sm text-slate-700 dark:text-[#C9C6C5] outline-none"
              aria-label="Results per page"
            >
              {[9, 12, 18].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PaginationArrow
            direction="left"
            disabled={currentPage === 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          />
          <div className="flex items-baseline gap-1 text-sm">
            <span className="font-semibold text-slate-900 dark:text-[#C9C6C5]">
              {currentPage}
            </span>
            <span className="text-slate-400 dark:text-gray-400">
              / {totalPages}
            </span>
          </div>
          <PaginationArrow
            direction="right"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          />
        </div>
      </div>
    </>
  );
}
