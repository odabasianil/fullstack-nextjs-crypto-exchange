'use client'

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon"
// import { depositService } from "@/core/services/user/deposit.service";
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const DepositAddress = (props: any) => {
  const { addresses, setAddresses, selectedCrypto, selectedNetwork } = props;
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();

  const copyKey = (key: string, type: string) => {
    navigator.clipboard.writeText(key);
    toast?.open(`Copied to ${type}`, 'check-circle', '', 'text-green')
  }

  const createAddress = () => {
    setIsLoading(true);
    // depositService.createDepositAddress({ symbol: selectedCrypto.symbol, blockchainId: selectedNetwork.blockchainId })
    //   .then((res) => {
    //     console.log(res.data)
    //     if (res.success) {
    //       setAddresses(res.data);
    //       toast?.open(t('deposit.success_created_address'), 'check-circle', '', 'text-green')
    //     }
    //   }).finally(() => {
    //     setTimeout(() => {
    //       setIsLoading(false);
    //     }, 1000);
    //   });
  }

  return (
    <>
      {(!addresses) &&
        <>
          <div className="w-full p-6 rounded-xl border border-white-100 dark:border-secondary">
            <div className="">{t('deposit.no_address')}</div>
            <div className="mt-2 mb-6 font-normal text-sm text-gray-300 dark:text-gray">{t('deposit.no_address_desc')}</div>
            <Button isLoading={isLoading} onClick={createAddress} className="text-sm rounded-lg h-9">{t('deposit.get_address')}</Button>
          </div>
        </>
      }
      {addresses && <>
        <div className="w-full px-6 py-4 rounded-xl border border-white-100 dark:border-secondary">
          {/* <div className="rounded-xl p-4 bg-[#F6465D1A] flex items-center gap-1">
            <Icon name="info" size={20} />
            <div className="text-sm font-thin">Both Address and Memo is required, or you will lose your coins.</div>
          </div> */}
          <div className="w-full flex items-center justify-between gap-4">
            <div className="p-0.5 rounded-md bg-black dark:bg-white">
              <Image
                src={addresses?.qrCode}
                width={96}
                height={96}
                alt="qr-code"
                className="min-w-24 min-h-24"
              />
            </div>
            <div className="flex items-center justify-between w-full gap-6">
              <div className="text-sm">
                <div className="text-gray-300 dark:text-gray">{t('withdraw.address')}</div>
                <div className="max-w-[276px] break-words">{addresses?.address}</div>
              </div>
              <div className="cursor-pointer" onClick={() => copyKey(addresses?.address, 'Address')}>
                <Icon name="copy" size="20" className="text-gray-300 dark:text-gray" />
              </div>
            </div>
          </div>

          {/* <div className="w-full mt-4 flex items-center justify-between gap-4">
            <div className="p-2 rounded-md bg-black dark:bg-white">
              <Icon name="qr" size="80" className="text-white dark:text-black" />
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm">
                <div className="text-gray-300 dark:text-gray">MEMO</div>
                <div className="w-[306px] text-ellipsis truncate">5524324123</div>
                <div className="text-sm text-error font-thin mt-2">* MEMO is required, or you will lose your coins</div>
              </div>
              <div className="cursor-pointer" onClick={() => copyKey('test', 'Address')}>
                <Icon name="copy" size="20" className="text-gray-300 dark:text-gray" />
              </div>
            </div>
          </div> */}
        </div>
        <div className="text-sm mt-4 flex flex-col gap-2">
          {selectedCrypto?.minDepositAmount && <div className="flex items-center justify-between">
            <div className="font-normal text-gray-300 dark:text-gray">{t('deposit.min_deposit')}</div>
            <div>{selectedCrypto?.minDepositAmount}</div>
          </div>}
          {selectedCrypto?.maxDepositAmount && <div className="flex items-center justify-between">
            <div className="font-normal text-gray-300 dark:text-gray">{t('deposit.max_deposit')}</div>
            <div>{selectedCrypto?.maxDepositAmount}</div>
          </div>}
        </div>
      </>}
    </>
  )
}