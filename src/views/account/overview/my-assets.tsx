'use client'

import { Icon } from "@/components/ui/icon"
import Image from "next/image";
import Link from "next/link"
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { CoinView } from "./coin-view";
import { WalletView } from "./wallet-view";

const tabs = ['Coin View', 'Wallet View'];

export const MyAssets = () => {
  const [selectedSubTab, setSelectedSubTab] = useState(tabs[0]);

  return (
    <>
      <div className="md:border border-white-100 dark:border-secondary rounded-2xl px-4 md:p-6 mb-16 md:mb-6"> 
        <div className="pb-4 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-semibold">My Assets</div>
          <Link target="_blank" href="/en/square/profile/square-creator-d4fc42eb075a" className="flex items-center gap-0.5 h-8">
            <div className="text-sm font-semibold">More</div>
            <Icon name="chevron-left" size={16} className="text-gray-300 dark:text-gray rotate-180" />
          </Link>
        </div>
        <div className="flex items-center gap-6 pb-4">
          {
            tabs?.map(tab => (
              <div
                className={twMerge(
                  "relative cursor-pointer text-gray-300 dark:text-gray font-semibold h-8",
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

        {selectedSubTab === 'Coin View' && (<CoinView />)}
        {selectedSubTab === 'Wallet View' && (<WalletView />)}
      </div>
    </>
  )
}