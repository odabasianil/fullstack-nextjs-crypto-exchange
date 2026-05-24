'use client'

import { Icon } from "@/components/ui/icon";
import Select from "@/components/ui/select";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const SpotOrderTabs = (props: any)  => {
  const {
    tabs,
    sortedBy,
    setSortedBy,
    activeTab
  } = props;


  return (
    <div className="px-4 md:px-0 h-[44px] min-h-[44px] flex justify-between items-center relative">
      <div className="flex items-center gap-6 overflow-auto relative  no-scrollbar">
        {
          tabs?.map((tab: any, index: number) => (
            <Link
              href={tab?.value}
              className={twMerge(
                "flex flex-col items-center justify-center cursor-pointer relative whitespace-nowrap",
              )}
            >
              <div className={twMerge(
                "text-black-300 dark:text-gray leading-[38px] font-semibold",
                tab?.value === activeTab && "text-dark-100 dark:text-white-100"
              )}>
                {tab?.text}
              </div>
              {tab?.value === activeTab && <div className="absolute bottom-0 mx-auto h-[3px] w-4 bg-primary "></div>}
            </Link>
          ))
        }
      </div>
    </div>
  )
}