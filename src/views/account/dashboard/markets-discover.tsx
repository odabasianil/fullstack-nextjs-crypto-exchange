'use client'

import { Icon } from "@/components/ui/icon"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { MarketsTable } from "./markets-table"
import { CopyTrading } from "./copy-trading"
import { EarnTable } from "./earn-table"

const tabs = [
  {
    text: 'Markets',
    tabs: ['Holding', 'Hot', 'New Listing', 'Favorite', 'Top Gainers', '24h Volume']
  },
  {
    text: 'Discover',
    tabs: ['Copy Trading', 'Earn']
  }
]

export const MarketsDiscover = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].text)
  const [selectedSubTab, setSelectedSubTab] = useState(tabs[0].tabs[0]);

  useEffect(() => {
    setSelectedSubTab(tabs.find(tab => tab.text === selectedTab)?.tabs[0] ?? tabs[0].tabs[0])
  }, [selectedTab])
  
  return (
    <div className="md:border border-white-100 dark:border-secondary rounded-2xl px-4 md:p-6 mb-16 md:mb-6"> 
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {
            tabs.map((tab, index) => (
              <div
                key={index}
                className={twMerge(
                  "cursor-pointer text-xl md:text-2xl text-gray-300 dark:text-gray font-semibold",
                  selectedTab === tab.text && "text-black-100 dark:text-white-100"
                )}
                onClick={() => setSelectedTab(tab.text)}
              >
                  {tab.text}
              </div>
            ))
          }
        </div>
        <Link target="_blank" href="/en/square/profile/square-creator-d4fc42eb075a" className="flex items-center gap-0.5 h-8">
          <div className="text-sm font-semibold">More</div>
          <Icon name="chevron-left" size={16} className="text-gray-300 dark:text-gray rotate-180" />
        </Link>
      </div>
      <div className="flex items-center gap-6 pb-4">
        {
          tabs.find(tab => tab.text === selectedTab)?.tabs.map((tab, index) => (
            <div
            key={index}
              className={twMerge(
                "relative cursor-pointer text-gray-300 dark:text-gray font-semibold h-8 whitespace-nowrap",
                selectedSubTab === tab && "text-black-100 dark:text-white-100"
              )}
              onClick={() => setSelectedSubTab(tab)}
            >
              {tab}
              {selectedSubTab === tab && (<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-[3px] bg-primary-100 " />)}
            </div>
          ))
        }
      </div>
      {selectedTab === 'Markets' && (<MarketsTable />)}
      {selectedSubTab === 'Copy Trading' && (
        <>
          <div className="text-sm text-gray-300 dark:text-gray">No need to understand complex trading knowledge,follow the expert's operations automatically and achieve passive income !</div>
          <Link href="/en/support/faq/what-is-copy-trading-2616103f0575445da24cc4794d23bba8" target="_blank" className="flex mb-6 text-sm text-primary-100 underline">View Tutorial</Link>
          <CopyTrading />
        </>
      )}
      {selectedSubTab === 'Earn' && (
        <>
          <div className="mb-6 text-sm text-gray-300 dark:text-gray">Simple & Secure. Search popular coins and start earning.</div>
          <EarnTable />
        </>
      )}
    </div>
  )
}