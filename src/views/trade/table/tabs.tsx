'use client'

import { Icon } from "@/components/ui/icon";
import Select from "@/components/ui/select";
import { twMerge } from "tailwind-merge";

export const TradeTableTabs = (props: any)  => {
  const {
    tabs,
    hideOtherPairs,
    setHideOtherPairs,
    sortedBy,
    setSortedBy,
    activeTab,
    setActiveTab
  } = props;

  const handleTab = (tab: string) => {
    setActiveTab(tab);
  }

  const handleHidePairs = () => {
    setHideOtherPairs(!hideOtherPairs);
  }

  return (
    <div className="px-4 h-[44px] min-h-[44px] border-b border-b-white-100 dark:border-b-secondary flex justify-between items-center relative">
      <div className="flex items-center gap-6 overflow-auto relative  no-scrollbar">
        {
          tabs?.map((tab: any, index: number) => (
            <div
              className={twMerge(
                "flex flex-col items-center justify-center cursor-pointer relative whitespace-nowrap",
                index === 0 && "guide-second-step"
              )}
              onClick={() => handleTab(tab?.value)}
            >
              <div className={twMerge(
                "text-black-300 dark:text-gray text-sm leading-[38px] font-semibold",
                tab?.value === activeTab && "text-dark-100 dark:text-white-100"
              )}>
                {tab?.text}
              </div>
              {tab?.value === activeTab && <div className="absolute bottom-0 mx-auto h-[3px] w-4 bg-primary "></div>}
            </div>
          ))
        }
      </div>
      <div className="hidden md:flex items-center gap-6">
        {activeTab === 'order_history' && <div>
          <Select
            options={[
              { label: 'Sort By Order Time', value: 'order' },
              { label: 'Sort By Update Time', value: 'update' }
            ]}
            value={sortedBy}
            setValue={setSortedBy}
            wrapperClassName="w-[126px] !text-xs !border-none whitespace-nowrap"
            valueClass="!text-xs pr-1 text-black-100 dark:text-white-100"
          />
        </div>}
        <div className="cursor-pointer text-xs flex items-center gap-2 whitespace-nowrap" onClick={handleHidePairs}>
          <div className={twMerge(
            "w-4 h-4 border rounded-sm border-white-100 dark:border-secondary relative",
            hideOtherPairs && '!bg-black-100 dark:!bg-white-100 border-none text-black-100'
          )}>
            {hideOtherPairs && <Icon name="check" className="absolute w-full h-full" />}
          </div>
          Hide Other Pairs
        </div>
      </div>
    </div>
  )
}