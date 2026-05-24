'use client'

import { HelpText } from "@/components/ui/help-text";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FuturesButtons } from "./buttons";

export const MarginBalance = ({selectedTab}: {selectedTab: string}) => {
  const [balance, setBalance] = useState("0.00");
  const [isVisibleBalance, setIsVisibleBalance] = useState(false);
  const [assetTab, setAssetTab] = useState('allocation');

  const handleToggleBalance = () => {
    setIsVisibleBalance(!isVisibleBalance);
  }

  return (
    <>
      <div className="w-full px-4 md:p-6 mb-16 md:mb-8 rounded-2xl md:border border-white-100 dark:border-secondary">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="w-full lg:w-[60%]">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="text-base md:text-xl font-semibold">Margin Balance</div>
              <div className="cursor-pointer" onClick={handleToggleBalance}>
                <Icon name={isVisibleBalance ? "eye-on" : "eye-off"} size={16} className="text-gray-300 dark:text-gray" />
              </div>
            </div>
            <div className="h-10 flex items-center mb-2 gap-2">
              <div className="text-2xl md:text-[32px] leading-10 font-bold">{isVisibleBalance ? balance : '******'}</div>
              <div className="text-sm">
                {selectedTab === 'usds' ? 'USD' : 'BTC' }
              </div>
            </div>
            <div className="text-sm mb-2">{!isVisibleBalance ? "******" : "≈ $0.00"}</div>
            <div className="flex items-center text-sm mb-6">
              <div>Today’s Realized PnL</div>
              <div className="ml-2">{isVisibleBalance ? "+ $0.00(0.00%)" : "******"}</div>
              <Icon name="chevron-left" size={16} className="rotate-180 ml-1" />
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="flex-[1_1]">
                <div className="mb-2 text-sm">Wallet Balance({selectedTab === 'usds' ? 'USD' : 'BTC' })</div>
                <div className="text-xl font-semibold">{isVisibleBalance ? balance : '******'}</div>
                <div className="text-sm">{isVisibleBalance ? balance : '******'}</div>
              </div>
              <div className="flex-[1_1] whitespace-nowrap">
                <div className="w-min mb-2 text-sm relative group underline decoration-dashed cursor-pointer">
                  Unrealized PNL({selectedTab === 'usds' ? 'USD' : 'BTC' })
                  <HelpText className="whitespace-pre-line">
                  Unrealized profit and loss is calculated based on the mark price. Please note that the data does not update in real time. To get the latest information, please refer to the trading page.
                  </HelpText>
                </div>
                <div className="text-xl font-semibold">{isVisibleBalance ? balance : '******'}</div>
                <div className="text-sm">{isVisibleBalance ? balance : '******'}</div>
              </div>
            </div>
          </div>
          <div className="md:hidden w-full mb-6 md:mb-0">
            <FuturesButtons />
          </div>
          <div className="w-full lg:w-[40%] min-h-[150px]">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold">Asset Allocation</div>
              <div className="flex bg-white-100 dark:bg-secondary rounded-md p-0.5">
                <div onClick={() => setAssetTab('allocation')} className={twMerge(
                  "cursor-pointer w-[38px] h-5 flex items-center justify-center rounded-l-md",
                  assetTab === 'allocation' && 'bg-white dark:bg-black-100'
                )}>
                  <Icon name="history" size={16} className={twMerge("text-gray-300 dark:text-gray", assetTab === 'allocation' && 'text-black-100 dark:text-white-100')} />
                </div>
                <div onClick={() => setAssetTab('value')} className={twMerge(
                  "cursor-pointer w-[38px] h-5 flex items-center justify-center rounded-r-md",
                  assetTab === 'value' && 'bg-white dark:bg-black-100'
                )}>
                  <Icon name="upgrade" size={16} className={twMerge("text-gray-300 dark:text-gray", assetTab === 'value' && 'text-black-100 dark:text-white-100')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}