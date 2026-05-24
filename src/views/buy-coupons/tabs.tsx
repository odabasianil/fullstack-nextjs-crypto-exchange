"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import tabs from "@/data/crypto/buy-coupons-tabs.json";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";

export const BuyCouponsTabs = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="px-6 xl:px-0 container max-w-[1200px]">
        <div className="flex justify-between border-b border-solid  dark:border-secondary border-white-100">
          <div className="flex  md:gap-6 gap-3.5 md:overflow-hidden overflow-y-auto whitespace-nowrap md:whitespace-normal">
            {tabs.mainItems.map((tab: any, index: number) => (
              <Link
                key={index}
                href={tab.path}
                className={twMerge(
                  "text-black-300 dark:text-gray-400 md:text-base text-sm font-semibold md:leading-[40px] leading-[40px]",
                  (pathname.includes(tab.matchText) || (tab.matchText === "BTC" && pathname === "/buy-coupons"))
                    ? "text-black-100 dark:text-white-100 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:bg-primary after:w-4 after:h-[3px] after:transform after:-translate-x-1/2"
                    : ""
                )}
              >
                {tab.name}
              </Link>
            ))}
          </div>
          <div className="md:flex gap-6 hidden">
            {tabs.secondaryItems.map((tab: any, index: number) => (
              <div key={index} className="md:flex items-center">
              <Icon
                key={index}
                name={tab.icon}
                size={20}
                className="text-gray-300 dark:text-white"
              />
                <Link
                  key={index}
                  href={tab.path}
                  className={twMerge(
                    "text-gray-300 ml-1 dark:text-white text-sm md:leading-[40px]",
                    pathname.includes(tab.matchText)
                      ? "text-black-100 dark:text-white-100 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:bg-primary after:w-4 after:h-[3px] after:transform after:-translate-x-1/2"
                      : ""
                  )}
                >
                  {tab.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
