import { TradingTabs } from "@/views/markets/trading-data/tabs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TradingTabs />
      {children}
    </>
  );
}
