import { EstimatedBalance } from "@/components/ui/estimated-balance";
import { RecentTransactions } from "@/views/account/recent-transactions";
import { AccountSpot } from "@/views/account/spot";

export default function AccountMain() {
  return (
    <div className="pt-6 md:pt-0">
      <EstimatedBalance />
      <AccountSpot />
    </div>
  )
}