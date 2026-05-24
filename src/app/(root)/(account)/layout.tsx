import { AccountSidebar } from "@/views/account/sidebar";
import { headers } from "next/headers";
import { twMerge } from "tailwind-merge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fullScreenPages = ["/me/orders/exchange/tradeorder", "/me/orders/exchange/usertrade", "/me/orders/exchange/openorder", "/me/settings/kyc", "/me/financial-reports", "/me/settings/preference", "/me/payment/c2c", "/me/payment/buycrypto", "/me/settings/api-management", "/me/wallet/account/statement", "/me/wallet/account/futures", "/me/orders/futures/openorder", "/me/orders/futures/tradeorder", '/me/orders/futures/tradehistory', '/me/orders/futures/transactionhistory', '/me/orders/futures/positionhistory', '/me/orders/futures/fundingfeehistory'];
  const requestUrl = headers().get("x-pathname") as string;

  return (
    <>
      <div className="">
        <div className="md:flex">
          <AccountSidebar />
          <div className={twMerge(
            "w-full mx-auto lg:pt-6 lg:mb-20 md:min-h-screen bg-white dark:bg-[#181E25] md:dark:bg-transparent",
            fullScreenPages.includes(requestUrl) ? "!max-w-full lg:px-8" : "max-w-[1352px] lg:px-16"
          )}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
