"use client";

import { useEffect, useMemo, useState } from "react";
import type { RiskLevel, TransactionStatus } from "@/src/lib/transactions-data";
import {
  generatedTransactions,
  riskOptions,
  statusOptions,
} from "@/src/lib/transactions-data";

export function useTransactions() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | TransactionStatus>(
    "All",
  );
  const [riskFilter, setRiskFilter] = useState<"All" | RiskLevel>("All");
  const [pageSize, setPageSize] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsPolling(true);
      window.setTimeout(() => setIsPolling(false), 750);
    }, 15000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!selectedTransactionId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedTransactionId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTransactionId]);

  const filteredTransactions = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    return generatedTransactions.filter((transaction) => {
      const matchesQuery =
        lowerQuery.length === 0 ||
        [
          transaction.id,
          transaction.customerName,
          transaction.email,
          transaction.merchant,
          transaction.location,
        ]
          .join(" ")
          .toLowerCase()
          .includes(lowerQuery);

      const matchesStatus =
        statusFilter === "All" || transaction.status === statusFilter;
      const matchesRisk =
        riskFilter === "All" || transaction.riskLevel === riskFilter;

      return matchesQuery && matchesStatus && matchesRisk;
    });
  }, [query, riskFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / pageSize),
  );

  useEffect(() => {
    setCurrentPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const currentTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [currentPage, filteredTransactions, pageSize]);

  const selectedTransaction = useMemo(
    () =>
      generatedTransactions.find(
        (transaction) => transaction.id === selectedTransactionId,
      ) ?? null,
    [selectedTransactionId],
  );

  const pageRange = useMemo(() => {
    if (filteredTransactions.length === 0) {
      return { start: 0, end: 0 };
    }
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, filteredTransactions.length);
    return { start, end };
  }, [currentPage, pageSize, filteredTransactions.length]);

  return {
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    riskFilter,
    setRiskFilter,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    selectedTransactionId,
    setSelectedTransactionId,
    isPolling,
    filteredTransactions,
    currentTransactions,
    selectedTransaction,
    pageRange,
    totalPages,
    statusOptions,
    riskOptions,
  };
}
