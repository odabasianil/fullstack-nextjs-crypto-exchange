"use client"
import { EstimatedBalance } from "@/components/ui/estimated-balance";
import { WalletModel } from "@/core/models/auth/models/wallet/wallet.model";
import { walletService } from "@/core/services/user/wallet.service";
import { MyAssets } from "@/views/account/overview/my-assets";
import { RecentTransactions } from "@/views/account/recent-transactions";
import { useEffect, useState } from "react";

export default function AccountOverview() {
  
  const [walletList, setWalletList] = useState<WalletModel[]>([]);
  useEffect(() => {
    const fetchBaseWallet = async () => {
      try {
        const result = await walletService.getWalletList();
        if(result.success)
        {
          setWalletList(result.data);
        }
    } catch (error) {
        console.error("Error fetching initial wallet:", error);
      }
    }
    fetchBaseWallet();
  }, []);

  return (
    <div className="max-w-[1352px] w-full mx-auto lg:px-16">
      <div className="pt-6 md:pt-0">
        <EstimatedBalance walletList={walletList} />
        <MyAssets walletList={walletList} />
        <RecentTransactions />
      </div>
    </div>
  )
}