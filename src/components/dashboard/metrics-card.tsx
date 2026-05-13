import { cn } from "@/src/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string;
  highlight?: boolean;
  isLast?: boolean;
}

export function MetricsCard({
  title,
  value,
  highlight = false,
  isLast = false,
}: MetricsCardProps) {
  return (
    <div
      className={cn(
        " rounded-lg border border-stroke p-4 sm:p-6 lg:rounded-none lg:border-0 lg:border-r lg:border-gray-200 lg:p-0",
        isLast && "lg:border-r-0",
      )}
    >
      <h3 className="text-gray-600 dark:text-[#C9C6C5] text-sm font-medium mb-2">
        {title}
      </h3>
      <p
        className={cn(
          "text-2xl sm:text-3xl font-bold",
          highlight ? "text-red-500" : "text-gray-900 dark:text-[#C9C6C5]",
        )}
      >
        {value}
      </p>
    </div>
  );
}
