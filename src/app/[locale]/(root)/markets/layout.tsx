import { MarketsTabs } from "@/views/markets/tabs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container max-w-[1200px] px-0">
      <MarketsTabs />
      {children}
    </div>
  );
}
