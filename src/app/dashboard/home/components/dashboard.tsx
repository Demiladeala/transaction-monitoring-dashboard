"use client";

import type { TooltipContentProps } from "recharts";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  CHART_DATA_FLAGGED,
  CHART_DATA_TRANSACTIONS,
  MOCK_METRICS,
} from "@/src/lib/mock-data";
import { ChartCard } from "@/src/components/dashboard/chart-card";
import { MetricsCard } from "@/src/components/dashboard/metrics-card";

const TRANSACTIONS_COLOR = "#0D4CA3";
const FLAGGED_COLOR = "#FF3B30";

function makeTooltip(color: string) {
  return function ChartTooltip({ active, payload }: TooltipContentProps) {
    if (!active || !payload?.length) return null;
    return (
      <div
        style={{ backgroundColor: color }}
        className="flex h-9 w-15 items-center justify-center rounded-full text-sm font-semibold text-white shadow-md"
      >
        {payload[0].value as number}
      </div>
    );
  };
}

const TransactionsTooltip = makeTooltip(TRANSACTIONS_COLOR);
const FlaggedTooltip = makeTooltip(FLAGGED_COLOR);

export default function Dashboard() {
  return (
    <div className="space-y-4">
      {/* Metrics Section */}
      <div className="w-full lg:border border-stroke2 lg:rounded-[10px] lg:p-3.5">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Metrics</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_METRICS.map((metric, index) => (
            <MetricsCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              highlight={metric.highlight}
              isLast={index === MOCK_METRICS.length - 1}
            />
          ))}
        </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        {/* Transactions Chart */}
        <ChartCard title="Transactions">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={CHART_DATA_TRANSACTIONS}
              margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                padding={{ left: 0, right: 0 }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                cursor={{
                  stroke: TRANSACTIONS_COLOR,
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                content={TransactionsTooltip}
                position={{ y: 0 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={TRANSACTIONS_COLOR}
                strokeWidth={2}
                fill="#E7EEF6"
                fillOpacity={1}
                dot={false}
                activeDot={{ r: 4, fill: TRANSACTIONS_COLOR }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Flagged Transactions Chart */}
        <ChartCard title="Flagged transactions">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={CHART_DATA_FLAGGED}
              margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                padding={{ left: 0, right: 0 }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                cursor={{
                  stroke: FLAGGED_COLOR,
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                content={FlaggedTooltip}
                position={{ y: 0 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={FLAGGED_COLOR}
                strokeWidth={2}
                fill="#FFECEA"
                fillOpacity={1}
                dot={false}
                activeDot={{ r: 4, fill: FLAGGED_COLOR }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
