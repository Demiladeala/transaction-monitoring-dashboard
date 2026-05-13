export interface Metric {
  title: string;
  value: string;
  highlight?: boolean;
}

export interface ChartPoint {
  month: string;
  value: number;
}

export const MOCK_METRICS: Metric[] = [
  { title: "Total transactions", value: "12,430" },
  { title: "Flagged transactions", value: "184", highlight: true },
  { title: "Total customers", value: "2,981" },
  { title: "Risk score summary", value: "67.89%" },
];

export const CHART_DATA_TRANSACTIONS: ChartPoint[] = [
  { month: "Jan", value: 850 },
  { month: "Feb", value: 920 },
  { month: "Mar", value: 1010 },
  { month: "Apr", value: 980 },
  { month: "May", value: 1110 },
  { month: "Jun", value: 1200 },
];

export const CHART_DATA_FLAGGED: ChartPoint[] = [
  { month: "Jan", value: 19 },
  { month: "Feb", value: 24 },
  { month: "Mar", value: 31 },
  { month: "Apr", value: 27 },
  { month: "May", value: 38 },
  { month: "Jun", value: 45 },
];
