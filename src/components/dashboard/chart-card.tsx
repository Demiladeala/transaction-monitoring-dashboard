import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className=" rounded-lg border border-stroke p-4 sm:p-6">
      <h3 className="text-gray-900 dark:text-[#C9C6C5] text-lg font-semibold mb-4">
        {title}
      </h3>
      <div className="w-full overflow-x-auto">{children}</div>
    </div>
  );
}
