'use client'

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const OpenFutures = (props: any) => {
  const { setClikced } = props;
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
      <div className="px-4 py-6">
        <div className="text-2xl mb-[30px]">Open Futures Account</div>
        <div className="flex items-center gap-1 mb-1.5 text-gray-300 dark:text-gray text-sm">
          <Icon
            name="info"
            size={16}
          />
          Reminder
        </div>
        <div className="text-gray-300 dark:text-gray text-sm mb-[30px]">
          Futures trading is a highly risky endeavor, with
          the potential for both great profits and significant losses. 
          Please be aware that in the event of extreme price movement, 
          there is a chance that all margin balance in your futures 
          wallet may be liquidated. Futures trading is restricted for
          users from certain regions.
        </div>
        <div className="flex items-start gap-2 text-sm mb-4">
          <div onClick={handleCheckedService} className={twMerge(
            "mt-1 cursor-pointer min-w-4 w-4 h-4 border rounded-sm border-white-100 dark:border-secondary relative",
            checkedService && '!bg-primary !border-primary text-black-100'
            )}>
            {checkedService && <Icon name="check" className="absolute w-full h-full" />}
          </div>
          <div>I have read and agree to FAZ 3 <Link className="text-primary-100" target="_blank" href="/">Futures Service Agreement</Link>  </div>
        </div>

        <div className="flex items-start gap-2 text-sm mb-4">
          <div onClick={handleCheckedRisk} className={twMerge(
            "mt-1 cursor-pointer min-w-4 w-4 h-4 border rounded-sm border-white-100 dark:border-secondary relative",
            checkedRisk && '!bg-primary !border-primary text-black-100'
            )}>
            {checkedRisk && <Icon name="check" className="absolute w-full h-full" />}
          </div>
          <div>I understood the rules and risks of Futures Trading, and I agree that any loss incurred during Futures Trading is my own responsibility regardless of the platform.</div>
        </div>
        <Input
          value={referralCode}
          onChange={(e: any) => setReferralCode(e.target.value)}
          placeholder="Futures referral code (Optional)"
          wrapperClassName="w-full"
          className="text-sm placeholder:text-sm bg-white-300 dark:bg-secondary border-none rounded"
        />
        <Button
          onClick={() => setClikced(true)}
          disabled={!checkedService || !checkedRisk}
          className="w-full h-10 rounded text-sm mt-2"
        >
          Open Now
        </Button>
        <Link href="/en/support/faq/crypto-derivatives?c=4&navId=4&hl=en" target="_blank" className="text-primary-100 text-sm text-center mt-5 flex justify-center mx-auto">
          Click to see Futures Trading Guide
        </Link>
      </div>
    </>
  )
}