import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { NoResult } from "../crypto/payment/no-result"

export const RecentTransactions = () => {

  return (
    <div className="md:border border-white-100 dark:border-secondary rounded-2xl px-4 py-16 md:p-6">
      <div className="pb-3 flex items-center justify-between">
        <div className="text-2xl font-semibold">Recent Transactions</div>
        <Link target="_blank" href="/en/me/wallet/history/deposit-crypto" className="flex items-center gap-0.5 h-8">
          <div className="text-sm font-semibold">More</div>
          <Icon name="chevron-left" size={16} className="text-gray-300 dark:text-gray rotate-180" />
        </Link>
      </div>
      <div className="py-4">
        <NoResult imageClass="p-0 m-0" width={72} height={72} text="No records" />
      </div>
    </div>
  )
}