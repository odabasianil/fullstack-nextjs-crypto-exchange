import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export const MarketActivity = (props:any) => {
  const { isLongMarket, setIsLongMarket } = props;

  const tabs = ['All', 'Change', 'New High/Low', 'Fluctation', 'Volume']
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleTab = (tab: string) => {
    setSelectedTab(tab);
  }

  const handleLong = () => {
    setIsLongMarket(!isLongMarket)
  }

  return (
    <>
      <div className="h-[42px] border-b border-b-white-300 dark:border-b-secondary flex items-center justify-between pt-1 px-4">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">Top Movers</div>
          <Link href="/support/faq" className="text-xs underline text-black-300 dark:text-gray">
            FAQ
          </Link>
        </div>
        <div className="cursor-pointer" onClick={handleLong}>
          <Icon
            name="double-up"
            size={16}
            className={twMerge(
              "text-black-300 dark:text-gray",
              !isLongMarket && "rotate-180"
            )}
          />
        </div>
      </div>
      <div className={twMerge(
        "pt-2.5 pl-[13px] pr-4  overflow-y-auto relative transition-all duration-500",
        isLongMarket ? "h-[184px]" : "h-[102px]"
      )}>
        <div className="mb-2 flex whitespace-nowrap overflow-x-auto gap-0.5 no-scrollbar">
          {
            tabs.map((tab) => (
              <div
                onClick={() => handleTab(tab)}
                className={twMerge(
                  "text-xs font-semibold cursor-pointer px-2 h-6 flex items-center rounded-md",
                  tab === selectedTab ? "bg-white-100 dark:bg-secondary text-dark-100 dark:text-white-100" : "text-black-300 dark:text-gray"
                )}
              >
                {tab}
              </div>
            ))
          }
        </div>
        <div>
          {
            new Array(15).fill(null).map((idx: number) => 
            <div className="h-[41px] py-[5px] text-xs flex items-center justify-between">
              <div className="flex-1">
                <div>CITY/USD</div>
                <div className="text-black-300 dark:text-gray">19:05:13</div>
              </div>
              <div className="flex-1 text-right min-w-24 overflow-hidden">
                <div className={twMerge(
                  'text-ellipsis whitespace-nowrap text-success-100'
                )}>+34.73%</div>
                <div className="text-black-300 dark:text-gray">New 7day High</div>
              </div>
              <div className="flex justify-end w-14">
                <div className={twMerge(
                  'w-10 h-4 rounded flex items-center justify-center bg-success-100 text-white-100'
                )}>
                  <Icon
                    name="double-up"
                    size={16}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}