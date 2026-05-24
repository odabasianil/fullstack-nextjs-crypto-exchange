import { CryptoTabs } from "@/views/crypto/tabs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <CryptoTabs />
      {children}
    </div>
  );
}