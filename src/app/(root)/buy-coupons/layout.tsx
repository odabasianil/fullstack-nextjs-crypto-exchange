import { BuyCouponsTabs } from "@/views/buy-coupons/tabs";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <BuyCouponsTabs />
      {children}
    </div>
  );
}