import { EstimatedBalance } from "@/components/ui/estimated-balance";
import { RecentTransactions } from "@/views/account/recent-transactions";
import { AccountSpot } from "@/views/account/spot";

export default function AccountMain() {
  return (
    <div className="max-w-[1352px] mx-auto w-full lg:px-16">
      <div className="pt-6 md:pt-0">
        <EstimatedBalance walletList={[]} />
        <AccountSpot />
      </div>
    </div>
  )
}