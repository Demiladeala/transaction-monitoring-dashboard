import type { Metadata } from "next";
import { Toaster } from "sonner";
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
    <html lang="en" className={`h-full antialiased`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.cdnfonts.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.cdnfonts.com" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/br-firma" />
      </head>
      <body>
        {children}
        <Toaster
          richColors
          toastOptions={{
            classNames: {
              // error: "bg-[#FF363614] text-[#FF3636]",
              // warning: "bg-[#F59E0B14] text-[#F59E0B]",
              success: "!bg-white !border !border-stroke !text-black",
            },
          }}
        />
      </body>
    </html>
  );
}
