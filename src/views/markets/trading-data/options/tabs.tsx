'use client'

import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { usePathname } from "next/navigation"
import tabs from "@/data/markets/trading-data/option-tabs.json";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const subTabs = [
  {
    img: 'https://www.cryptocompare.com/media/19633/btc.png',
    name: 'BTC',
    price: '$61,184'
  },
  {
    img: 'https://www.cryptocompare.com/media/20646/eth_logo.png',
    name: 'ETH',
    price: '$2,744,1'
  },
  {
    img: 'https://www.cryptocompare.com/media/40485170/bnb.png',
    name: 'BNB',
    price: '$530.0'
  },
  {
    img: 'https://www.cryptocompare.com/media/37747734/sol.png',
    name: 'SOL',
    price: '$1,261,184'
  },
  {
    img: 'https://www.cryptocompare.com/media/12318177/ada.png',
    name: 'ADA',
    price: '$61,184'
  }
]

export const OptionTabs = () => {
  const [selectedTab, setSelectedTab] = useState('BTC')
  const pathname = usePathname()

  return (
    <>
      <div className="px-4 md:px-0 mb-6 w-full flex items-center">
        <div className="flex items-center w-full gap-[28px] overflow-auto text-sm border-b border-b-white-100 dark:border-b-secondary no-scrollbar">
          {
            tabs.map((tab: any, index: number) => (
              <Link
                key={index}
                href={tab.path}
                className={twMerge(
                  "whitespace-nowrap text-gray-300 dark:text-gray font-semibold h-12 flex items-center",
                  pathname === tab.path ? "text-black-100 dark:text-white-100 border-b border-b-primary " : ""
                )}
              >
                {tab.name}
              </Link>
            ))
          }
        </div>
      </div>
      <div className="px-4 md:px-0 flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 md:gap-0">
        <div className="order-2 md:order-1 flex items-center gap-4 overflow-x-auto no-scrollbar">
          {
            subTabs.map((tab, index) => (
              <div onClick={() => setSelectedTab(tab.name)} className={twMerge(
                "flex items-center justify-center px-6 py-2 rounded-[4px]",
                "cursor-pointer",
                selectedTab === tab.name ? 'bg-[rgb(242,243,245)] dark:bg-secondary' : 'bg-transparent',
              )}>
                <Image
                  src={tab.img}
                  alt={tab.name}
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <div className="text-sm mr-1 font-medium ">{tab.name}</div>
                <div className="text-sm font-medium text-black-300 dark:text-gray">{tab.price}</div>
              </div>
            ))
          }
        </div>
        <div className="order-1 md:order-2 w-full md:w-auto">
          <Button
            appearance="primary"
            className="whitespace-nowrap flex items-center justify-center gap-2 h-9 md:h-10 w-full md:w-auto md:min-w-[140px] text-sm font-medium"
            >
              Trade Options
              <Icon
                name="arrow-right"
                size={16}
                className="text-black-100"
              />
            </Button>
        </div>
      </div>
    </>
  )
}