import { EstimatedBalance } from "@/components/ui/estimated-balance";
import { MyAssets } from "@/views/account/overview/my-assets";
import { RecentTransactions } from "@/views/account/recent-transactions";

export default function AccountOverview() {
  return (
    <div className="pt-6 md:pt-0">
      <EstimatedBalance />
      <MyAssets />
      <RecentTransactions />
    </div>
  )
}