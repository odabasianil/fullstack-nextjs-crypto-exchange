'use client'

import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { MarketTabs } from "./tabs"

export const FutureMarket = () => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedTab, setSelectedTab] = useState('favorites')
  const [selectedSubTab, setSelectedSubTab] = useState('all')

  const handleChange = (e: any) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="pt-4 pb-2">
      <div className="px-4">
        <Input
          className="pl-8 placeholder:text-sm focus:!border-primary-100 pb-0.5 h-[32px]"
          value={searchValue}
          wrapperClassName="w-full"
          onChange={handleChange}
          placeholder="Search"
          label={<Icon name="search" size={16} color="transparent" />}
          labelClassName="left-3"
        />
      </div>
      <MarketTabs selectedTab={selectedTab} selectedSubTab={selectedSubTab} setSelectedTab={setSelectedTab} setSelectedSubTab={setSelectedSubTab} />
      <div className="flex ml-4 mr-[22px] min-h-5 mb-1">
        <div className="min-w-[186px] flex justify-start flex-1 mr-1 text-xs text-gray-300 dark:text-gray">
          Symbols <Icon name="sort-icon" size={16} className="hidden md:block text-gray" />
          /
          Vol <Icon name="sort-icon" size={16} className="hidden md:block text-gray" />
        </div>
        <div className="min-w-[80px] flex justify-end flex-1 mr-1 text-xs text-gray-300 dark:text-gray">
          Last Price
          <Icon
            name="sort-icon"
            size={16}
            className="hidden md:block text-gray"
          />
        </div>
        <div className="min-w-[80px] flex justify-end flex-1 mr-1 text-xs text-gray-300 dark:text-gray">
          24h %
          <Icon
            name="sort-icon"
            size={16}
            className="hidden md:block text-gray"
          />
        </div>
        <div className="min-w-[80px] flex justify-end flex-1 mr-1 text-xs text-gray-300 dark:text-gray">
          <div className="whitespace-nowrap text-ellipsis ">Funding Rate </div>
          <Icon
            name="sort-icon"
            size={16}
            className="hidden md:block text-gray"
          />
        </div>
      </div>

      <div className="max-h-[350px] md:max-h-[432px] overflow-y-auto">
        {new Array(10).fill(null).map((idx: number) => <div className="flex ml-4 mr-3 min-h-12 ">
          <div className="min-w-[186px] flex justify-start items-start flex-1 mr-1 text-xs gap-1">
            <Icon name="star" size={16} className="text-[rgb(234,236,239)] dark:text-[rgb(71,77,87)] mt-0.5" />
            <div >
              <div className="flex items-center gap-1">
                <div className="text-sm">BTCUSD CM</div>
                <div className="bg-white-300 dark:bg-secondary rounded text-xs px-1">Perp</div>
              </div>
              <div className="text-xs text-gray-300 dark:text-gray">Vol 1.51B</div>
            </div>
          </div>

          <div className="min-w-[80px] flex justify-end flex-1 mr-1">
            <div className="text-sm">44,000.00</div>
          </div>
          <div className="min-w-[80px] flex justify-end flex-1 mr-1">
            <div className="text-sm text-green">+1.52%</div>
          </div>
          <div className="min-w-[80px] flex justify-end flex-1 mr-1">
            <div className="text-sm">0.000034%</div>
          </div>
        </div>)}
      </div>
    </div>
  )
}