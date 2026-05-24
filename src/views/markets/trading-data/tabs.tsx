'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import tabs from "@/data/markets/trading-data/tabs.json";
import { Icon } from "@/components/ui/icon";

export const TradingTabs = () => {
  const pathname = usePathname()

  return (
    <div className="relative px-4 md:px-0 pt-[15px] md:pt-0 w-full flex justify-between items-center">
      <div className="flex items-start gap-6 overflow-auto no-scrollbar">
        {
          tabs.map((tab: any, index: number) => (
            <Link
              key={index}
              href={tab.path}
              className={twMerge(
                "whitespace-nowrap text-gray-300 dark:text-gray font-semibold",
                pathname.includes(tab.matchText) ? "text-black-100 dark:text-white-100 " : ""
              )}
            >
              {tab.name}
              {pathname.includes(tab.matchText) && (<hr className="bg-primary mx-auto mt-1 w-4 h-[3px] border-none"/>)}
            </Link>
          ))
        }
      </div>
      <div>
        <Link
          href="/markets/trading-data"
          className="z-10 flex items-center gap-1 h-6 font-medium"
        >
          <Icon name="document" size={20} />
          <div className="hidden md:block"> Historical Data</div>
        </Link>
      </div>
      <div className="z-0 md:hidden absolute right-9 w-12 h-full bg-linear box-border " />

    </div>
  )
}