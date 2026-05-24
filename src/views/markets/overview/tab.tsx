'use client'

import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import tabs from "@/data/markets/overview/tabs.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const OverviewTab = () => {
  const path = usePathname();
  const [isHover, setIsHover] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
  }

  const activeTab = tabs.find(tab => {
    const matchTexts = tab.matchText.split(' ');
    return matchTexts.find(text => path.includes(text));
  });

  return (
    <>
      <div className="px-4 md:px-0 flex justify-between items-center relative">
        <div className="flex items-start gap-[15px] md:gap-6 md:py-2 my-[15px] md:mt-0 md:mb-2 overflow-auto no-scrollbar">
          {
            tabs.map((tab, index) => (
              <Link href={tab.path} key={index} className="whitespace-nowrap flex flex-col items-center gap-1.5 cursor-pointer">
                <span className={twMerge(
                  "text-base font-medium",
                  activeTab?.matchText === tab.matchText ? "text-black-100 dark:text-white-100" : "text-gray-400 dark:text-gray-500"
                  )}>{tab.name}</span>
                {activeTab?.matchText === tab.matchText && <div className="w-4 h-[3px] bg-primary"></div>}
              </Link>
            ))
          }
        </div>
        <div 
          className={twMerge("flex items-center cursor-pointer gap-2 mb-2 md:mb-0", isHover && "min-w-full md:min-w-[10px]")}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {!isHover && <Icon name="search" size={20} color={'transparent'} />}
          {isHover && 
          <>
            <Input
              className=" pl-8 h-10 placeholder:text-sm focus:!border-primary-100 pb-0.5"
              value={searchValue}
              wrapperClassName="w-full md:w-auto"
              onChange={handleChange}
              placeholder="Search Coin Name"
              label={<Icon name="search" size={16} color="transparent" />}
              labelClassName="left-3"
            />
            <div onClick={() => setIsHover(false)}>Cancel</div>
          </>
        }
        </div>
      </div>
      {activeTab?.childTabs?.length as any > 0 && <div className="px-4 md:px-0 flex items-start gap-2 text-sm leading-[22px] pb-4 overflow-auto no-scrollbar">
          {
            activeTab?.childTabs?.map((tab, index) => (
              <Link href={tab.path} key={index} className={twMerge(
                "whitespace-nowrap cursor-pointer px-2 py-[1px] rounded-md flex items-center",
                path.includes(tab.matchText) ? "text-black-100 dark:text-white-100 bg-white-100 dark:bg-secondary" : "text-gray-300 dark:text-gray"
              )}>
                {tab.name}
                {tab.isTrend && <Icon name="trend" size={16} className="ml-1 text-primary" />}
              </Link>
            ))
          }
      </div>}
    </>
  )
}