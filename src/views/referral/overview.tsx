import { Icon } from "@/components/ui/icon"
import Link from "next/link"

export const ReferralOverview = () => {

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="tip" size={32} />
          <div className="font-semibold text-[32px] leading-10">Overview</div>
        </div>
        <Link href="/faq" className="text-primary-100 flex items-center gap-1">
          View Activity History & Overview
          <Icon name="chevron-left" size={14} className="rotate-180" />
        </Link>
      </div>
      <div className="rounded-lg bg-white-200 dark:bg-black-100 py-8 px-12 mb-20">
        <div className="flex flex-wrap justify-between">
          <div>
            <div className="text-sm text-gray-300 dark:text-gray-">Trading Fee Rebate Voucher (USD)</div>
            <div className="text-2xl mt-2">0</div>
          </div>
          <div>
            <div className="text-sm text-gray-300 dark:text-gray-">Total Referrals</div>
            <div className="text-2xl mt-2">0</div>
          </div>
          <div>
            <div className="text-sm text-gray-300 dark:text-gray-">Successful Referrals</div>
            <div className="text-2xl mt-2">0</div>
          </div>
        </div>
      </div>
    </div>
  )
}