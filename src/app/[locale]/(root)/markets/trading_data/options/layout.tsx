import { OptionTabs } from "@/views/markets/trading-data/options/tabs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <OptionTabs />
      {children}
    </>
  );
}
