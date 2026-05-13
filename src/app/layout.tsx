import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/src/components/theme-provider";
import "./globals.css";

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
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.cdnfonts.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.cdnfonts.com" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/br-firma" />
      </head>
      <body className="h-full bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            richColors
            theme="system"
            toastOptions={{
              classNames: {
                // error: "bg-[#FF363614] text-[#FF3636]",
                // warning: "bg-[#F59E0B14] text-[#F59E0B]",
                success: "!border !border-[#e5e2e1] !bg-white !text-black",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
