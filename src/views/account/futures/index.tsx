'use client'

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { MarginBalance } from "./margin-balance";
import { FuturesTables } from "./tables";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { FuturesButtons } from "./buttons";

export const AccountFuturesView = () => {
  const tabs = [{ name: 'USDⓈ-M', key: 'usds' }, { name: 'COIN-M', key: 'coin' }];
  const [selectedTab, setSelectedTab] = useState('usds');


  return (
    <>
      <div className="px-4 md:px-0 pt-6 md:pt-0 mb-6 flex w-full items-center justify-between">
        <div className="flex gap-6">
          {tabs.map((tab, index) => (
            <div key={index} onClick={() => setSelectedTab(tab.key)} className={twMerge(
              "cursor-pointer flex-1 text-center py-2 rounded h-10 relative text-gray-300 dark:text-gray whitespace-nowrap",
              selectedTab === tab.key && 'text-black-100 dark:text-white-100'
            )}>
              {tab.name}
              {selectedTab === tab.key && (
                <div className="absolute w-4 h-[3px] bg-primary bottom-0 left-1/2 -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden md:block"><FuturesButtons /></div>
      </div>
      <MarginBalance selectedTab={selectedTab} />
      <FuturesTables />
      
    </>
  )
}