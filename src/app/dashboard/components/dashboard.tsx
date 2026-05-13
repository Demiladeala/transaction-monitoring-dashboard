"use client";

import { useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAuthStore } from "@/src/lib/stores/auth";
import {
  CHART_DATA_FLAGGED,
  CHART_DATA_TRANSACTIONS,
  MOCK_METRICS,
} from "@/src/lib/mock-data";
import { ChartCard } from "@/src/components/dashboard/chart-card";
import { MetricsCard } from "@/src/components/dashboard/metrics-card";

export default function Dashboard() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const router = useRouter();
  const transactionsGradientId = useId();
  const flaggedGradientId = useId();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Metrics Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Metrics</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_METRICS.map((metric) => (
            <MetricsCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              highlight={metric.highlight}
            />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        {/* Transactions Chart */}
        <ChartCard title="Transactions">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={CHART_DATA_TRANSACTIONS}>
              <defs>
                <linearGradient
                  id={transactionsGradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                stroke="#999"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#999" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                fillOpacity={1}
                fill={`url(#${transactionsGradientId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Flagged Transactions Chart */}
        <ChartCard title="Flagged transactions">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={CHART_DATA_FLAGGED}>
              <defs>
                <linearGradient
                  id={flaggedGradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                stroke="#999"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#999" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                fillOpacity={1}
                fill={`url(#${flaggedGradientId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
