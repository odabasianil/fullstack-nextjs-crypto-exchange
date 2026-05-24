'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { C2CPayment } from "./c2c";
import { CryptoPayment } from "./buy-crypto";

const tabs = [
  {
    text: 'P2P',
    url: '/me/payment/c2c'
  },
  {
    text: 'Buy Crypto',
    url: '/me/payment/buycrypto'
  }
]
export const PaymentView = ({type}: {type: string}) => {
  const pathname = usePathname();

  const selectedTab = tabs.find(tab => tab.url === pathname);

  return (
    <>
      <div className="text-2xl md:text-[32px] leading-10 font-semibold">Payment</div>
      <div className="pt-6 pb-4">
        <div className="flex border-b border-white-100 dark:border-secondary">
          {
            tabs.map((tab, index) => (
              <>
                <Link
                  href={tab.url}
                  className={twMerge(
                    "text-gray-300 dark:text-gray relative h-full pb-2 font-semibold",
                    index === 0 ? 'mr-6' : 'mx-6',
                    selectedTab?.url === tab.url && 'text-white dark:text-white border-b-2 !border-b-primary-100'
                  )}
                >
                  {tab.text}
                </Link>
                {index === 0 && <div className="w-[1px] h-6 bg-white-100 dark:bg-secondary" />}
              </>
            ))
          }
        </div>
        <div className="py-6">
          {type === 'c2c' && <C2CPayment />}
          {type === 'buycrypto' && <CryptoPayment />}
        </div>
      </div>
    </>
  )
}