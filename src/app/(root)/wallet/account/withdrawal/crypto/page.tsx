'use client'

import { FaqPreview } from "@/components/ui/faq-preview"
import { Step } from "@/components/ui/step"
// import { whiteListService } from "@/core/services/user/whitelist.service"
// import { withdrawService } from "@/core/services/user/withdraw.service"
import { PageProps } from "@/types/page-props"
import { SelectCoin } from "@/views/account/crypto/select-coin"
import { RecentWithdrawals } from "@/views/account/crypto/withdraw/recent-withdrawals"
import { WithdrawAmount } from "@/views/account/crypto/withdraw/withdraw-amount"
import { WithdrawTo } from "@/views/account/crypto/withdraw/withdraw-to"
import { useEffect, useMemo, useState } from "react"

export default function Page({ params }: PageProps) {
  const selectedCrypto = params.coin;
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  const [coins, setCoins] = useState<any>(null);
  const [address, setAddress] = useState<string>("");
  const [whitelist, setWhitelist] = useState<any>(null);
  const [recentWithdrawals, setRecentWithdrawals] = useState<any>(null);
  const [tag, setTag] = useState<string>("");

  const selectedCoin = useMemo(() => {
    return coins?.find((coin: any) => coin.symbol?.toLowerCase() === selectedCrypto.toLowerCase());
  }, [coins])


  const selectedAddress = useMemo(() => {
    return whitelist?.find((item: any) => item.address === address);
  }, [whitelist, address])

  const networks = useMemo(() => {
    return selectedCoin?.blockchainList;
  }, [selectedCoin])

  const filteredWhitelist = useMemo(() => {
    return whitelist?.filter((item: any) => item.symbol == selectedCoin?.symbol);
  }, [selectedCoin, whitelist, coins])

  const initWhitelist = (isAddedWhitelist?: boolean) => {
    // whiteListService.getWhitelist().then((res) => {
    //   if (res.success) {
    //     setWhitelist(res.data)
    //     if (isAddedWhitelist) {
    //       const firstItem = res.data[0];
    //       if (firstItem.symbol == selectedCoin?.symbol) {
    //         setAddress(res.data[0].address);
    //       }

    //     }
    //   }
    // })
  }

  useEffect(() => {
    // withdrawService.withdrawCryptoInit().then((res) => {
    //   if (!res.error || !res.warning) {
    //     setCoins(res.data);
    //     initWhitelist();
    //   }
    // })
  }, [])

  useEffect(() => {
    // withdrawService.withdrawCryptoList().then((res) => {
    //   if (!res.error || !res.warning) {
    //     setRecentWithdrawals(res.data);
    //   }
    // });
  }, [coins])

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="w-full lg:min-w-[520px] lg:w-[520px] !max-w-full">
          <Step title="Select Coin" index={1} isActive={true}>
            <SelectCoin selectedCrypto={selectedCoin} coins={coins} />
          </Step>
          <Step title="Withdraw To" index={2} isActive={selectedCrypto ? true : false}>
            <WithdrawTo
              address={address}
              setAddress={setAddress}
              networks={networks}
              selectedNetwork={selectedNetwork}
              setSelectedNetwork={setSelectedNetwork}
              selectedAddress={selectedAddress}
              whitelist={filteredWhitelist}
              initWhitelist={initWhitelist}
              tag={tag}
              setTag={setTag}
            />
          </Step>
          <Step title="Withdraw Amount" index={3} isActive={address?.length > 0 && (selectedNetwork || selectedAddress?.blockchainId)} isLast>
            <WithdrawAmount
              selectedCoin={selectedCoin}
              selectedNetwork={selectedNetwork}
              address={address}
              setCoins={setCoins}
              selectedAddress={selectedAddress}
              tag={tag}
            />
          </Step>
        </div>
        <div className="lg:w-[384px] mt-6 md:mt-0">
          <FaqPreview />
        </div>
      </div>
      <div className="mt-6 md:mt-20">
        <RecentWithdrawals
          data={recentWithdrawals}
          setRecentWithdrawals={setRecentWithdrawals}
          coins={coins}
        />
      </div>
    </>
  )
}