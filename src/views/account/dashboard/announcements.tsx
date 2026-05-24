import { Icon } from "@/components/ui/icon"
import Link from "next/link"

export const Announcements = () => {

  return (
    <div className="w-full md:border border-white-100 dark:border-secondary rounded-2xl mb-6 px-4 md:p-3">
      <div className="md:pl-3 h-12 flex items-center justify-between">
        <div className="font-semibold">Announcements</div>
        <Link target="_blank" href="/en/support/announcement" className="flex items-center gap-0.5 h-8">
          <div className="text-sm font-semibold">More</div>
          <Icon name="chevron-left" size={16} className="text-gray-300 dark:text-gray rotate-180" />
        </Link>
      </div>
      <div className="md:px-3 py-2 text-sm hover:bg-white-100 hover:dark:bg-background-200">
        <div className="mb-1 font-medium leading-[22px]">FAZ 3 Futures Will Launch USDⓈ-Margined RPL Perpetual Contract With up to 75x Leverage</div>
        <div className="text-gray-300 dark:text-gray">2024-09-09</div>
      </div>
      <div className="md:px-3 py-2 text-sm hover:bg-white-100 hover:dark:bg-background-200">
        <div className="mb-1 font-medium leading-[22px]">FAZ 3 Launches Zero Fee to Buy EURI with EUR via SEPA Bank Transfer</div>
        <div className="text-gray-300 dark:text-gray">2024-09-09</div>
      </div>
    </div>
  )
}