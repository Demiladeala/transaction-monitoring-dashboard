"use client";

import { useTransactions } from "@/src/hooks/use-transactions";
import { TransactionsFilters } from "@/src/components/tables/transactions-filters";
import { TransactionsTable } from "@/src/components/tables/transactions-table";
import { TransactionDrawer } from "@/src/components/feedback/transaction-drawer";

export default function Transactions() {
  const transaction = useTransactions();

  return (
    <main className="mx-auto w-full bg-white dark:bg-[#1C1B1B] pb-5">
      <section className="overflow-hidden rounded-2xl border border-stroke2 bg-white dark:bg-[#1C1B1B] shadow-sm">
        <TransactionsFilters
          query={transaction.query}
          onQueryChange={(value) => {
            transaction.setQuery(value);
            transaction.setCurrentPage(1);
          }}
          statusFilter={transaction.statusFilter}
          onStatusChange={(value) => {
            transaction.setStatusFilter(value);
            transaction.setCurrentPage(1);
          }}
          riskFilter={transaction.riskFilter}
          onRiskChange={(value) => {
            transaction.setRiskFilter(value);
            transaction.setCurrentPage(1);
          }}
          isPolling={transaction.isPolling}
          statusOptions={transaction.statusOptions}
          riskOptions={transaction.riskOptions}
        />

        <TransactionsTable
          transactions={transaction.currentTransactions}
          selectedId={transaction.selectedTransactionId}
          onSelectRow={transaction.setSelectedTransactionId}
          isPolling={transaction.isPolling}
          pageSize={transaction.pageSize}
          onPageSizeChange={(size) => {
            transaction.setPageSize(size);
            transaction.setCurrentPage(1);
          }}
          currentPage={transaction.currentPage}
          onPageChange={transaction.setCurrentPage}
          totalPages={transaction.totalPages}
          pageStart={transaction.pageRange.start}
          pageEnd={transaction.pageRange.end}
          totalCount={transaction.filteredTransactions.length}
        />
      </section>

      <TransactionDrawer
        transaction={transaction.selectedTransaction}
        onClose={() => transaction.setSelectedTransactionId(null)}
      />
    </main>
  );
}
