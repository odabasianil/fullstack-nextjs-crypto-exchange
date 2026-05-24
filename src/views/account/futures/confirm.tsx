'use client'

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const AccountFuturesConfirm = () => {
  const tabs = [{ name: 'USDⓈ-M', key: 'usds' }, { name: 'COIN-M', key: 'coin' }];
  const [selectedTab, setSelectedTab] = useState('open');
  const [checkedService, setCheckedService] = useState(false);
  const [checkedRisk, setCheckedRisk] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const handleCheckedService = () => {
    setCheckedService(!checkedService);
  }

  const handleCheckedRisk = () => {
    setCheckedRisk(!checkedRisk);
  }

  return (
    <>
      <div className="px-4 md:px-0 pt-6 md:pt-0 mb-6 flex gap-6 w-max">
        {tabs.map((tab, index) => (
          <div key={index} onClick={() => setSelectedTab(tab.key)} className={twMerge(
            "cursor-pointer flex-1 text-center py-2 rounded h-10 relative text-gray-300 dark:text-gray whitespace-nowrap",
            selectedTab === tab.key && 'text-black-100 dark:text-white-100'
          )}>
            {tab.name}
            {selectedTab === tab.key && (
              <div className="absolute w-4 h-[3px] bg-primary bottom-0 left-1/2 -translate-x-1/2"></div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col items-center justify-center py-10 px-4 md:px-0">
        <Image src="/images/future.svg" alt="future" width={96} height={96} />
        <div className="max-w-[768px] mx-auto px-4 md:py-6 flex flex-col h-full text-sm">
          <div className="text-2xl mb-4 md:mb-[30px] text-center">Open Futures Account</div>
          <div className="text-gray-300 dark:text-gray text-sm mb-4 md:mb-[30px] text-center">
            Futures trading is a highly risky endeavor, with
            the potential for both great profits and significant losses. 
            Please be aware that in the event of extreme price movement, 
            there is a chance that all margin balance in your futures 
            wallet may be liquidated. Futures trading is restricted for
            users from certain regions.
          </div>
          <div className="flex items-start mx-auto gap-2 text-sm mb-4">
            <div onClick={handleCheckedService} className={twMerge(
              "mt-1 cursor-pointer min-w-4 w-4 h-4 border rounded-sm border-gray relative",
              checkedService && '!bg-primary !border-primary text-black-100'
              )}>
              {checkedService && <Icon name="check" className="absolute w-full h-full" />}
            </div>
            <div className="text-center">I have read and agree to FAZ 3 <Link className="text-primary-100" target="_blank" href="#">Futures Service Agreement</Link>  </div>
          </div>

          <div className="flex items-start mx-auto gap-2 text-sm mb-4">
            <div onClick={handleCheckedRisk} className={twMerge(
              "mt-1 cursor-pointer min-w-4 w-4 h-4 border rounded-sm border-gray relative",
              checkedRisk && '!bg-primary !border-primary text-black-100'
              )}>
              {checkedRisk && <Icon name="check" className="absolute w-full h-full" />}
            </div>
            <div className="text-center">I understood the rules and risks of Futures Trading, and I agree that any loss incurred during Futures Trading is my own responsibility regardless of the platform.</div>
          </div>
          <div className="flex flex-col mx-auto w-full max-w-[450px]">
            <Input
              value={referralCode}
              onChange={(e: any) => setReferralCode(e.target.value)}
              placeholder="Futures referral code (Optional)"
              wrapperClassName="w-full"
              className="text-sm placeholder:text-sm bg-white-300 dark:bg-secondary border-none rounded"
            />
            <Button
              disabled={!checkedService || !checkedRisk}
              className="w-full h-10 rounded text-sm mt-2"
            >
              Open Now
            </Button>
            <Link href="/en/support/faq/crypto-derivatives?c=4&navId=4&hl=en" target="_blank" className="text-primary-100 text-sm text-center mt-1 flex justify-center mx-auto">
              Click to see Futures Trading Guide
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}