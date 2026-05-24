'use client'

import { FaqPreview } from "@/components/ui/faq-preview"
import { Step } from "@/components/ui/step"
// import { depositService } from "@/core/service@/core/services/user/whitelists/user/deposit.service"
import { PageProps } from "@/types/page-props"
import { DepositAddress } from "@/views/account/crypto/deposit/address"
import { RecentDeposits } from "@/views/account/crypto/deposit/recent-deposits"
import { SelectNetwork } from "@/views/account/crypto/deposit/select-network"
import { SelectCoin } from "@/views/account/crypto/select-coin"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

export default function Page({ params }: PageProps) {
  const selectedCrypto = params.coin;
  const { t } = useTranslation();
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  const [coins, setCoins] = useState<any>(null);
  const [addresses, setAddresses] = useState<any>(null);

  const selectedCoin = useMemo(() => {
    return coins?.find((coin: any) => coin.symbol?.toLowerCase() === selectedCrypto.toLowerCase());
  }, [coins])

  const networks = useMemo(() => {
    return selectedCoin?.blockchainList;
  }, [selectedCoin])

  useEffect(() => {
    if (selectedCoin && selectedNetwork) {
      // depositService.getDepositAddress({ symbol: selectedCoin.symbol, blockchainId: selectedNetwork.blockchainId })
      //   .then((res) => {
      //     if (res.success) {
      //       setAddresses(res.data);
      //     }
      //   })
    }
  }, [selectedNetwork]);

  useEffect(() => {
    // depositService.depositCryptoInit().then((res) => {
    //   console.log(res);
    //   if (res.success) {
    //     setCoins(res.data);
    //   }
    // })
  }, [])

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="w-full lg:min-w-[520px] lg:w-[520px] !max-w-full">
          <Step title={t('withdraw.select_coin')} index={1} isActive={true}>
            <SelectCoin coins={coins} selectedCrypto={selectedCoin} isDeposit />
          </Step>
          <Step title={t('withdraw.select_network')} index={2} isActive={selectedCoin ? true : false}>
            <SelectNetwork networks={networks} selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
          </Step>
          <Step title={t('deposit.deposit_address')} index={3} isActive={selectedNetwork ? true : false} isLast>
            <DepositAddress addresses={addresses} setAddresses={setAddresses} selectedCrypto={selectedCoin} selectedNetwork={selectedNetwork} />
          </Step>
        </div>
        <div className="lg:w-[384px] mt-6 md:mt-0">
          <FaqPreview />
        </div>
      </div>
      <div className="mt-6 md:mt-20">
        <RecentDeposits />
      </div>
    </>
  )
}