import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { ThemeProvider } from "@/src/features/theme/theme-provider";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";
import { ThemeScript } from "@/src/features/theme/theme-script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transaction Monitoring Dashboard",
  description:
    "A dashboard for monitoring and analyzing financial transactions in real-time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Early theme sync now handled by <ThemeScript />
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <div className="p-4 flex justify-end">
            <ThemeToggle />
          </div>
          {children}
        </ThemeProvider>
        <Toaster
          richColors
          toastOptions={{
            classNames: {
              // error: "bg-[#FF363614] text-[#FF3636]",
              // warning: "bg-[#F59E0B14] text-[#F59E0B]",
              success: "!bg-white !border-brandborder !text-black",
            },
          }}
        />
      </body>
    </html>
  );
}
