import {
  Activity,
  ArrowLeftRight,
  Clock3,
  ShieldAlert,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import type { TransactionRecord } from "@/src/lib/transactions-data";
import {
  indicatorStyles,
  riskStyles,
  statusStyles,
  currencyFormatter,
} from "@/src/lib/transactions-data";
import { cn } from "@/src/lib/utils";

interface TransactionDrawerProps {
  transaction: TransactionRecord | null;
  onClose: () => void;
}

function DrawerSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof UserRound;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-stroke2 bg-panelSurface p-4">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </div>
      {children}
    </section>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-stroke2 bg-panelSurface p-3">
      <div className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-slate-900">{value}</div>
    </div>
  );
}

export function TransactionDrawer({
  transaction,
  onClose,
}: TransactionDrawerProps) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close transaction details"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-y-auto rounded-l-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-stroke2 bg-panelSurface px-5 py-4">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Transaction details
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              {transaction.customerName}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close transaction details"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <section className="rounded-2xl border border-stroke2 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Amount</p>
                <div className="text-2xl font-semibold text-slate-900">
                  {currencyFormatter.format(transaction.amount)}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                    statusStyles[transaction.status],
                  )}
                >
                  {transaction.status}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                    riskStyles[transaction.riskLevel],
                  )}
                >
                  Risk: {transaction.riskLevel}
                </span>
              </div>
            </div>
          </section>

          <DrawerSection title="Customer details" icon={UserRound}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailField label="Email" value={transaction.email} />
              <DetailField label="Account" value={transaction.account} />
              <DetailField label="Location" value={transaction.location} />
              <DetailField label="Channel" value={transaction.channel} />
              <DetailField label="Merchant" value={transaction.merchant} />
              <DetailField label="Device" value={transaction.device} />
            </div>
          </DrawerSection>

          <DrawerSection title="Transaction history" icon={ArrowLeftRight}>
            <div className="space-y-3">
              {transaction.history.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-stroke2 bg-white p-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium text-slate-900">
                        {item.label}
                      </div>
                      <div className="text-sm text-slate-500">
                        {item.detail}
                      </div>
                    </div>
                    <div className="text-xs font-medium text-slate-400">
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DrawerSection>

          <DrawerSection title="Risk indicators" icon={ShieldAlert}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {transaction.indicators.map((indicator) => (
                <div
                  key={indicator.label}
                  className={cn(
                    "rounded-xl border px-3 py-4",
                    indicatorStyles[indicator.tone],
                  )}
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] opacity-75">
                    {indicator.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold">
                    {indicator.value}
                  </div>
                </div>
              ))}
            </div>
          </DrawerSection>

          <DrawerSection title="Timeline / activity" icon={Activity}>
            <div className="space-y-4">
              {transaction.timeline.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="mt-1 h-3 w-3 rounded-full bg-primary" />
                    {index !== transaction.timeline.length - 1 && (
                      <div className="h-full w-px bg-stroke2" />
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-medium text-slate-900">
                        {item.title}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock3 className="h-3.5 w-3.5" />
                        {item.time}
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DrawerSection>

          <section className="rounded-2xl border border-stroke2 bg-panelSurface p-4 text-sm text-slate-500">
            <div className="flex items-center gap-2 font-medium text-slate-700">
              <Wallet className="h-4 w-4 text-primary" />
              Transaction ID: {transaction.id}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
