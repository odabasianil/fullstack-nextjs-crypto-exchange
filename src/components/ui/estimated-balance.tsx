'use client'

import { useState } from "react"
import { Button } from "./button"
import { Icon } from "./icon"
import Select from "./select"
import { HelpText } from "./help-text"
import Link from "next/link"

export const EstimatedBalance = () => {
  const [balance, setBalance] = useState("0.00");
  const [isVisibleBalance, setIsVisibleBalance] = useState(false);

  const handleToggleBalance = () => {
    setIsVisibleBalance(!isVisibleBalance);
  }

  return (
    <>
      <div className="w-full px-4 md:p-6 mb-16 md:mb-6 rounded-2xl md:border border-white-100 dark:border-secondary">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-0.5 mb-2">
              <div className="text-base md:text-xl font-semibold">Estimated Balance</div>
              <div className="cursor-pointer" onClick={handleToggleBalance}>
                <Icon name={isVisibleBalance ? "eye-on" : "eye-off"} size={16} className="text-gray-300 dark:text-gray" />
              </div>
            </div>
            <div className="h-10 flex items-end mb-2">
              <div className="text-2xl md:text-[32px] leading-10 font-bold">{isVisibleBalance ? balance : '******'}</div>
              <div>
                <Select
                  options={[
                    { value: "USD", label: "USD" },
                    { value: "EUR", label: "EUR" },
                    { value: "GBP", label: "GBP" },
                  ]}
                  wrapperClassName="!pt-2 border-none bg-transparent w-12"
                  valueClass="px-0 text-black-100 dark:text-white-100"
                />
              </div>
            </div>
            <div className="text-sm mb-2">{!isVisibleBalance ? "******" : "≈ $0.00"}</div>
            <div className="flex items-center text-sm">
              <div>Today's PnL</div>
              <div className="ml-1 relative group cursor-pointer">
                <Icon name="info" size={12} className="text-gray-300 dark:text-gray" />
                <HelpText>"Today's PNL = Current asset total - Today's initial asset total - Today's net transfer and deposit. The date is only for your reference, there is no guarantee that the data is absolutely accurate."                </HelpText>
              </div>
              <div className="text-gray-300 dark:text-gray-100 ml-2">{isVisibleBalance ? "+ $0.00(0.00%)" : "******"}</div>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-3 mt-6 md:mt-0 w-full md:w-auto">
            <Link href="/wallet/account/deposit/crypto/BTC">
              <Button
                appearance="secondary"
                className="text-sm h-8 font-semibold px-3 w-full md:w-auto min-w-20"
              >
                Deposit
              </Button>
            </Link>
            <Link href="/wallet/account/withdrawal/crypto/BTC">
              <Button
                appearance="secondary"
                className="text-sm h-8 font-semibold px-3 w-full md:w-auto min-w-20"
              >
                Withdraw
              </Button>
            </Link>
            {/* <Button
              appearance="secondary"
              className="text-sm h-8 font-semibold px-3 w-full md:w-auto"
            >
              Cash In
            </Button> */}
          </div>
        </div>
      </div>
    </>
  )
}