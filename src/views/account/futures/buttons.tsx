import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import Link from "next/link"

export const FuturesButtons = () => {

  return (
    <>
      <div className="flex items-center justify-between md:justify-end gap-3">
        <Button className="text-sm rounded-md h-8 md:px-3 font-semibold">Transfer</Button>
        <Button appearance="secondary" className="md:px-3 text-sm rounded-md h-8 font-semibold">Convert</Button>
        <Link href="/buy/crypto">
          <Button appearance="secondary" className="md:px-3 text-sm rounded-md h-8 font-semibold">Buy Crypto</Button>
        </Link>
        <div className="cursor-pointer group relative">
          <Icon name="dots" size={20} className="rotate-90" />
          <div className="absolute top-6 right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white-100 dark:bg-black-100 min-w-[320px] rounded-lg py-2.5 shadow-lg">
            <Link href="/me/orders/futures/transactionhistory" className="px-4 font-semibold hover:bg-secondary h-10 flex items-center w-full">Transaction History</Link>
          </div>
        </div>
      </div>
    </>
  )
}