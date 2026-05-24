import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { NoResult } from "../crypto/payment/no-result"

export const StatementView = () => {

  return (
    <>
       <div className="flex items-center justify-between bg-white-100 dark:bg-background-200 md:bg-transparent md:dark:bg-transparent py-6 px-4 md:p-0">
        <div className="text-2xl md:text-[32px] leading-10 font-semibold">Account Statement</div>
        <Button
          appearance="secondary"
          className="text-base font-semibold h-10 px-3 flex gap-2 justify-between items-center !bg-transparent md:!bg-secondary"
        >
          <Icon name="refresh" size={16} className="mt-0.5" />
          <div className="hidden md:block">Export</div>
        </Button>
      </div>
      <div className="bg-white dark:bg-background px-4 md:px-8">
        <div className="py-6 border-b border-white-100 dark:border-secondary flex items-center gap-4">
          <div className="flex items-center gap-4">
            
          </div>
        </div>

        <div className="pt-8">
          <div className="flex items-center justify-between">
            <div className="text-[28px] leading-9 font-semibold">Overview</div>
            <div className="text-gray-300 dark:text-gray text-xs">Data refreshes at UTC+0 daily.</div>
          </div>
          <div className="py-6 border-b border-white-100 dark:border-secondary flex flex-wrap gap-8">
            <div className="min-w-[140px] md:min-w-[30px] whitespace-nowrap">
              <div className="text-xs leading-8 dark:text-gray-100">Date</div>
              <div className="text-xl">2024-09-13</div>
            </div>
            <div className="min-w-[140px] md:min-w-[30px] whitespace-nowrap">
              <div className="text-xs leading-8 dark:text-gray-100">User ID</div>
              <div className="text-xl">967330686</div>
            </div>
            <div className="min-w-[140px] md:min-w-[30px] whitespace-nowrap">
              <div className="text-xs leading-8 dark:text-gray-100">Account Type</div>
              <div className="text-xl">Normal Account</div>
            </div>
            <div className="min-w-[140px] md:min-w-[30px] whitespace-nowrap">
              <div className="text-xs leading-8 dark:text-gray-100">Wallet</div>
              <div className="text-xl">All</div>
            </div>
            <div className="min-w-[140px] whitespace-nowrap">
              <div className="text-xs leading-8 dark:text-gray-100">Rate</div>
              <div className="text-xl">1 BTC</div>
              <div className="text-gray-300 dark:text-gray">≈ 60,498 USDT</div>
            </div>
          </div>
          <div className="pt-6">
            <div className="font-semibold">Total Value</div>
            <div className="flex gap-3 text-2xl mt-4 font-semibold">
              <div>-- BTC</div>
              <div className="text-gray-300 dark:text-gray">≈ -- USDT</div>
            </div>
          </div>
          <div className="pt-8 flex gap-8 font-semibold">
            <div>
              <div className="text-sm leading-8">Spot</div>
              <div className="text-xl">-- BTC</div>
              <div className="text-gray-300 dark:text-gray">≈ -- USDT</div>
            </div>
            <div>
              <div className="text-sm leading-8">Funding</div>
              <div className="text-xl">-- BTC</div>
              <div className="text-gray-300 dark:text-gray">≈ -- USDT</div>
            </div>
          </div>
          <div className="pt-[89px]">
            <div className="text-[28px] leading-9 font-semibold">Spot</div>
            <div className="pt-6 leading-8">Total Balance</div>
            <div className="mt-4 flex items-center gap-3 text-2xl font-semibold">
              <div>-- BTC</div>
              <div className="text-gray-300 dark:text-gray">≈ -- USDT</div>
            </div>
            <div className="mt-6 border-b border-white-100 dark:border-secondary pb-10">
              <div className="bg-white-100 dark:bg-secondary flex py-3 px-4">
                <div className="w-1/2 text-xs text-gray-300 dark:text-gray">Coin</div>
                <div className="w-1/2 text-xs text-gray-300 dark:text-gray text-right">Total</div>
              </div>
              <NoResult
                text="No recors found"
                imageClass="mb-0 mt-12"
              />
            </div>
          </div>
          <div className="pt-[89px]">
            <div className="text-[28px] leading-9 font-semibold">Funding</div>
            <div className="pt-6 leading-8">Total Balance</div>
            <div className="mt-4 flex items-center gap-3 text-2xl font-semibold">
              <div>-- BTC</div>
              <div className="text-gray-300 dark:text-gray">≈ -- USDT</div>
            </div>
            <div className="mt-6 border-b border-white-100 dark:border-secondary pb-10">
              <div className="bg-white-100 dark:bg-secondary flex py-3 px-4">
                <div className="w-1/2 text-xs text-gray-300 dark:text-gray">Coin</div>
                <div className="w-1/2 text-xs text-gray-300 dark:text-gray text-right">Total</div>
              </div>
              <NoResult
                text="No recors found"
                imageClass="mb-0 mt-12"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}