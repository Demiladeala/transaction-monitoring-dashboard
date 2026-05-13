export type TransactionStatus = "Completed" | "Pending" | "Failed";
export type RiskLevel = "Low" | "Medium" | "High";
export type IndicatorTone = "success" | "warning" | "danger" | "neutral";

export interface TransactionHistoryItem {
  label: string;
  detail: string;
  time: string;
}

export interface RiskIndicator {
  label: string;
  value: string;
  tone: IndicatorTone;
}

export interface TimelineItem {
  title: string;
  detail: string;
  time: string;
}

export interface TransactionRecord {
  id: string;
  customerName: string;
  email: string;
  account: string;
  merchant: string;
  channel: string;
  location: string;
  device: string;
  amount: number;
  riskLevel: RiskLevel;
  status: TransactionStatus;
  date: string;
  history: TransactionHistoryItem[];
  indicators: RiskIndicator[];
  timeline: TimelineItem[];
}

export const transactionSeeds = [
  {
    customerName: "Ava Johnson",
    email: "ava.johnson@northwind.co",
    account: "•••• 4281",
    merchant: "CloudMart",
    channel: "Card Present",
    location: "Lagos, NG",
    device: "iPhone 15",
    amount: 2480,
    riskLevel: "Low" as RiskLevel,
    status: "Completed" as TransactionStatus,
    history: [
      {
        label: "Previous purchase",
        detail: "NGN 1,120 at CloudMart",
        time: "2 days ago",
      },
      {
        label: "Account verified",
        detail: "KYC completed and matched",
        time: "8 days ago",
      },
    ],
    indicators: [
      { label: "Velocity", value: "Normal", tone: "success" as IndicatorTone },
      { label: "Geo match", value: "Matched", tone: "success" as IndicatorTone },
      {
        label: "Device confidence",
        value: "High",
        tone: "neutral" as IndicatorTone,
      },
    ],
    timeline: [
      {
        title: "Transaction captured",
        detail: "Payment request received from POS terminal.",
        time: "09:12 AM",
      },
      {
        title: "Risk checks passed",
        detail: "Device and behavioral checks were consistent.",
        time: "09:12 AM",
      },
      {
        title: "Funds settled",
        detail: "Transaction cleared without manual review.",
        time: "09:13 AM",
      },
    ],
  },
  {
    customerName: "Noah Patel",
    email: "noah.patel@brightline.io",
    account: "•••• 6629",
    merchant: "MetroSupply",
    channel: "E-commerce",
    location: "Abuja, NG",
    device: "MacBook Pro",
    amount: 7890,
    riskLevel: "Medium" as RiskLevel,
    status: "Pending" as TransactionStatus,
    history: [
      {
        label: "Recent refund",
        detail: "NGN 950 reversed last week",
        time: "6 days ago",
      },
      {
        label: "Billing address changed",
        detail: "Address updated 4 days ago",
        time: "4 days ago",
      },
    ],
    indicators: [
      { label: "Velocity", value: "Elevated", tone: "warning" as IndicatorTone },
      { label: "Geo match", value: "Partial", tone: "warning" as IndicatorTone },
      {
        label: "Device confidence",
        value: "Medium",
        tone: "neutral" as IndicatorTone,
      },
    ],
    timeline: [
      {
        title: "Checkout started",
        detail: "Customer initiated payment from saved cart.",
        time: "10:05 AM",
      },
      {
        title: "3DS verification",
        detail: "Awaiting customer authentication response.",
        time: "10:05 AM",
      },
      {
        title: "Pending review",
        detail: "Held while risk engine completes secondary checks.",
        time: "10:06 AM",
      },
    ],
  },
  {
    customerName: "Maya Okafor",
    email: "maya.okafor@finwave.africa",
    account: "•••• 1940",
    merchant: "SkyTravel",
    channel: "Mobile App",
    location: "Port Harcourt, NG",
    device: "Samsung S24",
    amount: 15420,
    riskLevel: "High" as RiskLevel,
    status: "Failed" as TransactionStatus,
    history: [
      {
        label: "Chargeback history",
        detail: "Two disputes recorded in prior 90 days",
        time: "11 days ago",
      },
      {
        label: "New device detected",
        detail: "Login from an unrecognized handset",
        time: "Today",
      },
    ],
    indicators: [
      { label: "Velocity", value: "High", tone: "danger" as IndicatorTone },
      { label: "Geo match", value: "Mismatch", tone: "danger" as IndicatorTone },
      {
        label: "Device confidence",
        value: "Low",
        tone: "danger" as IndicatorTone,
      },
    ],
    timeline: [
      {
        title: "Payment attempted",
        detail: "Card verification began from the mobile app.",
        time: "01:18 PM",
      },
      {
        title: "Risk score escalated",
        detail: "Behavioral signals exceeded the threshold.",
        time: "01:18 PM",
      },
      {
        title: "Payment declined",
        detail: "Transaction blocked before authorization.",
        time: "01:18 PM",
      },
    ],
  },
  {
    customerName: "Zara Mensah",
    email: "zara.mensah@studio.one",
    account: "•••• 7735",
    merchant: "Green Market",
    channel: "Card Present",
    location: "Accra, GH",
    device: "iPad Air",
    amount: 4325,
    riskLevel: "Low" as RiskLevel,
    status: "Completed" as TransactionStatus,
    history: [
      {
        label: "Recurring customer",
        detail: "Four approved purchases in the last month",
        time: "3 days ago",
      },
      {
        label: "Support ticket",
        detail: "No fraud concern raised by the customer",
        time: "12 days ago",
      },
    ],
    indicators: [
      { label: "Velocity", value: "Normal", tone: "success" as IndicatorTone },
      { label: "Geo match", value: "Matched", tone: "success" as IndicatorTone },
      {
        label: "Device confidence",
        value: "High",
        tone: "neutral" as IndicatorTone,
      },
    ],
    timeline: [
      {
        title: "Transaction authorized",
        detail: "Merchant approved payment immediately.",
        time: "03:44 PM",
      },
      {
        title: "Risk screen complete",
        detail: "No signals required additional review.",
        time: "03:44 PM",
      },
      {
        title: "Captured for settlement",
        detail: "Funds scheduled for nightly settlement.",
        time: "03:45 PM",
      },
    ],
  },
  {
    customerName: "Ethan Brooks",
    email: "ethan.brooks@northstar.com",
    account: "•••• 2501",
    merchant: "Pulse Pharmacy",
    channel: "E-commerce",
    location: "Ibadan, NG",
    device: "Windows Laptop",
    amount: 9620,
    riskLevel: "Medium" as RiskLevel,
    status: "Completed" as TransactionStatus,
    history: [
      {
        label: "Billing update",
        detail: "Address changed within 24 hours",
        time: "Yesterday",
      },
      {
        label: "Previous order",
        detail: "NGN 3,180 approved to same merchant",
        time: "9 days ago",
      },
    ],
    indicators: [
      { label: "Velocity", value: "Moderate", tone: "warning" as IndicatorTone },
      { label: "Geo match", value: "Matched", tone: "success" as IndicatorTone },
      {
        label: "Device confidence",
        value: "Medium",
        tone: "neutral" as IndicatorTone,
      },
    ],
    timeline: [
      {
        title: "Checkout submitted",
        detail: "User confirmed order on desktop.",
        time: "08:20 AM",
      },
      {
        title: "Step-up auth",
        detail: "Verification step completed successfully.",
        time: "08:20 AM",
      },
      {
        title: "Cleared",
        detail: "Transaction approved and settled.",
        time: "08:21 AM",
      },
    ],
  },
  {
    customerName: "Fatima Hassan",
    email: "fatima.hassan@orbitpay.com",
    account: "•••• 6074",
    merchant: "JetLink",
    channel: "Mobile App",
    location: "Kano, NG",
    device: "Pixel 8",
    amount: 21640,
    riskLevel: "High" as RiskLevel,
    status: "Pending" as TransactionStatus,
    history: [
      {
        label: "High ticket value",
        detail: "Average basket value increased 3x",
        time: "Today",
      },
      {
        label: "Device change",
        detail: "New device fingerprint in the last session",
        time: "Today",
      },
    ],
    indicators: [
      { label: "Velocity", value: "High", tone: "danger" as IndicatorTone },
      { label: "Geo match", value: "Partial", tone: "warning" as IndicatorTone },
      {
        label: "Device confidence",
        value: "Low",
        tone: "danger" as IndicatorTone,
      },
    ],
    timeline: [
      {
        title: "Payment initiated",
        detail: "App sent authorization request.",
        time: "05:09 PM",
      },
      {
        title: "Risk review",
        detail: "Queueing additional checks before approval.",
        time: "05:10 PM",
      },
      {
        title: "Awaiting response",
        detail: "Transaction remains in review state.",
        time: "05:10 PM",
      },
    ],
  },
  {
    customerName: "Daniel Kim",
    email: "daniel.kim@bluepeak.net",
    account: "•••• 9176",
    merchant: "TravelBay",
    channel: "Card Present",
    location: "Enugu, NG",
    device: "MacBook Air",
    amount: 5600,
    riskLevel: "Low" as RiskLevel,
    status: "Completed" as TransactionStatus,
    history: [
      {
        label: "Frequent traveler",
        detail: "Pattern is aligned with prior trips",
        time: "5 days ago",
      },
      {
        label: "Loyalty points",
        detail: "Rewards redemption completed successfully",
        time: "1 month ago",
      },
    ],
    indicators: [
      { label: "Velocity", value: "Normal", tone: "success" as IndicatorTone },
      { label: "Geo match", value: "Matched", tone: "success" as IndicatorTone },
      {
        label: "Device confidence",
        value: "High",
        tone: "neutral" as IndicatorTone,
      },
    ],
    timeline: [
      {
        title: "Swipe captured",
        detail: "Card present purchase accepted.",
        time: "11:32 AM",
      },
      {
        title: "Issuer approved",
        detail: "Authorization returned immediately.",
        time: "11:32 AM",
      },
      {
        title: "Settlement queued",
        detail: "Funds queued for batch clearing.",
        time: "11:33 AM",
      },
    ],
  },
  {
    customerName: "Grace Williams",
    email: "grace.williams@atlasbank.io",
    account: "•••• 8330",
    merchant: "HomeGoods",
    channel: "E-commerce",
    location: "Benin City, NG",
    device: "Surface Pro",
    amount: 3075,
    riskLevel: "Medium" as RiskLevel,
    status: "Completed" as TransactionStatus,
    history: [
      {
        label: "Address mismatch",
        detail: "Shipping address updated after login",
        time: "Yesterday",
      },
      {
        label: "Cart history",
        detail: "Reordered similar items from last month",
        time: "16 days ago",
      },
    ],
    indicators: [
      { label: "Velocity", value: "Moderate", tone: "warning" as IndicatorTone },
      { label: "Geo match", value: "Matched", tone: "success" as IndicatorTone },
      {
        label: "Device confidence",
        value: "Medium",
        tone: "neutral" as IndicatorTone,
      },
    ],
    timeline: [
      {
        title: "Order placed",
        detail: "Customer completed checkout flow.",
        time: "02:11 PM",
      },
      {
        title: "Review complete",
        detail: "No blocking rules were triggered.",
        time: "02:11 PM",
      },
      {
        title: "Payment settled",
        detail: "Order marked ready for fulfillment.",
        time: "02:12 PM",
      },
    ],
  },
  {
    customerName: "Michael Adeyemi",
    email: "michael.adeyemi@northbridge.com",
    account: "•••• 5552",
    merchant: "QuickServe",
    channel: "Mobile App",
    location: "Lagos, NG",
    device: "Galaxy Z Fold",
    amount: 14350,
    riskLevel: "High" as RiskLevel,
    status: "Failed" as TransactionStatus,
    history: [
      {
        label: "Multiple declines",
        detail: "Three attempts within 15 minutes",
        time: "Today",
      },
      {
        label: "VPN detected",
        detail: "Unknown proxy during checkout",
        time: "Today",
      },
    ],
    indicators: [
      { label: "Velocity", value: "High", tone: "danger" as IndicatorTone },
      { label: "Geo match", value: "Mismatch", tone: "danger" as IndicatorTone },
      {
        label: "Device confidence",
        value: "Low",
        tone: "danger" as IndicatorTone,
      },
    ],
    timeline: [
      {
        title: "Authorization attempted",
        detail: "Merchant requested payment capture.",
        time: "06:29 PM",
      },
      {
        title: "Issuer declined",
        detail: "Issuer declined the transaction response.",
        time: "06:29 PM",
      },
      {
        title: "Failed closed",
        detail: "Transaction not eligible for retry.",
        time: "06:29 PM",
      },
    ],
  },
  {
    customerName: "Chinwe Eze",
    email: "chinwe.eze@aurora.dev",
    account: "•••• 6680",
    merchant: "BookHive",
    channel: "Card Present",
    location: "Owerri, NG",
    device: "iPhone 14",
    amount: 1920,
    riskLevel: "Low" as RiskLevel,
    status: "Completed" as TransactionStatus,
    history: [
      {
        label: "Payment cadence",
        detail: "Consistent weekly spending pattern",
        time: "4 days ago",
      },
      {
        label: "No disputes",
        detail: "Account remains dispute-free",
        time: "90 days",
      },
    ],
    indicators: [
      { label: "Velocity", value: "Normal", tone: "success" as IndicatorTone },
      { label: "Geo match", value: "Matched", tone: "success" as IndicatorTone },
      {
        label: "Device confidence",
        value: "High",
        tone: "neutral" as IndicatorTone,
      },
    ],
    timeline: [
      {
        title: "Swipe processed",
        detail: "Customer tapped card to complete purchase.",
        time: "09:41 AM",
      },
      {
        title: "Rule evaluation",
        detail: "Low-risk route selected automatically.",
        time: "09:41 AM",
      },
      {
        title: "Captured",
        detail: "Transaction committed for settlement.",
        time: "09:42 AM",
      },
    ],
  },
];

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export const generatedTransactions = Array.from({ length: 28 }, (_, index) => {
  const seed = transactionSeeds[index % transactionSeeds.length];
  const amount = seed.amount + index * 173;
  const createdAt = new Date(2026, 4, 1 + index);

  return {
    id: `TXN-${10420 + index}`,
    customerName: seed.customerName,
    email: seed.email,
    account: seed.account,
    merchant: seed.merchant,
    channel: seed.channel,
    location: seed.location,
    device: seed.device,
    amount,
    riskLevel: seed.riskLevel,
    status: seed.status,
    date: dateFormatter.format(createdAt),
    history: seed.history,
    indicators: seed.indicators,
    timeline: seed.timeline,
  } satisfies TransactionRecord;
});

export const statusOptions: Array<"All" | TransactionStatus> = [
  "All",
  "Completed",
  "Pending",
  "Failed",
];

export const riskOptions: Array<"All" | RiskLevel> = [
  "All",
  "Low",
  "Medium",
  "High",
];

export const statusStyles: Record<TransactionStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Failed: "bg-rose-50 text-rose-700 border-rose-200",
};

export const riskStyles: Record<RiskLevel, string> = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-rose-50 text-rose-700 border-rose-200",
};

export const indicatorStyles: Record<IndicatorTone, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-rose-50 text-rose-700 border-rose-200",
  neutral: "bg-slate-100 text-slate-700 border-slate-200",
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
