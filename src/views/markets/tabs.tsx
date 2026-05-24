'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import tabs from "@/data/markets/tabs.json";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";

export const MarketsTabs = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const activeTab = tabs.find((tab: any) => pathname.includes(tab.matchText)) || tabs[0];

  return (
    <>
      <div className="hidden md:flex items-center py-6 gap-6">
        {
          tabs.map((tab: any, index: number) => (
            <Link
              key={index}
              href={tab.path}
              className={twMerge(
                "text-gray-300 dark:text-gray text-2xl font-semibold",
                activeTab.matchText === tab.matchText ? "text-black-100 dark:text-white-100 text-[2rem] leading-10" : ""
              )}
            >
              {tab.name}
            </Link>
          ))
        }
      </div>
      <div className="md:hidden border-b border-white-400 dark:border-gray-300 p-4 flex justify-between items-center" onClick={() => setIsOpen(true)}>
        <div className="flex items-center gap-2">
          <Icon
            name={activeTab?.icon}
            size={24}
          />
          {activeTab?.name}
        </div>
        <Icon
          name='chevron-left'
          size={24}
          className={twMerge(
            "transform -rotate-90",
          )}
        />
      </div>
      <div className={twMerge(
          "fixed bg-white dark:bg-[rgb(18,22,28)] top-0 left-40 w-full h-full transition-all duration-500 -z-10",
          !isOpen ? "invisible opacity-0" : " visible opacity-100 left-0 z-20"
        )}
      >
        <div className="flex justify-end items-center pt-5 pb-3 mr-4">
          <div onClick={() => setIsOpen(false)}>
            <Icon name="close" size={24}  />
          </div>
        </div>
        <div className="">
          <div className="border-b border-white-400 dark:border-[rgb(27,31,37)] p-4 flex justify-between items-center" >
            <div className="flex items-center gap-2 font-semibold">
              <Icon
                name={activeTab?.icon}
                size={24}
              />
              {activeTab?.name}
            </div>
            <Icon
              name='chevron-left'
              size={24}
              className={twMerge(
                "transform rotate-90",
              )}
            />
          </div>
          {
            tabs.map((tab: any, index: number) => (
              <Link
                key={index}
                href={tab.path}
                className={twMerge(
                  "px-4 text-gray-300 dark:text-gray flex items-center gap-2 py-4 font-semibold",
                  activeTab.matchText === tab.matchText ? "text-black-100 dark:text-white-100" : ""
                )}
              >
                <Icon
                  name={tab?.icon}
                  size="24"
                />
                {tab.name}
              </Link>
            ))
          }
        </div>
      </div>
    </>
  )
}