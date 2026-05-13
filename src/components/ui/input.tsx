import * as React from "react";

import { cn } from "@/src/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border border-[#FF383C] focus-visible:ring-0 ring-0"
            : "border-[#E5E2E1] focus-visible:ring-primary focus-visible:ring-1",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
