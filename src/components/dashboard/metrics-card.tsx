import { cn } from "@/src/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string;
  highlight?: boolean;
}

export function MetricsCard({
  title,
  value,
  highlight = false,
}: MetricsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p
        className={cn(
          "text-2xl sm:text-3xl font-bold",
          highlight ? "text-red-500" : "text-gray-900",
        )}
      >
        {value}
      </p>
    </div>
  );
}
