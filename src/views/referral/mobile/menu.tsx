'use client'

import { Icon } from "@/components/ui/icon"
import { twMerge } from "tailwind-merge"



export const ReferralMenu = (props: any) => {
  const { tabs, activeTab, setActiveTab } = props

  return (
    <div className="fixed bottom-0 flex justify-between mx-auto pt-2 pb-[34px] px-[28px] w-full z-10 bg-white dark:bg-[#181E25] border-t border-white-100 dark:border-secondary">
      {tabs.map((tab: any) => (
        <div
          onClick={() => setActiveTab(tab.text)}
          className={twMerge(
            "flex flex-col items-center gap-1",
            tab.text === activeTab ? "" : "text-gray-300 dark:text-gray"
          )}
        >
          <Icon name={tab.icon} size={24} />
          <div className="text-xs font-semibold">{tab.text}</div>
        </div>
      ))}
    </div>
  )
}